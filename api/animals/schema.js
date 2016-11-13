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
     getAllOfSex, 
     getYoungerThan, 
     getOlderThan, 
     sortByDateAvailable,
     getWithImage,
     getByBreed,
     getFriends,
     findPetsWithFriends
} = require('./data.js')

/** 
 * Shorthand Type Definitions
 *
 * type Animal  {
 *  id: String!
 *  name: String
 *  species: Enum
 *  color: String
 *  sex: Enum
 *  weight: Float
 *  age: Float
 *  image_url: String
 *  date_available: Date
 *  description: String
 *  adopt_fee: Float
 *  breed: String
 *  friends: [Animal]
 * }
 * 
 * type Dog {
 * 
 * }
 * 
 * type SmallAnimal {
 * 
 * }
 * 
 * type Cat {
 * 
 * }
 * 
 * type Horses {
 * 
 * }
*/

const AnimalType = new GraphQLObjectType({
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
            type: new GraphQLList(AnimalType),
            description: `A list of friends the animal has from their previous home, or while living in the shelter.`,
            resolve: animal => getFriends(animal)
        }
    })
})


const QueryType = new GraphQLObjectType({
    name: `Query`,
    fields: () => ({
        getAnimal: {
            type: AnimalType,
            args: {
                id: {
                    description: `ID of animal`,
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve: (root, { id }) => getByID(id)
        },
        getAllSpecies: {
            type: new GraphQLList(AnimalType),
            args: {
                species: {
                    description: `Biological species of animal.`,
                    type: GraphQLString
                }
            },
            resolve: (root, { species }) => getAllSpecies(species)
        },
        getAllNamed: {
            type: new GraphQLList(AnimalType),
            args: {
                name: {
                    type: GraphQLString,
                    description: `Given name of animal. Could return more than one animal with the same name.`
                }
            },
            resolve: (root, { name }) => getAllNamed(name)
        },
        getCheaperThan: {
            type: new GraphQLList(AnimalType),
            args: {
                maxPrice: {
                    type: GraphQLFloat,
                    description: `The max amount you'd pay for an adoption fee.`
                }
            },
            resolve: (root, { maxPrice }) => getCheaperThan(maxPrice)
        },
        getAllOfSex: {
            type: new GraphQLList(AnimalType),
            args: {
                sex: {
                    type: GraphQLString,
                    description: `Biological sex of the animal.`
                }
            },
            resolve: (root, { sex }) => getAllOfSex(sex)
        },
        getYoungerThan: {
            type: new GraphQLList(AnimalType),
            args: {
                maxAge: {
                    type: GraphQLFloat,
                    description: `The oldest an animal can be. Ages include maxAge.` 
                }
            },
            resolve: (root, { maxAge }) => getYoungerThan(maxAge)
        },
        getOlderThan: {
            type: new GraphQLList(AnimalType),
            args: {
                minAge: {
                    type: GraphQLFloat,
                    description: `The youngest an animal can be. Ages include minAge.`
                }
            },
            resolve: (root, { minAge }) => getOlderThan(minAge)
        },
        sortByDateAvailable: {
            type: new GraphQLList(AnimalType),
            resolve: (root) => sortByDateAvailable()
        },
        onlyThoseWithImage: {
            type: new GraphQLList(AnimalType),
            resolve: (root) => getWithImage()
        },
        getByBreed: {
            type: new GraphQLList(AnimalType),
             args: {
                breed: {
                    type: GraphQLString,
                    description: `The desired breed of an animal.` 
                }
            },
            resolve: (root, { breed }) => getByBreed(breed)
        },
        findPetsWithFriends: {
            type: new GraphQLList(AnimalType),
            resolve: (root) => findPetsWithFriends()
        }
    })
})

const AnimalSchema = new GraphQLSchema({
    query: QueryType,
    type: [ GraphQLString ]
})

module.exports = { AnimalSchema, AnimalType }