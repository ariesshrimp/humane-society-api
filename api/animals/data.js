'use strict'
import { database } from '../database'
const data = database.ref(`/animals`)

export const getByID = id => data.child(`${id}`)
  .once(`value`)
  .then(snapshot => snapshot.val())

export const getAllSpecies = species => data.orderByChild(`species`)
  .equalTo(species)
  .once(`value`)
  .then(snapshot => snapshot.val())
  .then(results => Object.keys(results).map(id => results[id]))

export const getAllNamed = name => data.orderByChild(`name`)
  .equalTo(name)
  .once(`value`)
  .then(snapshot => snapshot.val())
  .then(results => Object.keys(results).map(id => results[id]))

export const getCheaperThan = maxPrice => data.orderByChild(`adopt_fee`)
  .endAt(maxPrice)
  .once(`value`)
  .then(snapshot => snapshot.val())
  .then(results => Object.keys(results).map(id => results[id]))

export const getAllOfSex = sex => data.orderByChild(`sex`)
  .equalTo(sex)
  .once(`value`)
  .then(snapshot => snapshot.val())
  .then(results => Object.keys(results).map(id => results[id]))

export const getYoungerThan = age => data.orderByChild(`age`)
  .endAt(age)
  .once(`value`)
  .then(snapshot => snapshot.val())
  .then(results => Object.keys(results).map(id => results[id]))

export const getOlderThan = age => data.orderByChild(`age`)
  .startAt(age)
  .once(`value`)
  .then(snapshot => snapshot.val())
  .then(results => Object.keys(results).map(id => results[id]))

export const sortByDateAvailable = () => data.orderByChild(`date_available`)
  .once(`value`)
  .then(snapshot => snapshot.val())
  .then(results => Object.keys(results).map(id => results[id]))

export const getWithImage = () => data.orderByChild(`image_url`)
  .once(`value`)
  .then(snapshot => snapshot.val())
  .then(results => results.filter(animal => animal.image_url))
  .then(results => Object.keys(results).map(id => results[id]))

export const getByBreed = breed => data.orderByChild(`breed`)
  .equalTo(breed)
  .once(`value`)
  .then(snapshot => snapshot.val())
  .then(results => Object.keys(results).map(id => results[id]))
