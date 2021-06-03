const express = require('express')
const app = express()
const { config } = require('./config/index')
const moviesAPI = require('./routes/movies.js')
const {logErrors, errorHandler} = require('./utils/middleware/errorHandlers')

//body parser ->  para entender que lo que esta viniendo en el body es un json
app.use(express.json())

//rutas
moviesAPI(app)

// Errores al final de las rutas
app.use(logErrors)
app.use(errorHandler)

app.listen(config.port, () => {
  console.log( `Listening http://localhost:${config.port}`)
})
