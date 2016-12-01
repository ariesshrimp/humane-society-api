import Animal from '../animals/schema'

export const User = `
  type User {
    date_joined: String
    email: String
    favorites: [ Animal ]
    id: String
    name: String
    password: String
  }
`

export const UserQuery = `
  type Query {
    getByEmail(email: String): User
    getByName(name: String): User
    getUser(id: String): User
  }
`
