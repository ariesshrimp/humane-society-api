'use strict'
import * as Data from '../data'
import * as UserData from '../../users/data'
import { testAnimal, testUser } from '../../../test-utilities'
import R from 'ramda'
import _session from '../../../database'

describe('Animals', () => {
  const TEST_ANIMAL = testAnimal()
  const TEST_USER = testUser()
  const session = _session()
  beforeAll(async () => {
    try {
      await Data.createAnimal(session, TEST_ANIMAL)
      await UserData.createUser(session, TEST_USER)
      await UserData.watch(session, TEST_USER.id, TEST_ANIMAL.id)
    } catch (e) { console.error(e) }
  })

  describe('DB Operations', () => {
    it('gets an animal by ID', async () => {
      const animal = await Data.animal(session, TEST_ANIMAL.id)
      const actual = R.keys(animal).sort()
      const expected = R.keys(TEST_ANIMAL).sort()
      expect(actual).toEqual(expected)
    })

    it('handles a non-existent animal safely', async () => {
      try {
        const actual = await Data.animal(session, 'NON-EXISTENT-ID')
        expect(actual).toBe(null)
      } catch (e) { console.error(e) }
    })

    it('gets a list of users following a given animal', async () => {
      const users = await Data.followers(session, TEST_ANIMAL.id)
      const actual = R.keys(R.head(users)).sort()
      const expected = R.keys(TEST_USER).sort()
      expect(actual).toEqual(expected)
      expect(R.head(users).id).toEqual(TEST_USER.id)
    })

    it('handles followers of a non-existent user safely', async () => {
      try {
        const actual = await Data.followers(session, 'NON-EXISTENT-ID')
        expect(actual).toHaveLength(0)
      } catch (e) { console.error(e) }
    })

    describe('Filters', () => {
      it('can get a list of animals filtered by name', async () => {
        const animals = await Data.animals(session, 'name', TEST_ANIMAL.name)
        const actual = R.head(animals).name
        const expected = TEST_ANIMAL.name
        expect(actual).toEqual(expected)
      })

      it('can get a list of animals filtered by age', async () => {
        const animals = await Data.animals(session, 'fee', TEST_ANIMAL.fee)
        const actual = R.head(animals).fee
        const expected = TEST_ANIMAL.fee
        expect(actual).toEqual(expected)
      })
    })
  })

  afterAll(async () => {
    try {
      await Data.removeAnimal(session, TEST_ANIMAL.id)
      await UserData.removeUser(session, TEST_USER.id)
      await session.close()
    } catch (e) { console.error(e) }
  })
})
