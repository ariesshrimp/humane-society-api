'use strict'
import { HOST, PASSWORD, USER } from './config'
import { v1 } from 'neo4j-driver'

const driver = v1.driver(`bolt://${HOST}`, v1.auth.basic(USER, PASSWORD))

let session
export default function database () {
  if (session) return session
  else session = driver.session()
  return session
}

export function shutdown () {
  if (session) session.close()
  driver.close()
}
