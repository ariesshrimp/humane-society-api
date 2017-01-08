'use strict'
import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLString
} from 'graphql'
import Animal from '../animals/type'
import Resolvers from './resolvers'

export default new GraphQLObjectType({
  description: `A user`,
  fields: () => ({
    email: {
      description: `The users's chosen email address.`,
      type: GraphQLString
    },
    id: {
      description: `A unique identifier for this user in the humane society database.`,
      type: GraphQLString
    },
    name: {
      description: `The users's chosen name.`,
      type: GraphQLString
    },
    password: {
      description: `The users's account password.`,
      type: GraphQLString
    },
    watching: {
      description: `Animals this user is currently watching.`,
      resolve: Resolvers.watching,
      type: new GraphQLList(Animal)
    }
  }),
  name: `User`
})
