'use strict'
import app from '../database'
import { graphql } from 'graphql'
import * as UserData from '../users/data'
import Resolvers from '../users/resolvers'
import * as AnimalData from '../animals/data'
import R from 'ramda'

describe(`Queries`, () => {
  it(`Correctly finds users by ID`, async () => {
    const user = await Resolvers.getUser(1)
    // const faves = await Promise.all(R.map(AnimalData.getByID, user.favorites))
    // console.log(faves)
    expect(user.name).toEqual(`Joe`)
  })

  afterAll(() => {
    return app.delete()
    .then(() => console.log(`App destroyed...`))
    .catch(console.error)   
  })
})

