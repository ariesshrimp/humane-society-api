const firebase = require(`firebase`)
const config = require(`./config.firebase.json`)

const app = firebase.initializeApp(config)
const database = app.database()

module.exports = { app, database }