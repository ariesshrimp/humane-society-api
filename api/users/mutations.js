'use strict'
import {
  GraphQLString
} from 'graphql'
import Resolvers from './resolvers'
import User from './type'

export default {
  addFavorite: {
    args: {
      animal: {
        description: `Unique ID of the animal to add to the user's favorites list.`,
        type: GraphQLString
      },
      id: {
        description: `Unique ID of the target user.`,
        type: GraphQLString
      }
    },
    resolve: Resolvers.addFavorite,
    type: User
  }
}
