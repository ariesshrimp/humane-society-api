import express from 'express'
import { json } from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express'
import { AnimalSchema } from '../api/animals/schema'

const PORT = 4000
const app = express()

app.get(`/`, (request, response) => {
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

app.use(`/graphiql`, json(), graphiqlExpress({
  endpointURL: `/graphql` 
}))

app.use(`/graphql`, json(), graphqlExpress({ 
  schema: AnimalSchema 
}))

app.listen(PORT, () => {
  console.log(`Visit http://localhost:${ PORT }/graphiql in a browser.`)
})