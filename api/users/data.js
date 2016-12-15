'use strict'
import R from 'ramda'
import app from '../database'
import { markAsFavorited } from '../animals/data'

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
export const addFavorite = (id, animal) => Promise.all([
  app.database().ref(`/users/${id}`)
    .transaction(current => {
      if (current === null) return // user does not exist, abort transaction
      else return R.set(R.lensProp(animal), true, current.favorites) // set given animal to be a favorite
    }),
  markAsFavorited(animal, id)
])
