/**
 * GraphQL resolver functions are centralized here to make them
 * more portable. This way they can be shared between mutations, queries, and entity definitions.
 * Each function assumes the standard GraphQL resolver parameter pattern:
 * (parentNode, arguments, context) => {}
 */
'use strict'
import * as Data from './data'

export default {
  removeUser: (_, { id }, { db }) => Data.removeUser(db, id),
  stopWatching: (_, { userID, animalID }, { db }) => Data.stopWatching(db, userID, animalID),
  user: (_, { id }, { db }) => Data.user(db, id),
  watch: (_, { userID, animalID }, { db }) => Data.watch(db, userID, animalID),
  watching: ({ id }, _, { db }) => Data.watching(db, id)
}
