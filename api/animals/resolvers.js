import DataBase from './data'

export default {
  Query: {
    getAllNamed: (root, { name }) => DataBase.getAllNamed(name),
    getAllOfSex: (root, { sex }) => DataBase.getAllOfSex(sex),
    getAllSpecies: (root, { species }) => DataBase.getAllSpecies(species),
    getAnimal: (root, { id }) => DataBase.getByID(id),
    getByBreed: (root, { breed }) => DataBase.getByBreed(breed),
    getCheaperThan: (root, { maxPrice }) => DataBase.getCheaperThan(maxPrice),
    getOlderThan: (root, { minAge }) => DataBase.getOlderThan(minAge),
    getYoungerThan: (root, { maxAge }) => DataBase.getYoungerThan(maxAge),
    onlyThoseWithImage: (root) => DataBase.getWithImage(),
    sortByDateAvailable: (root) => DataBase.sortByDateAvailable()
  }
}
