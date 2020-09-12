const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// set search route
router.get('/', (req, res) => {
  const keyword = req.query.keyword
  Restaurant.find() // 挖出資料庫所有資料
    .lean()
    .then(restaurants => {
      const keyRestaurants = restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(keyword.toLowerCase()))
      res.render('index', { restaurants: keyRestaurants, keyword })
    })
    .catch(error => console.error(error))
})
module.exports = router
