'use strict'
import * as Database from './data'

export default {
  addFavorite: (root, { userId, animalId }) => Database.addFavorite(userId)(animalId),
  getUser: (root, { id }) => Database.getByID(id),
  removeFavorite: (root, { userId, animalId }) => Database.removeFavorite(userId)(animalId)
}
