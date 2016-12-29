'use strict'
import * as Database from './data'
import R from 'ramda'
import { getByID } from '../animals/data'

export default {
  Mutation: {
    addFavorite (_, { userId, animalId }) {
      return Database.addFavorite(userId)(animalId)
    },
    createUser (_, { email, name, password }) {
      return Database.createUser({
        displayName: name,
        email,
        password
      })
    },
    removeFavorite (_, { userId, animalId }) {
      return Database.removeFavorite(userId)(animalId)
    },
    removeUser (_, { userId }) {
      return Database.removeUser(userId)
    }
  },
  Query: {
    user (_, { id }) {
      return Database.getByID(id)
    }
  },
  User: {
    favorites ({ favorites }) {
      const faves = R.keys(favorites)
      return Promise.all(R.map(getByID, faves))
    }
  }
}
