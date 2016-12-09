'use strict'
import R from 'ramda'
import { database } from '../database'
const data = database.ref(`/animals`)

const unpack = R.compose(
  R.values,
  snapshot => snapshot.val()
)

export const getByID = id => data.child(`${id}`)
  .once(`value`)
  .then(unpack)

export const getAllSpecies = species => data.orderByChild(`species`)
  .equalTo(species)
  .once(`value`)
  .then(unpack)

export const getAllNamed = name => data.orderByChild(`name`)
  .equalTo(name)
  .once(`value`)
  .then(unpack)

export const getCheaperThan = maxPrice => data.orderByChild(`adopt_fee`)
  .endAt(maxPrice)
  .once(`value`)
  .then(unpack)

export const getAllOfSex = sex => data.orderByChild(`sex`)
  .equalTo(sex)
  .once(`value`)
  .then(unpack)

export const getYoungerThan = age => data.orderByChild(`age`)
  .endAt(age)
  .once(`value`)
  .then(unpack)

export const getOlderThan = age => data.orderByChild(`age`)
  .startAt(age)
  .once(`value`)
  .then(unpack)

export const sortByDateAvailable = () => data.orderByChild(`date_available`)
  .once(`value`)
  .then(unpack)

export const getWithImage = () => data.orderByChild(`image_url`)
  .once(`value`)
  .then(snapshot => snapshot.val())
  .then(R.compose(
    R.filter(animal => animal.image_url),
    R.values
  ))

export const getByBreed = breed => data.orderByChild(`breed`)
  .equalTo(breed)
  .once(`value`)
  .then(unpack)
