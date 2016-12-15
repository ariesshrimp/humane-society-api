'use strict'
import { markAsFavorite, unmarkAsFavorite } from '../animals/data'
import R from 'ramda'
import app from '../database'

// Read-only Operations
// --------------------

/**
 * @description -
 *  grab a user by their uuid
 * @param {string} id - uuid of user
 * @return A promising resolving as the resulting user JSON
 * @example:
 *  const user = async getByID(1)
 *  { name: Joe, id: 1, favorites: [] }
 */
export const getByID = id => app.database().ref(`/users/${id}`)
  .once(`value`)
  .then(snapshot => snapshot.val())

// Mutative Operations
// -------------------

/**
 * @description -
 *  marking an animal as favorited requires updating both the user's favorite list,
 *  and the animals followers list.
 * @param {string} id - uuid of user
 * @param {string} animal - uuid of animal
 * @return A promise of both concurrent changes
 */
export const addFavorite = userId => animal => Promise.all([
  app.database().ref(`/users/${userId}`)
    .once(`value`)
    .then(snapshot => {
      if (snapshot.val() !== null) { // check whether this animal actually exists, don't accidentally make one in place
        return app.database()
          .ref(`/users/${userId}/favorites`)
          .set({ [ animal ]: true }) // mark this user as a follower
      }
    }),
  markAsFavorite(animal)(userId)
])

/**
 * @description -
 *  removing an animal from your favorites list requires removing this user from the animal's list of followers
 * @param {string} id - uuid of user
 * @param {string} animal - uuid of animal
 * @return A promise of both concurrent changes
 */
export const removeFavorite = userId => animalId => Promise.all([
  app.database().ref(`/users/${userId}`)
    .once(`value`)
    .then(snapshot => {
      if (snapshot.val() !== null) { // check whether this animal actually exists, don't accidentally make one in place
        return app.database()
          .ref(`/users/${userId}/favorites/${animalId}`)
          .remove()
      }
    }),
  unmarkAsFavorite(animalId)(userId)
])

export const removeUser = async (userId) => {
  const user = await getByID(userId)
  const favorites = R.keys(R.prop(`favorites`)(user))

  // First remove this animal from any favorites lists it's on
  await R.map(animalId => unmarkAsFavorite(animalId)(userId), favorites)

  // Then destroy the user
  return app.database().ref(`users/${userId}`).remove()
}
