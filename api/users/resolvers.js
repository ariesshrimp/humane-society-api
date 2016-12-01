import DataBase from './data'

export default {
  Query: {
    getByEmail: (root, { email }) => DataBase.getByEmail(email),
    getByName: (root, { name }) => DataBase.getByName(name),
    getUser: (root, { id }) => DataBase.getUser(id)
  }
}
