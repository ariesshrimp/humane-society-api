// This file defines GraphQL input types that are fed to mutations centered on Animals
'use strict'
import {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString
} from 'graphql'

export default new GraphQLInputObjectType({
  description: `A user`,
  fields: () => ({
    email: {
      description: `The users's chosen email address.`,
      type: GraphQLString
    },
    id: {
      description: `A unique identifier for this user in the humane society database.`,
      type: new GraphQLNonNull(GraphQLID)
    },
    name: {
      description: `The users's chosen name.`,
      type: new GraphQLNonNull(GraphQLString)
    },
    password: {
      description: `The users's account password.`,
      type: new GraphQLNonNull(GraphQLString)
    }
  }),
  name: `UserInput`
})
