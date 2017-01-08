'use strict'
import * as Data from '../data'
import driver, { shutdown } from '../../../database'
import R from 'ramda'
const USER_ID = '2924dc40-00c3-45c7-b508-7373a9f7c209'
const animalKeys = [
  'species',
  'sex',
  'fee',
  'dateAvailable',
  'imageURL',
  'name',
  'description',
  'weight',
  'id',
  'age',
  'breed',
  'colors'
].sort()
const userKeys = [
  'password',
  'id',
  'name',
  'email'
].sort()

describe('User', () => {
  describe('DB Operations', () => {
    it('gets a user by id', async () => {
      const user = await Data.user(driver(), USER_ID)
      const actual = R.keys(user).sort()
      const expected = userKeys
      expect(actual).toEqual(expected)
    })

    it('gets a list of animals a user is following', async () => {
      const animals = await Data.watching(driver(), USER_ID)
      const actual = R.keys(R.head(animals)).sort()
      const expected = animalKeys
      expect(actual).toEqual(expected)
    })
  })

  afterAll(shutdown)
})
