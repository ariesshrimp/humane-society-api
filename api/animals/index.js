const { graphql } = require(`graphql`)
const { AnimalSchema } = require(`./schema.js`)

const query = `{ 
    getAllSpecies(species: "RODENT") {
        name,
        id,
        age,
        image_url
    }
}`

graphql(AnimalSchema, query).then(r => console.log(JSON.stringify(r, null, '  ')))