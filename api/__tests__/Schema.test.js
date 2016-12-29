'use strict'
import app from '../database'
import R from 'ramda'
import Resolvers from '../users/resolvers'
import Schema from '../Schema'
import uuid from 'node-uuid'
import { expect } from 'chai'
import { graphql } from 'graphql'
import * as TestObjects from './testObjects.js'

describe(`Schema`, function() {
  this.timeout(5000)

  // anima is used in Animal Operations tests and User Operations tests
  let animalID = `TEST_${uuid.v4()}`
  let testAnimal = R.merge(TestObjects.animal, { id: animalID })
  let animalRef = app().database().ref(`/animals/${animalID}`)

  before(async function() {
    await animalRef.set(testAnimal)
  })

  describe(`Animal operation`, () => {
    it(`Find an animal by ID`, async () => {
      const query = `
        query {
          getAnimal(
            id:"${animalID}"
          ) {
            id
            name
          }
        }
      `

      const { data: { getAnimal: actual }} = await graphql(Schema, query)
      const expected = {
        id: animalID,
        name: testAnimal.name
      }

      expect(actual).to.deep.equal(expected)
    })

    it(`Allows queries by species`, async () => {
      const query = `
        query {
          getAllSpecies(
            species:"${testAnimal.species}"
          ) {
            id
            name
            species
          }
        }
      `

      const { data: { getAllSpecies: actual }} = await graphql(Schema, query)
      const expected = [{
        id: animalID,
        name: testAnimal.name,
        species: testAnimal.species
      }]

      expect(actual).to.deep.equal(expected)
    })
  })

  describe(`User operations`, () => {
    let userID

    it(`Create a user`, async () => {
      const mutation = `
        mutation {
          createUser(
            email:"${uuid.v4()}@test.com",
            name:"TestGuy",
            password:"12345678lowerUPPER&%*"
          ) {
            id
            name
            favorites {
              id
            }
          }
        }
      `
      const { data: { createUser: actual }} = await graphql(Schema, mutation)
      userID = actual.id // save this id for us in the rest of the user test suite

      const expected = {
        id: userID,
        favorites: [],
        name: `TestGuy`
      }

      expect(actual).to.deep.equal(expected)
    })

    it(`Lets a user mark some animals as favorites`, async () => {
      const mutation = `
        mutation {
          addFavorite(
            animalId:"${animalID}",
            userId:"${userID}"
          ) {
            id
            favorites {
              id
              followers {
                id
              }
            }
          }
        }
      `
      const { data: { addFavorite: actual }} = await graphql(Schema, mutation)
      const expected = {
        id: userID,     // return the user
        favorites: [{   // with a list of faves
          id: animalID, // containing animal
          followers: [{ // who's followers include
            id: userID  // just this user
          }]
        }],
      }

      expect(actual).to.deep.equal(expected)
    })


    it(`Lets you destroy a user by ID`, async () => {
      const mutation = `
        mutation {
          removeUser(
            userId:"${userID}"
          ) {
            id
          }
        }
      `
      const { data: { removeUser: destroyed }} = await graphql(Schema, mutation) // kill the user
      expect(destroyed.id).to.equal(userID) // should return the deleted user's info

      const query = `
        query {
          getUser(
            id:"${userID}"
          ) {
            id
          }
        }
      `
      const { data: { getUser: actual }} = await graphql(Schema, query) // try and find them afterwards
      expect(actual).to.be.null // user should no longer be in the database

      const { data: { getAnimal: animal }} = await graphql(Schema, `
        query {
          getAnimal(
            id:"${animalID}"
          ) {
            followers {
              id
            }
          }
        }
      `)
      expect(animal.followers).to.be.empty // user removed from all animals they were following
    })

    // Clean-up those test entities we started with
    after(() => animalRef.remove())
  })
})
