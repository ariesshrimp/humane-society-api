import * as Animal from '../animals/resolvers'

const data = [
  {
    date_joined: `2016-11-12`,
    email: `jose.fraley@gmail.com`,
    favorites: [ `0`, `1`, `2` ],
    id: `0`,
    name: `joefraley`,
    notifications: {
      filters: [ `RAT` ],
      frequency: `WEEKLY`
    },
    password: `password`
  }
]

const getByEmail = email => data.find(user => user.email === email)
const getByName = name => data.find(user => user.name === name)
const getFavorites = user => user.favorites.map(Animal.getByID)
const getNotificationSettings = id => data.find(user => user.id === id).notifications
const getUser = id => data.find(user => user.id === id)

export default {
  getByEmail,
  getByName,
  getFavorites,
  getNotificationSettings,
  getUser
}
