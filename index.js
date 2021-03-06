const express = require('express')
const app = express()
const debug = require("debug")("app:server");
const { config } = require('./config/index')
const moviesAPI = require('./routes/movies.js')
const {logErrors, wrapErrors, errorHandler} = require('./utils/middleware/errorHandlers')
const notFoundHandler = require('./utils/middleware/notFoundHandler')

//body parser ->  para entender que lo que esta viniendo en el body es un json
app.use(express.json())

//rutas
moviesAPI(app)

//Capturar 404
app.use(notFoundHandler)

// Errores al final de las rutas
app.use(logErrors)
app.use(wrapErrors)
app.use(errorHandler)

app.listen(config.port, () => {
  debug( `Listening http://localhost:${config.port}`)
})
