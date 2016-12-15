'use strict'
import app from '../database'
import { graphql } from 'graphql'
import * as Database from '../users/data'
import Resolvers from '../users/resolvers'
import R from 'ramda'
import * as Animals from '../animals/data'

describe(`User operations`, () => {
  const testAnimal = app.database().ref(`/animals/TEST_ANIMAL`)
  const testUser = app.database().ref(`/users/TEST_USER`)

  // // Set up some test entitites in the prod databse
  /*
  beforeAll(async () => {
    await testAnimal.set({
      adopt_fee: 1,
      age: 1,
      breed: `Test`,
      color: [ `WHITE`, `BLACK` ],
      date_available: `01/01/1901`,
      description: `This entry is for testing only. It should be destroyed after every test run.`,
      followers: [],
      id: `TEST_ANIMAL`,
      image_url: `https://www.placecage.com/g/200/300`,
      name: `Test Animal`,
      sex: `FEMALE`,
      species: `TEST_SPECIES`,
      weight: 1
    }).then(() => console.log(`Created test animal`))

    await testUser.set({
      id: `TEST_USER`,
      name: `Test Guy`,
      favorites: []
    }).then(() => console.log(`Created test user`))
  })
  // */

  describe(`Queries`, () => {
    xit(`Correctly finds users by ID`, async () => {
      const user = await Resolvers.getUser(1)
      expect(user.name).toEqual(`Joe`)
    })
  })

  describe(`Mutations`, () => {
    xit(`Correctly adds marks an animal as favorited by a user`, async () => {
      await Database.addFavorite(`TEST_USER`)(`TEST_ANIMAL`)
    })

    xit(`Removes an animal as favorited by a user`, async () => {
      await Database.removeFavorite(`TEST_USER`)(`TEST_ANIMAL`)
    })

    xit(`Removes an animal from the databse, along with all its references`, async () => {
      await Animals.removeAnimal(`TEST_ANIMAL`)
    })

    xit(`Removes a user from the databse, along with all its references`, async () => {
      await Database.removeUser(`TEST_USER`)
    })
  })

  // Clean-up those test entities we started with
  // afterAll(async () => {
  //   await app.database().ref(`animals/TEST`).once(`value`).then(snap => snap.val()).then(console.log).catch(console.error)
  //   await app.database().ref(`users/TEST`).once(`value`).then(snap => snap.val()).then(console.log).catch(console.error)
    
    // await app.delete()
    //   .then(() => console.log(`App destroyed...`))
    //   .catch(console.error)   
  // })
})

