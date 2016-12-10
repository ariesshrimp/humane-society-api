'use strict'
import { graphiqlExpress, graphqlExpress } from 'graphql-server-express'
import Database from '../api/database'
import Schema from '../api/Schema'
import express from 'express'
import { json } from 'body-parser'

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
  schema: Schema
}))


server.listen(PORT, () => {
  Database.auth()
  console.log(`Visit ${URL} in a browser.`)
})
