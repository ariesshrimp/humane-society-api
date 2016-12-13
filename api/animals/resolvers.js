'use strict'
import * as Database from './data'

export default {
  getAllNamed: (root, { name }) => Database.getAllNamed(name),
  getAllOfSex: (root, { sex }) => Database.getAllOfSex(sex),
  getAllSpecies: (root, { species }) => Database.getAllSpecies(species),
  getAnimal: (root, { id }) => Database.getByID(id),
  getByBreed: (root, { breed }) => Database.getByBreed(breed),
  getCheaperThan: (root, { maxPrice }) => Database.getCheaperThan(maxPrice),
  getOlderThan: (root, { minAge }) => Database.getOlderThan(minAge),
  getYoungerThan: (root, { maxAge }) => Database.getYoungerThan(maxAge),
  onlyThoseWithImage: (root) => Database.getWithImage(),
  sortByDateAvailable: (root) => Database.sortByDateAvailable()
}
