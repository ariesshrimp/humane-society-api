'use strict'
import {
  GraphQLObjectType,
  GraphQLSchema
} from 'graphql'
import AnimalQueries from './animals/queries'
import R from 'ramda'
import UserMutations from './users/mutations'
import UserQueries from './users/queries'

export default new GraphQLSchema({
  mutation: new GraphQLObjectType({
    fields: R.merge(UserMutations),
    name: 'Mutation'
  }),
  query: new GraphQLObjectType({
    fields: R.merge(AnimalQueries, UserQueries),
    name: 'Query'
  })
})
