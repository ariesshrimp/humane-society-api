'use strict'
import {
  GraphQLString
} from 'graphql'
import Resolvers from './resolvers'
import User from './type'

export default {
  getUser: {
    args: {
      id: {
        description: `Unique ID of desired user.`,
        type: GraphQLString
      }
    },
    resolve: Resolvers.getUser,
    type: User
  }
}
