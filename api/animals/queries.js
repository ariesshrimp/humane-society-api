'use strict'
import {
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString
} from 'graphql'
import Animal from './type'
import Resolvers from './resolvers'

export default {
  getAllNamed: {
    args: {
      name: {
        description: `Given name of animal. Could return more than one animal with the same name.`,
        type: GraphQLString
      }
    },
    resolve: Resolvers.getAllNamed,
    type: new GraphQLList(Animal)
  },

  getAllOfSex: {
    args: {
      sex: {
        description: `Anatomical sex of the animal.`,
        type: GraphQLString
      }
    },
    resolve: Resolvers.getAllOfSex,
    type: new GraphQLList(Animal)
  },

  getAllSpecies: {
    args: {
      species: {
        description: `Biological species of animal.`,
        type: GraphQLString
      }
    },
    resolve: Resolvers.getAllSpecies,
    type: new GraphQLList(Animal)
  },

  getAnimal: {
    args: {
      id: {
        description: `ID of animal`,
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: Resolvers.getByID,
    type: Animal
  },

  getByBreed: {
    args: {
      breed: {
        description: `The desired breed of an animal.`,
        type: GraphQLString
      }
    },
    resolve: Resolvers.getByBreed,
    type: new GraphQLList(Animal)
  },

  getCheaperThan: {
    args: {
      maxPrice: {
        desription: `The max amount you'd pay as an adoption fee.`,
        type: GraphQLFloat
      }
    },
    resolve: Resolvers.getCheaperThan,
    type: new GraphQLList(Animal)
  },

  getOlderThan: {
    args: {
      minAge: {
        description: `The youngest an animal can be. Ages include minAge.`,
        type: GraphQLFloat
      }
    },
    resolve: Resolvers.getOlderThan,
    type: new GraphQLList(Animal)
  },

  getYoungerThan: {
    args: {
      maxAge: {
        description: `The oldest an animal can be. Ages include maxAge.`,
        type: GraphQLFloat
      }
    },
    resolve: Resolvers.getYoungerThan,
    type: new GraphQLList(Animal)
  }
}
