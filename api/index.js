const { graphql } = require(`graphql`)
const { BasicSchema } = require(`./schema.js`)

const query = `{ 
    getAllNamed(name: "Ben") {
        name,
        species,
        color,
        adopt_fee,
        weight,
        sex,
        age,
        description,
        date_available,
        image_url,
        breed
    },
    getByBreed(breed: "Golden Retriever") {
        name,
        image_url
    }
    
}`

graphql(BasicSchema, query).then(r => console.log(JSON.stringify(r, null, '\t')))