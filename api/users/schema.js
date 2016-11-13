const { 
    GraphQLEnumType,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLNonNull,
    GraphQLString,
    GraphQLFloat,
    GraphQLList,
    GraphQLInterfaceType
 } = require(`graphql`)

const {
    getUser,
    getByName,
    getByEmail,
    getFavorites,
    getNotificationSettings
} = require(`./data.js`)

const { AnimalType } = require(`../animals/schema.js`)

/**
 * Type Short Hand
 *  type User {
 *  id: String!
 *  name: String!
 *  date_joined: Date
 *  email: String,
 *  password: String,
 *  favorites: [Animal]
 *  notifications:
 *      frequency: Enum
 *      filters: Enum
 * }
 */

const UserType = new GraphQLObjectType({
    name: `User`,
    description: `An app user.`,
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLString),
            description: `User's unique ID.`
        },
        name: {
            type: GraphQLString,
            description: `User's unique name.`
        },
        date_joined: {
            type: GraphQLString,
            description: `Calendar date on which the user created their account.`
        },
        email: {
            type: GraphQLString,
            description: `User's email address.`
        },
        password: {
            type: GraphQLString,
            description: `User's private account password.`,
            resolve: () => { throw Error(`Passwords are secret!`)}
        },
        favorites: {
            type: new GraphQLList(AnimalType),
            description: `List of animals this user has starred as favorites.`,
            resolve: user => getFavorites(user)
        },
        notifications: {
            type: new GraphQLObjectType({
                name: `Notifications`,
                description: `The user's selected notification settings.`,
                fields: () => ({
                    frequency: {
                        type: GraphQLString,
                        description: `Frequency with which the user wishes to recieve notifications.`
                    },
                    filters: {
                        type: new GraphQLList(GraphQLString),
                        description: `List of filters the user wishes to opt-IN for desired notifications.`
                    }
                }),
                resolve: user => getNotificationSettings(user)
            })
        }
    })
})

const QueryType = new GraphQLObjectType({
    name: `Query`,
    fields: () => ({
        getUser: {
            type: UserType,
            args: {
                id: {
                    description: `Unique ID of user.`,
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: (root, { id }) => getUser(id)
        }
    })
})

const UserSchema = new GraphQLSchema({
    query: QueryType,
    type: [ GraphQLString ]
})

module.exports = { UserSchema, UserType }