'use strict'
import { graphiqlExpress, graphqlExpress } from 'graphql-server-express'
// import Database from '../api/database'
import Schema from '../api/Schema'
import express from 'express'
import { json } from 'body-parser'
import winston from 'winston'

winston.configure({
  transports: [
    new (winston.transports.Console)({
      filename: `errors.json`,
      json: true,
      prettyPrint: true
    })
  ]
})

const PORT = 4000
const server = express()
const URL = `http://localhost:${PORT}/graphiql`

server.get(`/`, (request, response) => {
  response.send(`
    <style>
      center {
        display: flex;
        height: 100vh;
        justify-content: center;
        align-items: center;
      }
    </style>
    <center>
      <h1>Visit <a href="${URL}">${URL}</a> in a browser.</h1>
    </center>
  `)
})

server.use(`/graphiql`, json(), graphiqlExpress({
  endpointURL: `/graphql`
}))

server.use(`/graphql`, json(), graphqlExpress({
  formatError: winston.error,
  schema: Schema
}))

server.listen(PORT, () => {
  console.log(`Server started at ${(new Date()).toString()}
Visit ${URL} in a browser.`)
})

export default server
