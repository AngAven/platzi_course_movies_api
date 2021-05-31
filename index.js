const express = require('express')
const app = express()
const { config } = require('./config/index')
const moviesAPI = require('./routes/movies.js')

moviesAPI(app)

app.listen(config.port, () => {
  console.log( `Listening http://localhost:${config.port}`)
})
