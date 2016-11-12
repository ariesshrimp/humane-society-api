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
     getByID, 
     getAllSpecies, 
     getAllNamed, 
     getCheaperThan, 
     getAllSex, 
     getYoungerThan, 
     getOlderThan, 
     sortByAvailable,
     getWithImage,
     getByBreed,
     getFriends,
     getWithFriends
} = require('./data.js')

/** 
 * Shorthand Type Definitions
 *
 * type Animal  {
 *  id: String!
 *  name: String
 *  species: String
 *  color: String
 *  sex: String
 *  weight: Float
 *  age: Float
 *  image_url: String
 *  date_available: String
 *  description: String
 *  adopt_fee: Float
 *  breed: String
 *  friends: [Animal]
 * }
 * 
 * type User {
 *  id: String!
 *  name: String!
 *  date_joined: String
 *  email: String,
 *  password: String,
 *  favorites: [Animal]
 *  notifications:
 *      frequency: Enum
 *      filters: Enum
 * }
*/

const animalType = new GraphQLObjectType({
    name: `Animal`,
    description: `An animal`,
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLString),
            description: `Animal ID.` 
        },
        name: {
            type: GraphQLString,
            description: `Name of animal.`
        },
        species: {
            type: GraphQLString,
            description: `Species of animal.`
        },
        color: {
            type: GraphQLString,
            description: `Color of animal.`
        },
        adopt_fee: {
            type: GraphQLFloat,
            description: `Cost to adopt animal.`
        },
        weight: {
            type: GraphQLFloat,
            description: `Weight of the animal in English pounds.`
        },
        sex: {
            type: GraphQLString,
            description: `Biological sex of the animal.`
        },
        age: {
            type: GraphQLFloat,
            description: `Age of the animal in calendar months, starting from birth.`
        },
        description: {
            type: GraphQLString,
            description: `A short description of the animal.`
        },
        date_available: {
            type: GraphQLString,
            description: `The soonest date the animal is available for adoption.`
        },
        image_url: {
            type: GraphQLString,
            description: `A hosted image url.`
        },
        breed: {
            type: GraphQLString,
            description: `The arbitrary breed of species.`
        },
        friends: {
            type: new GraphQLList(animalType),
            description: `A list of friends the animal has from their previous home, or while living in the shelter.`,
            resolve: animal => getFriends(animal)
        }
    })
})


const queryType = new GraphQLObjectType({
    name: `Query`,
    fields: () => ({
        getAnimal: {
            type: animalType,
            args: {
                id: {
                    description: `ID of animal`,
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: (root, { id }) => getByID(id)
        },
        getAllSpecies: {
            type: new GraphQLList(animalType),
            args: {
                species: {
                    description: `Biological species of animal.`,
                    type: GraphQLString
                }
            },
            resolve: (root, { species }) => getAllSpecies(species)
        },
        getAllNamed: {
            type: new GraphQLList(animalType),
            args: {
                name: {
                    type: GraphQLString,
                    description: `Given name of animal. Could return more than one animal with the same name.`
                }
            },
            resolve: (root, { name }) => getAllNamed(name)
        },
        getCheaperThan: {
            type: new GraphQLList(animalType),
            args: {
                maxPrice: {
                    type: GraphQLFloat,
                    description: `The max amount you'd pay for an adoption fee.`
                }
            },
            resolve: (root, { maxPrice }) => getCheaperThan(maxPrice)
        },
        getAllSex: {
            type: new GraphQLList(animalType),
            args: {
                sex: {
                    type: GraphQLString,
                    description: `Biological sex of the animal.`
                }
            },
            resolve: (root, { sex }) => getAllSex(sex)
        },
        getYoungerThan: {
            type: new GraphQLList(animalType),
            args: {
                maxAge: {
                    type: GraphQLFloat,
                    description: `The oldest an animal can be. Ages include maxAge.` 
                }
            },
            resolve: (root, { maxAge }) => getYoungerThan(maxAge)
        },
        getOlderThan: {
            type: new GraphQLList(animalType),
            args: {
                minAge: {
                    type: GraphQLFloat,
                    description: `The youngest an animal can be. Ages include minAge.`
                }
            },
            resolve: (root, { minAge }) => getOlderThan(minAge)
        },
        sortByAvailable: {
            type: new GraphQLList(animalType),
            resolve: (root) => sortByAvailable()
        },
        onlyThoseWithImage: {
            type: new GraphQLList(animalType),
            resolve: (root) => getWithImage()
        },
        getByBreed: {
            type: new GraphQLList(animalType),
             args: {
                breed: {
                    type: GraphQLString,
                    description: `The desired breed of an animal.` 
                }
            },
            resolve: (root, { breed }) => getByBreed(breed)
        },
        getWithFriends: {
            type: new GraphQLList(animalType),
            resolve: (root) => getWithFriends()
        }
    })
})

const BasicSchema = new GraphQLSchema({
    query: queryType,
    type: [ GraphQLString ]
})

module.exports = { BasicSchema }