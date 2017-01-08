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

const records = R.prop('records')
const first = R.compose(R.head, records)

export const animal = (session, id) => session.run(`
  MATCH (a:Animal {id: {id}})
  RETURN a
`, { id })
.then(first)

export const animals = (session, prop, filter) => session.run(`
  MATCH (a:Animal)
  RETURN filter(animal IN a WHERE animal.{prop} = {filter})
`, { filter, prop })
.then(records)

export const followers = (session, id) => session.run(`
  MATCH (a:Animal {id: {id}})<-[:IS_WATCHING]-(u:User)
  RETURN collect(u) as followers
`, { id })
.then(records)

export const removeAnimal = (session, id) => session.run(`
  MATCH (a:Animal {id: {id}})<-[r:IS_WATCHING]-(:User)
  DELETE (a, r)
  RETURN a
`, { id })
.then(first)
