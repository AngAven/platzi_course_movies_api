const express = require('express')
const MoviesService = require('../services/movies')

function moviesAPI(app){
  const router = express.Router()
  const moviesService = new MoviesService()
  app.use('/api/movies', router)

  router.get('/', async function(req, res, next){
    const {tags} = req.query

    try {
      const movies = await moviesService.getMovies({tags})

      res.status(200).json({
        data: movies,
        message: 'Movies listed'
      })
    } catch (e) {
      next(e)
    }
  })

  router.get('/:movieId', async function(req, res, next){
    const {movieId} = req.params

    try {
      const movie = await moviesService.getMovie({movieId})

      res.status(200).json({
        data: movie,
        message: 'Movie retrieved'
      })
    } catch (e) {
      next(e)
    }
  })

  router.post('/', async function(req, res, next){
    const { body: movie } = req

    try {
      const createMovieId = await moviesService.createMovie({movie})

      res.status(201).json({
        data: createMovieId,
        message: 'Movie created'
      })
    } catch (e) {
      next(e)
    }
  })

  router.put('/:movieId', async function(req, res, next){
    const { movieId } = req.params
    const { body: movie } = req

    try {
      const updatedMovieId = await moviesService.updateMovie({
        movieId,
        movie,
      })

      res.status(200).json({
        data: updatedMovieId,
        message: 'Movie replaced'
      })
    } catch (e) {
      next(e)
    }
  })

  router.patch('/:movieId', async function(req, res, next){
    const { movieId } = req.params
    const { body: movie } = req

    try {
      const updatedMovieId = await moviesService.patchMovie({
        movieId,
        movie,
      })

      res.status(200).json({
        data: updatedMovieId,
        message: 'Movie patch'
      })
    } catch (e) {
      next(e)
    }
  })

  router.delete('/:movieId', async function(req, res, next){
    const { movieId } = req.params
    try {
      const deletedMovieId = await moviesService.deleteMovie()
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
