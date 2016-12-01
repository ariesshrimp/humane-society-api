import { database } from '../database'

const data = database.ref(`/animals`)

const getByID = id => data.child(`${id}`)
  .once(`value`)
  .then(snapshot => snapshot.val())

const getAllSpecies = species => data.orderByChild(`species`)
  .equalTo(species)
  .once(`value`)
  .then(snapshot => snapshot.val())
  .then(results => Object.keys(results).map(id => results[id]))

const getAllNamed = name => data.orderByChild(`name`)
  .equalTo(name)
  .once(`value`)
  .then(snapshot => snapshot.val())
  .then(results => Object.keys(results).map(id => results[id]))

const getCheaperThan = maxPrice => data.orderByChild(`adopt_fee`)
  .endAt(maxPrice)
  .once(`value`)
  .then(snapshot => snapshot.val())
  .then(results => Object.keys(results).map(id => results[id]))

const getAllOfSex = sex => data.orderByChild(`sex`)
  .equalTo(sex)
  .once(`value`)
  .then(snapshot => snapshot.val())
  .then(results => Object.keys(results).map(id => results[id]))

const getYoungerThan = age => data.orderByChild(`age`)
  .endAt(age)
  .once(`value`)
  .then(snapshot => snapshot.val())
  .then(results => Object.keys(results).map(id => results[id]))

const getOlderThan = age => data.orderByChild(`age`)
  .startAt(age)
  .once(`value`)
  .then(snapshot => snapshot.val())
  .then(results => Object.keys(results).map(id => results[id]))

const sortByDateAvailable = () => data.orderByChild(`date_available`)
  .once(`value`)
  .then(snapshot => snapshot.val())
  .then(results => Object.keys(results).map(id => results[id]))

const getWithImage = () => data.orderByChild(`image_url`)
  .once(`value`)
  .then(snapshot => snapshot.val())
  .then(results => results.filter(animal => animal.image_url))
  .then(results => Object.keys(results).map(id => results[id]))

const getByBreed = breed => data.orderByChild(`breed`)
  .equalTo(breed)
  .once(`value`)
  .then(snapshot => snapshot.val())
  .then(results => Object.keys(results).map(id => results[id]))

const getFriends = animal => data.child(`${animal.id}`)
  .orderByChild(`friends`)
  .once(`value`)
  .then(snapshot => snapshot.val())
  .then(friends => friends.map(getByID))

const findPetsWithFriends = () => data.orderByChild(`friends`)
  .once(`value`)
  .then(snapshot => snapshot.val())
  .then(results => Object.keys(results).map(id => results[id]))
  .then(results => results.filter(animal => animal.friends.length))

export default {
  findPetsWithFriends,
  getAllNamed,
  getAllOfSex,
  getAllSpecies,
  getByBreed,
  getByID,
  getCheaperThan,
  getFriends,
  getOlderThan,
  getWithImage,
  getYoungerThan,
  sortByDateAvailable
}
