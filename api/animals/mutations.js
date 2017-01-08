/**
 * This file defines GraphQL resolvers that make mutations centered on a Animals
 */
'use strict'
import Animal from './type'
import {
  GraphQLString
} from 'graphql'
import Resolvers from './resolvers'

export default {
  removeAnimal: {
    args: {
      id: {
        description: `Unique ID of the target animal.`,
        type: GraphQLString
      }
    },
    resolve: Resolvers.removeAnimal,
    type: Animal
  }
}
