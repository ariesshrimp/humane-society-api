import Schema from '../Schema'
import Database from '../database'
import { graphql } from 'graphql'

describe(`Animal Schema Tests`, () => {
  let app
  beforeAll(() => {
    app = Database.auth()
    return app
  })
  afterAll(() => app.delete())

  describe(`Basic Queries`, () => {
    it('Correctly finds a rat named Basil', async () => {
      const query = `
        query {
          getAllNamed(name: "Basil") {
            name
            breed
            species
            id
          }
        }
      `

      const result = await graphql(Schema, query)
      expect(result).toBeTruthy()
    })
  })
})
