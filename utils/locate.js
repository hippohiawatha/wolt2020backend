const restaurants = require('../restaurants.json').restaurants
const haversine = require('haversine')

isNear = (rest, coords) => {
  const location = {
    latitude : rest.location[1],
    longitude : rest.location[0]
  }
  return haversine(coords, location, {threshold: 3})
}

locate = (filtered, coords) => {
  return filtered.filter(rest => isNear(rest, coords))
}

module.exports = locate
