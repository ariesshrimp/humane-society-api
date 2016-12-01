import { Animal, AnimalQuery, Schema } from './animals/schema'
import { User, UserQuery } from './users/schema'
import { resolvers as animalResolvers } from './animals/resolvers'
import { makeExecutableSchema } from 'graphql-tools'
import { merge } from 'ramda'
import { resolvers as userResolvers } from './users/resolvers'

export default makeExecutableSchema({
  logger: { log: error => console.error(error) },
  resolvers: animalResolvers,
  typeDefs: [ Schema ]
})
