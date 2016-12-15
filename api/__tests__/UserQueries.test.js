'use strict'
import app from '../database'
import { graphql } from 'graphql'
import * as Database from '../users/data'
import Resolvers from '../users/resolvers'
import R from 'ramda'
import * as Animal from '../animals/data'

describe(`Queries`, () => {
  xit(`Correctly finds users by ID`, async () => {
    const user = await Resolvers.getUser(1)
    expect(user.name).toEqual(`Joe`)
  })

  it(`Correctly adds marks an animal as favorited by a user`, async () => {
    const update = await Animal.markAsFavorited(`TEST`, 1)
  })

  afterAll(() => {
    return app.delete()
    .then(() => console.log(`App destroyed...`))
    .catch(console.error)   
  })
})

