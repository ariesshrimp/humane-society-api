'use strict'
import app from '../database'
import { graphql } from 'graphql'
import * as Database from '../users/data'
import Resolvers from '../users/resolvers'
import R from 'ramda'

describe(`Queries`, () => {
  it(`Correctly finds users by ID`, async () => {
    const user = await Resolvers.getUser(1)
    expect(user.name).toEqual(`Joe`)
  })

  afterAll(() => {
    return app.delete()
    .then(() => console.log(`App destroyed...`))
    .catch(console.error)   
  })
})

