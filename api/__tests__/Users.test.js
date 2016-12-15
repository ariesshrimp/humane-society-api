'use strict'
import app from '../database'
import R from 'ramda'
import Resolvers from '../users/resolvers'
import { expect } from 'chai'
import { graphql } from 'graphql'
import { animal, user } from './testObjects.js'
import * as Animals from '../animals/data'
import * as Database from '../users/data'

describe(`User operations`, () => {
  const testAnimal = app.database().ref(`/animals/TEST_ANIMAL`)
  const testUser = app.database().ref(`/users/TEST_USER`)

  describe(`Mutations`, () => {
    // /*
    // Set up some test entitites in the prod databse    
    beforeEach(async function() {
      this.timeout(5000)
      await testAnimal.set(animal)
      await testUser.set(user)
    })
    // */

    it(`Correctly marks an animal as favorited by a user`, async () => {
      await Database.addFavorite(`TEST_USER`)(`TEST_ANIMAL`)
      const actual = await Animals.getByID(`TEST_ANIMAL`)
      const followers = R.keys(R.prop(`followers`)(actual))
      expect(followers).to.contain(`TEST_USER`)
    })

    it(`Removes a user from the databse, along with all its references`, async () => {
      await Database.removeUser(`TEST_USER`)
      const actual = await Database.getByID(`TEST_USER`)
      expect(actual).to.be.null
    })
  })

  // Clean-up those test entities we started with
  after(async () => {
    await testAnimal.remove()
    await testUser.remove()
  })
})

