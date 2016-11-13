const { graphql } = require(`graphql`)
const { AnimalSchema } = require(`./schema.js`)

const query = `{ 
    findPetsWithFriends {
        name
        friends {
            name
        }
    }
}`

graphql(AnimalSchema, query).then(r => console.log(JSON.stringify(r, null, '  ')))