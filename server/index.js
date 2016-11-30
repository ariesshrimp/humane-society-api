import express from 'express'
import { json } from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'
import { AnimalSchema } from '../api/animals/schema'
import { auth } from '../api/database'

const PORT = 4000
const server = express()
// comment
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
    <h1>Visit <a href="http://localhost:${ PORT }/graphiql">http://localhost:${ PORT }/graphiql</a> in a browser.</h1>
  </center>
`)
})

server.use(`/graphiql`, json(), graphiqlExpress({
  endpointURL: `/graphql` 
}))

server.use(`/graphql`, json(), graphqlExpress({ 
  schema: AnimalSchema 
}))


auth.signInAnonymously()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Visit http://localhost:${ PORT }/graphiql in a browser.`)
    })
  })
  .catch(({ message }) => {
    console.error(message)
    process.exit()
  })
