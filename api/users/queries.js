'use strict'
/**
 * This file defines GraphQL READ resolvers for Users
 */
import {
  GraphQLString
} from 'graphql'
import Resolvers from './resolvers'
import User from './type'

export default {
  user: {
    args: {
      id: {
        description: `Unique ID of desired user.`,
        type: GraphQLString
      }
    },
    resolve: Resolvers.user,
    type: User
  }
}
