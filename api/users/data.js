const Animal = require(`../animals/data.js`)

const data = [
    {
        id: `0`,
        name: `joefraley`,
        date_joined: `2016-11-12`,
        email: `jose.fraley@gmail.com`,
        password: `password`,
        favorites: [ `0`, `1`, `2` ],
        notifications: {
            frequency: `WEEKLY`,
            filters: [ `RAT` ]
        }
    },
    {
        id: `1`,
        name: `amanda`,
        date_joined: `2016-12-12`,
        email: `amandabrockman7@gmail.com`,
        password: `password`,
        favorites: [],
        notifications: {
            frequency: `NEVER`,
            filters: []
        }
    },
    {
        id: `2`,
        name: `kiley`,
        date_joined: `2016-12-12`,
        email: `smileykiley@hotmail.com`,
        password: `password`,
        favorites: [`2`],
        notifications: {
            frequency: `DAILY`,
            filters: [ `DOG` ]
        }
    }
]

const getUser = id => data.find(user => user.id === id)
const getByName = name => data.find(user => user.name === name)
const getByEmail = email => data.find(user => user.email === email)
const getNotificationSettings = id => data.find(user => user.id === id).notifications
const getFavorites = user => user.favorites.map(Animal.getByID) 

module.exports = {
    getUser,
    getByName,
    getByEmail,
    getNotificationSettings,
    getFavorites
}