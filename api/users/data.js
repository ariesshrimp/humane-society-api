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
// function log (v) {
//   console.trace()
//   console.log(v)
//   return v
// }
const _animal = safe(R.compose(props, get('a')))
const _user = safe(R.compose(props, get('u'), first))

const _animals = safe(R.compose(R.map(_animal), records))

export const user = (session, id) => session.run(`
  MATCH (u:User {id: {id}})
  RETURN u
`, { id }).then(_user)

export const createUser = (session, props) => session.run(`
  MERGE (u:User {
    email: {email},
    id: {id},
    name: {name},
    password: {password}
  })
  RETURN u
`, props).then(_user)

export const removeUser = (session, id) => session.run(`
  MATCH (u:User {id: {id}})
  DETACH DELETE u
`, { id }).then(R.always({ deleted: true, id })).catch(R.always({ deleted: false, id }))

export const follow = (session, userID, animalID) => session.run(`
  MATCH (u:User {id: {userID}})
  MATCH (a:Animal {id: {animalID}})
  MERGE (u)-[r:IS_WATCHING]->(a)
  RETURN u, collect(r) as watching
`, { animalID, userID }).then(_user)

export const unfollow = (session, userID, animalID) => session.run(`
  MATCH (u:User {id: {userID}})
  MATCH (a:Animal {id: {animalID}})
  MATCH (u)-[r:IS_WATCHING]->(a)
  DELETE r
  RETURN u
`, { animalID, userID }).then(_user)

export const following = (session, id) => session.run(`
  MATCH (u:User {id: {id}})-[:IS_WATCHING]->(a:Animal)
  RETURN a
`, { id }).then(_animals)
