/**
 * These functions contain the business logic that connects GraphQL resolver arguments
 * to our contextual database choices.
 * The database isntance is passed in via context at runtime,
 * which allows these functions to be more idempotent,
 * and makes testing much easier.
 * Currently we use Neo4j Graph Database, so each function maps a behavior to a
 * Cypher query, then returns the affected user peeled off of the Neo4j response
 */
'use strict'
import R from 'ramda'

const get = key => record => record.get(key)
const props = R.prop('properties')
const records = R.prop('records')
const first = R.compose(R.head, records)
const safe = func => R.tryCatch(func, R.always(null))

const _animal = R.compose(props, get('a'))
const _animals = safe(R.compose(R.map(_animal), records))
const _users = safe(R.compose(R.map(props), get('us'), first))

const firstAnimal = safe(R.compose(_animal, first))

export const animal = (session, id) => session.run(`
  MATCH (a:Animal {id: {id}})
  RETURN a
`, { id })
.then(firstAnimal)

export const animals = (session, prop, value) => session.run(`
  MATCH (a:Animal)
  WHERE a[{prop}] = {value}
  RETURN a
`, { prop, value })
.then(_animals)

export const createAnimal = (session, props) => session.run(`
  MERGE (a:Animal {
    age: {age},
    breed: {breed},
    colors: {colors},
    dateAvailable: {dateAvailable},
    description: {description},
    fee: {fee},
    id: {id},
    imageURL: {imageURL},
    name: {name},
    sex: {sex},
    species: {species},
    weight: {weight}
  })
  RETURN a
`, props).then(firstAnimal)

export const removeAnimal = (session, id) => session.run(`
  MATCH (a:Animal {id: {id}})
  DETACH DELETE a
`, { id })
.then(R.always({ deleted: true, id })).catch(R.always({ deleted: false, id }))

export const followers = (session, id) => session.run(`
  MATCH (a:Animal {id: {id}})<-[:IS_WATCHING]-(u:User)
  RETURN collect(u) as us
`, { id })
.then(_users)
