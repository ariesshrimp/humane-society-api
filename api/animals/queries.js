'use strict'
import {
  GraphQLList,
  GraphQLNonNull,
  GraphQLString
} from 'graphql'
import Animal from './type'
import Resolvers from './resolvers'

export default {
  animal: {
    args: {
      id: {
        description: `ID of animal`,
        type: new GraphQLNonNull(GraphQLString)
      }
    },
    resolve: Resolvers.animal,
    type: Animal
  },
  animals: {
    args: {
      filter: {
        description: `The value you want the filtered property to match. For example, for prop "name" and filter "Simba", returns only animals where name = "Simba"`,
        type: new GraphQLNonNull(GraphQLString)
      },
      prop: {
        description: `The property that you want to filter by. For example, for prop "name" and filter "Simba", returns only animals where name = "Simba"`,
        type: GraphQLString
      }
    },
    resolve: Resolvers.animals,
    type: new GraphQLList(Animal)
  }
}
