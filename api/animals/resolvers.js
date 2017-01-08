/**
 * GraphQL resolver functions are centralized here to make them
 * more portable. This way they can be shared between mutations, queries, and entity definitions.
 * Each function assumes the standard GraphQL resolver parameter pattern:
 * (parentNode, arguments, context) => {}
 */
'use strict'
import * as Data from './data'

export default {
  animal: (_, { id }, { db }) => Data.animal(db, id),
  animals: (_, { value, prop }, { db }) => Data.animals(db, prop, value),
  followers: ({ id }, _, { db }) => Data.followers(db, id),
  removeAnimal: (_, { id }, { db }) => Data.animals(db, id)
}
