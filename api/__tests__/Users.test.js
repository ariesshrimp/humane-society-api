'use strict'
import app from '../database'
import R from 'ramda'
import Resolvers from '../users/resolvers'
import uuid from 'node-uuid'
import { expect } from 'chai'
import { graphql } from 'graphql'
import * as Animals from '../animals/data'
import * as Database from '../users/data'
import * as TestObjects from './testObjects.js'

describe(`User data operations`, () => {
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

  describe(`Write operations`, () => {
    // /*
    // Set up some test entitites in the prod databse    
    beforeEach(async function() {
      this.timeout(5000)
      await animalRef.set(testAnimal)
      return await userRef.set(testUser)
    })
    // */

    it(`Correctly marks an animal as favorited by a user`, async () => {
      await Database.addFavorite(testUser.id)(testAnimal.id)
      const actual = await Animals.getByID(testAnimal.id)
      const followers = R.keys(R.prop(`followers`)(actual))
      return await expect(followers).to.contain(testUser.id)
    })

    it(`Removes a user from the databse, along with all its references`, async () => {
      await Database.removeUser(testUser.id)
      const actual = await Database.getByID(testUser.id)
      return await expect(actual).to.be.null
    })
  })

  // Clean-up those test entities we started with
  after(async () => {
    await animalRef.remove()
    return await userRef.remove()
  })
})
