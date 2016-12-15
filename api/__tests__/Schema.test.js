'use strict'
import app from '../database'
import R from 'ramda'
import Resolvers from '../users/resolvers'
import Schema from '../Schema'
import { expect } from 'chai'
import { graphql } from 'graphql'
import { animal, user } from './testObjects.js'
import * as Animals from '../animals/data'
import * as Database from '../users/data'

describe(`Users`, () => {
  const testAnimal = app.database().ref(`/animals/TEST_ANIMAL`)
  const testUser = app.database().ref(`/users/TEST_USER`)

  describe(`Queries`, () => {
    // /*
    // Set up some test entitites in the prod databse    
    beforeEach(async function() {
      this.timeout(5000)
      await testAnimal.set(animal)
      await testUser.set(user)
    })
    // */

    it(`Gets a user and it's favorite animals`, async () => {
      const query = `
        query {
          getUser(id: "TEST_USER") {
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

      const { data } = await graphql(Schema, query)
      const expected = {

      }
      expect(data).to.deep.equal(expected)
    })
  })

  // Clean-up those test entities we started with
  after(async () => {
    await testAnimal.remove()
    await testUser.remove()
  })
})
