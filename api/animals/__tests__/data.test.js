'use strict'
import * as Data from '../data'
import driver, { shutdown } from '../../../database'
import R from 'ramda'
const ANIMAL_NAME = 'Skip'
const ANIMAL_FEE = 58.89
const ANIMAL_ID = 'c5d81b0e-98b8-4e44-9af4-4b6355005665'
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

describe('Animals', () => {
  describe('DB Operations', () => {
    xit('gets an animal by ID', async () => {
      const animal = await Data.animal(driver(), ANIMAL_ID)
      const actual = R.keys(animal).sort()
      const expected = animalKeys
      expect(actual).toEqual(expected)
    })

    it('gets a list of users following a given animal', async () => {
      const users = await Data.followers(driver(), ANIMAL_ID)
      const actual = R.keys(R.head(users)).sort()
      const expected = userKeys
      expect(actual).toEqual(expected)
    })

    xdescribe('Filters', () => {
      it('can get a list of animals filtered by name', async () => {
        const animals = await Data.animals(driver(), 'name', ANIMAL_NAME)
        const actual = R.head(animals).name
        const expected = ANIMAL_NAME
        expect(actual).toEqual(expected)
      })

      it('can get a list of animals filtered by age', async () => {
        const animals = await Data.animals(driver(), 'fee', ANIMAL_FEE)
        const actual = R.head(animals).fee
        const expected = ANIMAL_FEE
        expect(actual).toEqual(expected)
      })
    })
  })

  afterAll(shutdown)
})
