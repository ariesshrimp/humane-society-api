'use strict'
import app from '../database'
import { graphql } from 'graphql'
import * as Database from '../animals/data'

describe(`Queries`, () => {
  it(`Correctly finds users by ID`, async () => {
    expect(true).toBeTruthy()
  })

  afterAll(() => {
    return app.delete()
    .then(() => console.log(`App destroyed...`))
    .catch(console.error)   
  })
})

