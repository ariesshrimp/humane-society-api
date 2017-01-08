'use strict'
import * as Data from '../data'
import * as UserData from '../../users/data'
import driver, { shutdown } from '../../../database'
import R from 'ramda'

const testAnimal = props => {
  return Object.assign({}, {
    age: 10.00,
    breed: 'TEST_BREED',
    colors: ['black', 'blue', 'red'],
    dateAvailable: new Date().getTime(),
    description: 'This is a test animal. It should be removed from the production database at the end of each test run. It should never be visible on production. If you see it there an leave it, you might get fired.',
    fee: 10.00,
    id: 'TEST-10',
    imageURL: 'https://www.test.com/test_image.png',
    name: 'Test Animal',
    sex: 'unknown',
    species: 'TEST_SPECIES',
    weight: 10.00
  }, props)
}
const testUser = props => {
  return Object.assign({}, {
    email: 'test@example.com',
    id: 'TEST-20',
    name: 'Test User',
    password: 'test123456789&$%'
  }, props)
}

describe('Animals', () => {
  const TEST_ANIMAL = testAnimal()
  const TEST_USER = testUser()
  beforeAll(async () => {
    await Data.createAnimal(driver(), TEST_ANIMAL)
    await UserData.createUser(driver(), TEST_USER)
    await UserData.watch(driver(), TEST_USER.id, TEST_ANIMAL.id)
  })

  describe('DB Operations', () => {
    it('gets an animal by ID', async () => {
      const animal = await Data.animal(driver(), TEST_ANIMAL.id)
      const actual = R.keys(animal).sort()
      const expected = R.keys(TEST_ANIMAL).sort()
      expect(actual).toEqual(expected)
    })

    it('gets a list of users following a given animal', async () => {
      const users = await Data.followers(driver(), TEST_ANIMAL.id)
      const actual = R.keys(R.head(users)).sort()
      const expected = R.keys(TEST_USER).sort()
      expect(actual).toEqual(expected)
      expect(R.head(users).id).toEqual(TEST_USER.id)
    })

    describe('Filters', () => {
      it('can get a list of animals filtered by name', async () => {
        const animals = await Data.animals(driver(), 'name', TEST_ANIMAL.name)
        const actual = R.head(animals).name
        const expected = TEST_ANIMAL.name
        expect(actual).toEqual(expected)
      })

      it('can get a list of animals filtered by age', async () => {
        const animals = await Data.animals(driver(), 'fee', TEST_ANIMAL.fee)
        const actual = R.head(animals).fee
        const expected = TEST_ANIMAL.fee
        expect(actual).toEqual(expected)
      })
    })
  })

  afterAll(async () => {
    await Data.removeAnimal(driver(), TEST_ANIMAL.id)
    await Data.removeUser(driver(), TEST_USER.id)
    shutdown()
  })
})
