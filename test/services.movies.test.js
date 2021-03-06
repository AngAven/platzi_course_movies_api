const assert = require('assert')
const proxyquire = require('proxyquire')
const { getAllStub, MongoLibMock } = require('../utils/mocks/mongoLib')
const { moviesMock } = require('../utils/mocks/movies')

describe('services - movies', function() {
  const MoviesService = proxyquire('../services/movies', {
    '../lib/mongo': MongoLibMock
  })

  const moviesService = new MoviesService()

  describe('whe movies method is called', async function(){
    it('Should call the getAll Mongolib method', async function () {
      console.log('--->>>', await moviesService.getMovies({}))
      await moviesService.getMovies({})
      assert.strictEqual(getAllStub.called, true)
    })

    // it('Should return an array of movies', async function (){
    //   const result = await moviesService.getMovies({})
    //   const expected = moviesMock
    //   console.log('------------------->', result)
    //   assert.deepStrictEqual(result, expected)
    // })
  })
})
