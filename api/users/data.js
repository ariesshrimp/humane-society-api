'use strict'
import app from '../database'

export const getByID = id => app.database().ref(`/users/${id}`)
  .once(`value`)
  .then(snapshot => snapshot.val())
