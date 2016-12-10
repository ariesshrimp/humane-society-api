'use strict'
import * as Animals from '../api/animals/data'
import Database from '../api/database'
import R from 'ramda'

describe(`Animals calls`, () => {
  let app
  beforeAll(() => { app = Database.auth() })

  it(`all return results`, async () => {
    const actual = await Promise.all([
      Animals.getAllSpecies(`RODENT`),
      Animals.getCheaperThan(100),
      Animals.getAllOfSex(`MALE`),
      Animals.getYoungerThan(24),
      Animals.getOlderThan(24),
      Animals.sortByDateAvailable(),
      Animals.getByBreed(`Rat`),
      Animals.getByID(`59437`)
    ])

    R.map(result => expect(result.length).toBeGreaterThan(0))
  })

  afterAll(() => app.delete())
})
