const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('search with coordinates returns restaurants as json', async () => {
  await api
    .get('/restaurants/search?q=sushi&lat=60.17045&lon=24.93147')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('search with broken coordinates returns 404', async () => {
  await api
    .get('/restaurants/search?q=sushi&lat=coord&lon=24.93147')
    .expect(404)
})

test('when no restaurant is within 3km; 404 is returned', async () => {
  await api
    .get('/restaurants/search?q=sushi&lat=0&lon=0')
    .expect(404)
})
