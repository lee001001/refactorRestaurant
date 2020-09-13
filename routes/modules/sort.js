const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// 昇序排列asc
router.get('/asc', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ name: 'asc' })
    .then((restaurants) => res.render('index', { restaurants }))
    .catch((error) => console.log(error))
})

// 降序排列desc
router.get('/desc', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ name: 'desc' })
    .then((restaurants) => res.render('index', { restaurants }))
    .catch((error) => console.log(error))
})

// 低到高排列asc
router.get('/rating/asc', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ rating: 'asc' })
    .then((restaurants) => res.render('index', { restaurants }))
    .catch((error) => console.log(error))
})

// 高到低排列desc
router.get('/rating/desc', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ rating: 'desc' })
    .then((restaurants) => res.render('index', { restaurants }))
    .catch((error) => console.log(error))
})
module.exports = router
