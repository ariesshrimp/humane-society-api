'use strict'
import firebase from 'firebase-admin'
import { resolve } from 'path'

const CONFIG = resolve(__dirname, `config.firebase.json`)

// cache the resolved app for pure returns during import
let app

export default function () {
  if (app === undefined) {
    app = firebase.initializeApp({
      credential: firebase.credential.cert(CONFIG),
      databaseURL: `https://humane-society-scrape.firebaseio.com`
    })
    return app
  } else return app
}
