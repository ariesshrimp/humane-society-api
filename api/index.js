const { graphql } = require(`graphql`)
const { BasicSchema } = require(`./schema.js`)

const query = `{ 
    getWithFriends {
        name
        friends {
            name
        }
    }
}`

graphql(BasicSchema, query).then(r => console.log(JSON.stringify(r, null, '  ')))