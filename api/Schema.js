import {
  GraphQLObjectType,
  GraphQLSchema
} from 'graphql'
import queries from './animals/queries'

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    fields: queries,
    name: 'Query'
  })
})
