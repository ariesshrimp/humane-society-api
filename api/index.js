'use strict'
import Animal from './animals'
import R from 'ramda'
import Schema from './rootSchema.graphql'
import User from './users'
import { makeExecutableSchema } from 'graphql-tools'

function deepMerge (a, b) {
  return (R.is(Object, a) && R.is(Object, b))
    ? R.mergeWith(deepMerge, a, b)
    : b
}

function mergeResolvers (...objects) {
  return R.reduce(
    (accumulator, object) => deepMerge(accumulator, object),
    {},
    objects
  )
}

export default makeExecutableSchema({
  resolvers: mergeResolvers(Animal.Resolvers, User.Resolvers),
  typeDefs: [ Schema, Animal.Schema, User.Schema ]
})
