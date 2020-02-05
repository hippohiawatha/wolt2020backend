const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('searched restaurants are returned as json', async () => {
  await api
    .get('/restaurants/search?q=burrito')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('empty query string returns 404', async () => {
  await api
    .get('/restaurants/search?q=')
    .expect(404)
})


test('when no restaurants are found; 404 is returned', async () => {
  await api
    .get('/restaurants/search?q=nothing_here')
    .expect(404)
})
