'use strict'
import {
  GraphQLObjectType,
  GraphQLSchema
} from 'graphql'
// import AnimalQueries from './animals/queries'
// import R from 'ramda'
import UserQueries from './users/queries'

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    fields: UserQueries,
    name: 'Query'
  })
})
