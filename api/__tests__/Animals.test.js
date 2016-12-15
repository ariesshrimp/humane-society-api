'use strict'
import app from '../database'
import R from 'ramda'
import { expect } from 'chai'
import { animal } from './testObjects.js'
import * as Database from '../animals/data'

describe(`Animal data operations`, () => {
  const testAnimal = app.database().ref(`/animals/TEST_ANIMAL`)
  const testUser = app.database().ref(`/users/TEST_USER`)

  describe(`Write operations`, () => {
    // /*
    // Set up some test entitites in the prod databse    
    beforeEach(async function() {
      this.timeout(5000)
      await testAnimal.set(animal)
    })
    // */

    it(`Removes an animal from the databse, along with all its references`, async () => {
      await Database.removeAnimal(`TEST_ANIMAL`)
      const actual = await Database.getByID(`TEST_ANIMAL`)
      expect(actual).to.be.null
    })
  })

  // Clean-up those test entities we started with
  after(async () => {
    await testAnimal.remove()
  })
})

