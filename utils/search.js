const restaurants = require('../restaurants.json').restaurants

search = (tag) => {
  return restaurants.filter(rest =>
    rest.tags.includes(tag) ||
    rest.name.includes(tag) ||
    rest.description.includes(tag))
}

module.exports = search
