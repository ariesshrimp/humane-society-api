'use strict'
import R from 'ramda'
import app from '../database'
import { removeFavorite } from '../users/data'

const data = app.database().ref(`/animals`)

const unpack = R.compose(
  R.values,
  snapshot => snapshot.val()
)

// Read-only Operations
// --------------------
export const getByID = id => app.database().ref(`/animals/${id}`)
  .once(`value`)
  .then(snapshot => snapshot.val())

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

export const getByBreed = breed => data.orderByChild(`breed`)
  .equalTo(breed)
  .once(`value`)
  .then(unpack)

// Mutative Operations
// -------------------
export const markAsFavorite = id => user => app.database().ref(`/animals/${id}`)
  .once(`value`)
  .then(snapshot => {
    if (snapshot.val() !== null) { // check whether this animal actually exists, don't accidentally make one in place
      return app.database()
        .ref(`/animals/${id}/followers/${user}`)
        .set(true) // mark this user as a follower
    }
  })

export const unmarkAsFavorite = id => user => app.database().ref(`/animals/${id}`)
  .once(`value`)
  .then(snapshot => {
    if (snapshot.val() !== null) { // check whether this animal actually exists, don't accidentally make one in place
      return app.database()
        .ref(`/animals/${id}/followers/${user}`)
        .remove()
    }
  })

/**
 * @description -
 *  remove an animal from the database, but first clean up all its other references
 * @param {string} animalId - uuid of animal
 * @return {promise} - promise to remove an animal from the database
 */
export const removeAnimal = async (animalId) => {
  const animal = await getByID(animalId)
  const followers = R.keys(R.prop(`followers`)(animal))

  // First remove this animal from any favorites lists it's on
  await R.map(userId => removeFavorite(userId)(animalId), followers)

  // Then destroy the animal
  return app.database().ref(`animals/${animalId}`).remove()
}
