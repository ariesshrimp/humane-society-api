const { graphql } = require(`graphql`)
const { UserSchema } = require(`./schema.js`)

const query = `{ 
    getUser(id: "0") {
        name,
        id,
        date_joined,
        email,
        favorites {
            name
        },
        notifications {
            frequency
        }
    }
}`
const stringify = (object) => JSON.stringify(object, null, '\t')
graphql(UserSchema, query).then(stringify).then(console.log)