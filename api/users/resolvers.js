'use strict'
import * as Database from './data'

export default {
  addFavorite: (root, { id, animal }) => Database.addFavorite(id, animal),
  getUser: (root, { id }) => Database.getByID(id)
}
