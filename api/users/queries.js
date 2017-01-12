// This file defines GraphQL READ resolvers for Users
'use strict'
import { GraphQLID, GraphQLNonNull } from 'graphql'
import Resolvers from './resolvers'
import User from './type'

export default {
  user: {
    args: {
      id: {
        description: `Unique ID of desired user.`,
        type: new GraphQLNonNull(GraphQLID)
      }
    },
    resolve: Resolvers.user,
    type: User
  }
}
