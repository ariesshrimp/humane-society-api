'use strict'
import {
  GraphQLString
} from 'graphql'
import Resolvers from './resolvers'
import User from './type'

export default {
  addFavorite: {
    args: {
      animalId: {
        description: `Unique ID of the animal to add to the user's favorites list.`,
        type: GraphQLString
      },
      userId: {
        description: `Unique ID of the target user.`,
        type: GraphQLString
      }
    },
    resolve: Resolvers.addFavorite,
    type: User
  },
  createUser: {
    args: {
      email: {
        description: `Valid email address for new user`,
        type: GraphQLString
      },
      name: {
        description: `New user's display name`,
        type: GraphQLString
      },
      password: {
        description: `New user's account password`,
        type: GraphQLString
      }
    },
    resolve: Resolvers.createUser,
    type: User
  },
  removeFavorite: {
    args: {
      animalId: {
        description: `Unique ID of the animal to add to the user's favorites list.`,
        type: GraphQLString
      },
      userId: {
        description: `Unique ID of the target user.`,
        type: GraphQLString
      }
    },
    resolve: Resolvers.removeFavorite,
    type: User
  },
  removeUser: {
    args: {
      userId: {
        description: `Unique ID of the target user.`,
        type: GraphQLString
      }
    },
    resolve: Resolvers.removeUser,
    type: User
  }
}
