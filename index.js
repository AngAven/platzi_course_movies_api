const express = require('express')
const app = express()
const { config } = require('./config/index')
const moviesAPI = require('./routes/movies.js')

// const anioBisiesto = anio => {
//   const entreCuatro = anio % 4
//   const entreCien = anio % 100
//   const entreCuatrocientos = anio % 400
//
//   if (((entreCuatro === 0) && (entreCien !== 0)) || ((entreCuatro === 0) && (entreCien === 0) && (entreCuatrocientos === 0))) {
//         return `El año ${anio} es biciesto (tiene 366 días)`
//   }
//
//   return `El año ${anio} no es biciesto (tiene 365 días)`
// }
//
// app.get('/:profile', ((req, res) => {
//   console.log(req.params.profile)
//   res.send(req.params.profile)
// }))
//
// app.get('/anio/:number', ((req, res) => {
//   const anio = parseInt(req.params.number)
//   if(isNaN(anio)){
//     res.send('Ingrerse solo números')
//     return
//   }
//
//   res.send(anioBisiesto(anio))
// }))
//
// app.get('/json', ((req, res) => {
//   console.log(req.body)
//   res.json({ hello: 'Hello world' })
// }))

moviesAPI(app)

app.listen(config.port, () => {
  console.log( `Listening http://localhost:${config.port}`)
})
