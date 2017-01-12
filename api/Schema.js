'use strict'
import { GraphQLObjectType, GraphQLSchema } from 'graphql'
// import AnimalInput from './animals/input'
import AnimalMutations from './animals/mutations'
import AnimalQueries from './animals/queries'
import R from 'ramda'
// import UserInput from './users/input'
import UserMutations from './users/mutations'
import UserQueries from './users/queries'

export default new GraphQLSchema({
  mutation: new GraphQLObjectType({
    fields: R.merge(AnimalMutations, UserMutations),
    name: 'Mutation'
  }),
  query: new GraphQLObjectType({
    fields: R.merge(AnimalQueries, UserQueries),
    name: 'Query'
  })
  // types: [AnimalInput, UserInput]
})
