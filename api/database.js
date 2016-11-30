import firebase from 'firebase'
import config from './config.firebase.json'

export const app = firebase.initializeApp(config)
export const database = app.database()
export const auth = app.auth()