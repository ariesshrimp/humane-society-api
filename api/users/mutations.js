// This file defines GraphQL resolvers that make mutations centered on a User
'use strict'
import { GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql'
import Resolvers from './resolvers'
import Status from '../meta'
import User from './type'

export default {
  createUser: {
    args: {
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
    },
    resolve: Resolvers.createUser,
    type: User
  },
  follow: {
    args: {
      animalID: {
        description: `Unique ID of the animal to add to the user's favorites list.`,
        type: new GraphQLNonNull(GraphQLID)
      },
      userID: {
        description: `Unique ID of the target user.`,
        type: new GraphQLNonNull(GraphQLID)
      }
    },
    resolve: Resolvers.follow,
    type: User
  },
  removeUser: {
    args: {
      id: {
        description: `Unique ID of the target user.`,
        type: new GraphQLNonNull(GraphQLID)
      }
    },
    resolve: Resolvers.removeUser,
    type: Status
  },
  unfollow: {
    args: {
      animalID: {
        description: `Unique ID of the animal to add to the user's favorites list.`,
        type: new GraphQLNonNull(GraphQLID)
      },
      userID: {
        description: `Unique ID of the target user.`,
        type: new GraphQLNonNull(GraphQLID)
      }
    },
    resolve: Resolvers.unfollow,
    type: User
  }
}
