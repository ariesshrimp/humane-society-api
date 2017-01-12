/**
 * GraphQL resolver functions are centralized here to make them
 * more portable. This way they can be shared between mutations, queries, and entity definitions.
 * Each function assumes the standard GraphQL resolver parameter pattern:
 * (parentNode, arguments, context) => {}
 */
'use strict'
import * as Data from './data'

export default {
  createUser: (_, props, { db }) => Data.createUser(db, props),
  follow: (_, { userID, animalID }, { db }) => Data.follow(db, userID, animalID),
  following: ({ id }, _, { db }) => Data.following(db, id),
  removeUser: (_, { id }, { db }) => Data.removeUser(db, id),
  unfollow: (_, { userID, animalID }, { db }) => Data.unfollow(db, userID, animalID),
  user: (_, { id }, { db }) => Data.user(db, id)
}
