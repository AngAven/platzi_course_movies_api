const assert = require('assert')
const proxyquire = require('proxyquire')
const { moviesMock, MovieServiceMock} = require('../utils/mocks/movies')
const testServer = require('../utils/testServer')


describe('routes - movies', function() {
  const route = proxyquire('../routes/movies', {
    '../services/movies': MovieServiceMock
  })
  const request = testServer(route)

  describe('GET /movies', function(){
    it('shoud respond with status 200', function(done){
      request.get('/api/movies').expect(200, done)
    })

    it('shoud respond with the list of movies', function(done) {
      request.get('/api/movies').end((err, res) => {
        assert.deepStrictEqual(res.body, {
          data: moviesMock,
          message: 'Movies listed'
        })
        done()
      })
    })
  })
})
