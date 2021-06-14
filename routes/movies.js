const express = require('express')
const MoviesService = require('../services/movies')
const validationHandler = require('../utils/middleware/validationHandler')
const cacheResponse = require('../utils/cacheResponse')
const { FIVE_MINUTES_IN_SECONDS, SIXTY_MINUTES_IN_SECONDS } = require('../utils/time')
const {
  movieIdSchema,
  createMovieSchema,
  updateMovieSchema
} = require('../utils/schemas/movies')

function moviesAPI(app) {
  const router = express.Router()
  const moviesService = new MoviesService()

  app.use('/api/movies', router)

  router.get('/',
    // middleware
    async function(
      req,
      res,
      next) {
      cacheResponse(res, FIVE_MINUTES_IN_SECONDS)
      const { tags } = req.query

      // Ejemplo de manejo de errores en una función asincrona en un bloque try ... catch
      try {
        const movies = await moviesService.getMovies({ tags })

        // para probar middleware de errores
        // throw new Error('Error getting movies')

        res.status(200).json({
          data: movies,
          message: 'Movies listed'
        })
      } catch (e) {
        next(e)
      }
    })

  router.get('/:movieId',
    // middlewares
    validationHandler({ movieId: movieIdSchema }, 'params'),
    async function(
      req,
      res,
      next) {
      cacheResponse(res, SIXTY_MINUTES_IN_SECONDS)
      const { movieId } = req.params

      try {
        const movie = await moviesService.getMovie({ movieId })

        res.status(200).json({
          data: movie,
          message: 'Movie retrieved'
        })
      } catch (e) {
        next(e)
      }
    })

  router.post('/',
    // middlewares
    validationHandler(createMovieSchema),
    async function(
      req,
      res,
      next) {
      const { body: movie } = req

      try {
        const createMovieId = await moviesService.createMovie({ movie })

        res.status(201).json({
          data: createMovieId,
          message: 'Movie created'
        })
      } catch (e) {
        next(e)
      }
    })

  router.put('/:movieId',
    // middlewares
    validationHandler({ movieId: movieIdSchema }, 'params'),
    validationHandler(updateMovieSchema),
    async function(
      req,
      res,
      next) {
      const { movieId } = req.params
      const { body: movie } = req

      try {
        const updatedMovieId = await moviesService.updateMovie({
          movieId,
          movie
        })

        res.status(200).json({
          data: updatedMovieId,
          message: 'Movie replaced'
        })
      } catch (e) {
        next(e)
      }
    })

  router.delete('/:movieId',
    // middlewares
    validationHandler({ movieId: movieIdSchema }, 'params'),
    async function(
      req,
      res,
      next) {
      const { movieId } = req.params
      try {
        const deletedMovieId = await moviesService.deleteMovie({ movieId })
        res.status(200).json({
          data: deletedMovieId,
          message: 'movie deleted'
        })
      } catch (e) {
        next(e)
      }
    })
}

module.exports = moviesAPI
