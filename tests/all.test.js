const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('all restaurants are returned as json', async () => {
  await api
    .get('/restaurants')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('request to /restaurants/search without any parameters returns 404', async () => {
  await api
    .get('/restaurants/search')
    .expect(404)
})
