'use strict'
import * as Database from './data'

export default {
  getUser: (root, { id }) => Database.getByID(id)
}
