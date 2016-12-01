import config from './config.firebase.json'
import firebase from 'firebase'

export const app = firebase.initializeApp(config)
export const database = app.database()
export const auth = app.auth()
