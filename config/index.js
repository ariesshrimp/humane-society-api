'use strict'

let config = {}

if (process.env.NODE_ENV === 'development') config = require('./development')
else if (process.env.NODE_ENV === 'testing') config = require('./testing')
else if (process.env.NODE_ENV === 'production') config = require('./production')
else config = require('./testing')

export default config
