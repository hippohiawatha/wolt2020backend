const restaurants = require('./restaurants.json').restaurants
const search = require('./utils/search.js')
const locate = require('./utils/locate.js')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.get('/restaurants', (req, res) => {
  res.json(restaurants)
})

app.get('/restaurants/search', function(req, res) {
  const tag = req.query.q
  const coords = {
    latitude : req.query.lat,
    longitude : req.query.lon
  }
  const filtered = search(tag)
  const nearBy = locate(filtered, coords)

  filtered.length < 1 ? res.send('No restaurant matches your search') :
  nearBy.length < 1 ? res.send('No restaurants within 3km') : res.json(nearBy)

})

module.exports = app
