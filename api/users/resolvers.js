'use strict'
import * as Database from './data'

export default {
  addFavorite: (_, { userId, animalId }) => Database.addFavorite(userId)(animalId),
  createUser: (_, { email, name, password }) => Database.createUser({
    displayName: name,
    email,
    password
  }),
  getUser: (_, { id }) => Database.getByID(id),
  removeFavorite: (_, { userId, animalId }) => Database.removeFavorite(userId)(animalId),
  removeUser: (_, { userId }) => Database.removeUser(userId)
}
