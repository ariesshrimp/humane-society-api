/**
 * This file defines GraphQL resolvers that make mutations centered on a User
 */
'use strict'
import {
  GraphQLString
} from 'graphql'
import Resolvers from './resolvers'
import User from './type'

export default {
  removeUser: {
    args: {
      id: {
        description: `Unique ID of the target user.`,
        type: GraphQLString
      }
    },
    resolve: Resolvers.removeUser,
    type: User
  },
  stopWatching: {
    args: {
      animalID: {
        description: `Unique ID of the animal to add to the user's favorites list.`,
        type: GraphQLString
      },
      userID: {
        description: `Unique ID of the target user.`,
        type: GraphQLString
      }
    },
    resolve: Resolvers.stopWatching,
    type: User
  },
  watch: {
    args: {
      animalID: {
        description: `Unique ID of the animal to add to the user's favorites list.`,
        type: GraphQLString
      },
      userID: {
        description: `Unique ID of the target user.`,
        type: GraphQLString
      }
    },
    resolve: Resolvers.watch,
    type: User
  }
}
