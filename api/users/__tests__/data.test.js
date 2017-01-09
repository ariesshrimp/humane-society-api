'use strict'
import * as AnimalData from '../../animals/data'
import * as Data from '../data'
import { testAnimal, testUser } from '../../../test-utilities'
import R from 'ramda'
import _session from '../../../database'

describe('User', () => {
  const TEST_USER = testUser()
  const TEST_ANIMAL = testAnimal()
  const session = _session()

  beforeAll(async () => {
    try {
      await Data.createUser(session, TEST_USER)
      await AnimalData.createAnimal(session, TEST_ANIMAL)
      await Data.watch(session, TEST_USER.id, TEST_ANIMAL.id)
    } catch (e) { console.error(e) }
  })

  describe('DB Operations', () => {
    it('gets a user by id', async () => {
      const user = await Data.user(session, TEST_USER.id)
      const actual = R.keys(user).sort()
      const expected = R.keys(TEST_USER).sort()
      expect(actual).toEqual(expected)
    })

    it('gets a list of animals a user is following', async () => {
      const animals = await Data.watching(session, TEST_USER.id)
      const actual = R.keys(R.head(animals)).sort()
      const expected = R.keys(TEST_ANIMAL).sort()
      expect(actual).toEqual(expected)
    })
  })

  afterAll(async () => {
    try {
      await AnimalData.removeAnimal(session, TEST_ANIMAL.id)
      await Data.removeUser(session, TEST_USER.id)
      session.close()
    } catch (e) { console.error(e) }
  })
})
