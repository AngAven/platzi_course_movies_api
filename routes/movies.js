const express = require('express')
const { moviesMock } = require('../utils/mocks/movies.js')

function moviesAPI(app){
  const router = express.Router()
  app.use('/api/movies', router)

  router.get('/', async function(req, res, next){
    try {
      const movies = await Promise.resolve(moviesMock)

      res.status(200).json({
        data: movies,
        message: 'Movies listed'
      })
    } catch (e) {
      next(e)
    }
  })


  router.get('/:movieId', async function(req, res, next){
    try {
      const movies = await Promise.resolve(moviesMock[0])

      res.status(200).json({
        data: movies,
        message: 'Movie retrieved'
      })
    } catch (e) {
      next(e)
    }
  })

  router.post('/', async function(req, res, next){
    try {
      const createMovieId = await Promise.resolve(moviesMock[0].id)

      res.status(201).json({
        data: createMovieId,
        message: 'Movie created'
      })
    } catch (e) {
      next(e)
    }
  })

  router.put('/:movieId', async function(req, res, next){
    try {
      const updatedMovieId = await Promise.resolve(moviesMock[0].id)

      res.status(200).json({
        data: updatedMovieId,
        message: 'Movie replaced'
      })
    } catch (e) {
      next(e)
    }
  })

  router.delete('/:movieId', async function(req, res, next){
    try {
      const deletedMovie = await Promise.resolve(moviesMock[0].id)

      res.status(200).json({
        data: deletedMovie,
        message: 'movie deleted'
      })
    } catch (e) {
      next(e)
    }
  })
}

module.exports = moviesAPI
