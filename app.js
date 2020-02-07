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

  if(req.query.q) {
    const filtered = search(req.query.q)

  if(filtered.length < 1)
    res.status(404).send('No restaurant matches your search!')
    else {
      if(req.query.lat || req.query.lon){
        const nearBy = locate(filtered, req.query.lat, req.query.lon)

        !nearBy ? res.status(404).send('Please enter proper coordinates!') :
        nearBy.length > 0 ? res.json(nearBy) :
        res.status(404).send('No restaurant within 3km!')
      }
      else res.json(filtered)
    }
  }
  else res.status(404).send('Please give search query parameters')
})

module.exports = app
