'use strict'
import app from '../database'
import R from 'ramda'
import uuid from 'node-uuid'
import { expect } from 'chai'
import * as Database from '../animals/data'
import * as TestObjects from './testObjects.js'

describe(`Animal data operations`, () => {
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
      return await animalRef.set(testAnimal)
    })
    // */

    it(`Removes an animal from the databse, along with all its references`, async () => {
      await Database.removeAnimal(testAnimal.id)
      const actual = await Database.getByID(testAnimal.id)
      return await expect(actual).to.be.null
    })
  })

  // Clean-up those test entities we started with
  after(async () => {
    return await animalRef.remove()
  })
})
