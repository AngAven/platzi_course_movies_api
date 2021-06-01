const MongoLib = require('../lib/mongo')

class MoviesService {
  constructor() {
    this.collection = 'movies'
    this.mongoDB = new MongoLib()
  }

  async getMovies({ tags }) {
    const query = tags && { tgas: { $in: tags } }
    const movies = await this.mongoDB.getAll(this.collection, query)
    return movies || []
  }

  async getMovie({ movieId }){
    const movie = await this.mongoDB.get(this.collection, movieId)
    return movie || {}
  }

  async createMovie({ movie }){
    const createdMovieid = await this.mongoDB.create(this.collection, movie)
    return createdMovieid
  }

  async updateMovie({ movieId, movie } = {}){
    const updatedMovieId = await this.mongoDB.update(this.collection, movieId, movie)
    return updatedMovieId
  }

  async deleteMovie(){
    const deletedMovieId = await Promise.resolve(moviesMock[0].id)
    return deletedMovieId
  }

}

module.exports = MoviesService
