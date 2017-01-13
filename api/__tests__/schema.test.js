import { testAnimal, testUser } from '../../test-utilities'
import Schema from '../Schema'
import _session from '../../database'
import { graphql } from 'graphql'

describe('Animals', () => {
  const TEST_ANIMAL = testAnimal()
  const TEST_USER = testUser()
  const session = _session()
  const gql = query => graphql(Schema, query, null, { db: session })

  describe('can create...', () => {
    it('Users', async () => {
      try {
        const mutation = `mutation {
          createUser (
            email: "test@example.com",
            id: "TEST-20",
            name: "Test User",
            password: "test123456789&$%"
          ) {
            email
            id
            name
            password
          }
        }`
        const {data: { createUser }} = await gql(mutation)
        const actual = createUser
        const expected = TEST_USER

        expect(actual).toEqual(expected)
      } catch (e) { console.error(e) }
    })

    it('Animals', async () => {
      try {
        const mutation = `mutation {
          createAnimal (
            age: 10.00,
            breed: "TEST_BREED",
            colors: ["black", "blue", "red"],
            dateAvailable: "1484208451145",
            description: "This is a test animal. It should be removed from the production database at the end of each test run. It should never be visible on production. If you see it there an leave it, you might get fired.",
            fee: 10.00,
            id: "TEST-10",
            imageURL: "https://www.test.com/test_image.png",
            name: "Test Animal",
            sex: "unknown",
            species: "TEST_SPECIES",
            weight: 10.00
          ) {
            age
            breed
            colors
            dateAvailable
            description
            fee
            id
            imageURL
            name
            sex
            species
            weight
          }
        }`
        const {data: { createAnimal: actual }} = await gql(mutation)
        const expected = TEST_ANIMAL

        expect(actual).toEqual(expected)
      } catch (e) { console.error(e) }
    })
  })

  it('can get a user by name', async () => {
    const query = `query {
      user(id: "${TEST_USER.id}") {
        id
      }
    }`
    const {data: {user: { id: actual }}} = await gql(query)
    const expected = TEST_USER.id

    expect(actual).toBe(expected)
  })

  xit('lets a user follow an animal', async () => {

  })

  xit('lets a user UNfollow an animal', async () => {

  })

  xit('lets a user follow many animals', async () => {

  })

  xit('lets a user ask who else is following an animal', async () => {

  })

  describe('can remove...', () => {
    it('Users', async () => {
      try {
        const mutation = `mutation {
          removeUser (id: "${TEST_USER.id}") {
            id
            deleted
          }
        }`
        const {data: { removeUser: actual }} = await gql(mutation)
        const expected = { deleted: true, id: TEST_USER.id }

        expect(actual).toEqual(expected)
      } catch (e) { console.error(e) }
    })

    it('Animals', async () => {
      try {
        const mutation = `mutation {
          removeAnimal (id: "${TEST_ANIMAL.id}") {
            id
            deleted
          }
        }`
        const {data: { removeAnimal: actual }} = await gql(mutation)
        const expected = { deleted: true, id: TEST_ANIMAL.id }

        expect(actual).toEqual(expected)
      } catch (e) { console.error(e) }
    })
  })
})
