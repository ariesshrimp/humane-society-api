import { GraphQLBoolean, GraphQLID, GraphQLObjectType } from 'graphql'

export default new GraphQLObjectType({
  description: 'Was the given user deleted?',
  fields: {
    deleted: {
      description: 'Was this user deleted?',
      type: GraphQLBoolean
    },
    id: {
      description: 'What user did you try to delete?',
      type: GraphQLID
    }
  },
  name: 'Status'
})
