'use strict'
import app from '../database'
import { graphql } from 'graphql'
import Schema from '../Schema'
import * as Data from '../animals/data'

describe(`Queries`, () => {
  it(`Correctly finds rat named Basil`, async () => {
    const query = `
      query {
        getAnimal(id: "196415") {
          id
          species
          breed
          name
        }
      }
    `
    const { data: { getAnimal }} = await graphql(Schema, query)
    expect(getAnimal).toBeTruthy()
  })

  afterAll(() => {
    return app.delete()
    .then(() => console.log(`App destroyed...`))
    .catch(console.error)   
  })
})

