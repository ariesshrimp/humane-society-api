'use strict'
import { markAsFavorite, unmarkAsFavorite } from '../animals/data'
import R from 'ramda'
import app from '../database'
import isEmail from 'validator/lib/isEmail'

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
export const addFavorite = userId => animalId => Promise.all([
  app.database().ref(`/users/${userId}`)
    .once(`value`)
    .then(snapshot => {
      if (snapshot.val() !== null) { // check whether this animal actually exists, don't accidentally make one in place
        return app.database()
          .ref(`/users/${userId}/favorites/${animalId}`)
          .set(true) // mark this user as a follower
      }
    }),
  markAsFavorite(animalId)(userId)
]).then(() => getByID(userId)) // return the updated user

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
]).then(() => getByID(userId)) // return the updated user

export const removeUser = async (userId) => {
  const user = await getByID(userId)
  const favorites = R.keys(R.prop(`favorites`)(user))

  // First find all their favorite animals and remove them from those followers lists
  await R.map(animalId => unmarkAsFavorite(animalId)(userId), favorites)

  // Then destroy the user
  await app.database().ref(`users/${userId}`).remove()
  await app.auth().deleteUser(userId)

  // return the deleted user
  return user
}

// Regex for 8-100 characters containing a digit, a lowercase, an uppercase, and a non-word character
const validPassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,100}/g

export const createUser = async ({ email, emailVerified = false, password, displayName, disabled = false }) => {
  if (!isEmail(email)) throw Error(`${email} is not a valid email`)
  else if (!validPassword.test(password)) throw Error(`Password should contain number, lowercase, uppercase, and a non-word character. Greater than 8 characters long.`)

  // Will throw if email already in use
  const newUser = await app.auth().createUser({
    disabled,
    displayName,
    email,
    emailVerified,
    password
  })

  // Copy the user to the /user container to track favorites, settings, etc
  const userRef = await app.database().ref(`users/${newUser.uid}`)
  userRef.set({
    id: newUser.uid,
    name: displayName
  })

  // Return the new user
  return getByID(newUser.uid)
}
