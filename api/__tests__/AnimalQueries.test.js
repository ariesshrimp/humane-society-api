'use strict'
import Schema from '../Schema'
import Remote from '../database'
import { graphql } from 'graphql'

describe(`Animal Schema Tests`, () => {
  beforeAll(async () => {
    await Remote.auth()
    console.log('before')
  })

  describe(`Basic Queries`, () => {
    it('Correctly finds a rat named Basil', async () => {
      console.log('spec')
      const query = `
        query {
          getAllNamed(name: "Basil") {
            name
          }
        }
      `
      const result = await graphql(Schema, query)
      console.log(result.data)
      expect(result).toBeTruthy()
    })
  })

  afterAll(async () => {
    await Remote.delete()
    console.log('after')    
  })
})
