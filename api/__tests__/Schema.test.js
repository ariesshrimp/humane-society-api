'use strict'
import app from '../database'
import R from 'ramda'
import Resolvers from '../users/resolvers'
import Schema from '../Schema'
import uuid from 'node-uuid'
import { expect } from 'chai'
import { graphql } from 'graphql'
import * as Animals from '../animals/data'
import * as Database from '../users/data'
import * as TestObjects from './testObjects.js'

describe(`Users`, () => {
  // XXX:jmf generate special-namespaced-for-sure-unique test subjects since we hit prod db.
  const TEST_ID = `TEST_${uuid.v4()}`

  let testAnimal = R.merge(TestObjects.animal, {
    followers: {[TEST_ID]: true },
    id: TEST_ID
  })

  let testUser = R.merge(TestObjects.user, {
    favorites: {[TEST_ID]: true },
    id: TEST_ID
  })
  const animalRef = app.database().ref(`/animals/${TEST_ID}`)
  const userRef = app.database().ref(`/users/${TEST_ID}`)
  
  describe(`Queries`, () => {
    // Set up some test entitites in the prod databse    
    beforeEach(function() {
      this.timeout(5000)
      return Promise.all([
        animalRef.set(testAnimal),
        userRef.set(testUser)
      ])
    })

    it(`Gets a user and its favorite animals`, async () => {
      const query = `
        query {
          getUser(id: "${testUser.id}") {
            id
            name
            favorites {
              id
              name
              followers {
                id
                name
              }
            }
          }
        }
      `
      const { data: { getUser: actual }} = await graphql(Schema, query)
      const expected = {
        id: testUser.id,
        name: testUser.name,
        favorites: [{     // <- Test Guy's list of favorite animals includes Test Animal
          id: testAnimal.id,
          name: testAnimal.name,
          followers: [{   // <- Test Animal's list of followers includes Test Guy
              id: testUser.id,
              name: testUser.name
          }]
        }]
      }
      await expect(actual).to.deep.equal(expected)
    })
  })

  // Clean-up those test entities we started with
  after(() => Promise.all([
    animalRef.remove(),
    userRef.remove()
  ]))
})
