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
const _animal = R.compose(props, get('a'))
const _animals = R.compose(R.map(_animal), records)
const _user = R.compose(props, get('u'), first)

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

export const removeUser = (session, userID) => session.run(`
  MATCH (u:User {id: {userID}})
  DETACH DELETE u
  RETURN u
`, { userID }).then(_user)

export const watch = (session, userID, animalID) => session.run(`
  MATCH (u:User {id: {userID}})
  MATCH (a:Animal {id: {animalID}})
  MERGE (u)-[r:IS_WATCHING]->(a)
  RETURN u, collect(r) as watching
`, { animalID, userID }).then(_user)

export const stopWatching = (session, userID, animalID) => session.run(`
  MATCH (u:User {id: {userID}})-[r:IS_WATCHING]->(a:Animal {id: {animalID}})
  DELETE r
  MATCH (u)-[s:IS_WATCHING]->(:Animal)
  RETURN u, collect(s) as watching
`, { animalID, userID }).then(_user)

export const watching = (session, id) => session.run(`
  MATCH (u:User {id: {id}})-[:IS_WATCHING]->(a:Animal)
  RETURN a
`, { id }).then(_animals)
