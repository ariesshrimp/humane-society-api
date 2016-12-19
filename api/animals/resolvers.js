'use strict'
import * as Database from './data'

export default {
  getAllNamed: (_, { name }) => Database.getAllNamed(name),
  getAllOfSex: (_, { sex }) => Database.getAllOfSex(sex),
  getAllSpecies: (_, { species }) => Database.getAllSpecies(species),
  getAnimal: (_, { id }) => Database.getByID(id),
  getByBreed: (_, { breed }) => Database.getByBreed(breed),
  getCheaperThan: (_, { maxPrice }) => Database.getCheaperThan(maxPrice),
  getOlderThan: (_, { minAge }) => Database.getOlderThan(minAge),
  getYoungerThan: (_, { maxAge }) => Database.getYoungerThan(maxAge)
}
