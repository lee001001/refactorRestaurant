const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// 升序排列asc
router.get('/asc', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .sort({ name: 'asc' })
    .then((restaurants) => res.render('index', { restaurants }))
    .catch((error) => console.log(error))
})

// 降序排列desc
router.get('/desc', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .sort({ name: 'desc' })
    .then((restaurants) => res.render('index', { restaurants }))
    .catch((error) => console.log(error))
})

// 升序排列asc分數
router.get('/rating/asc', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .sort({ rating: 'asc' })
    .then((restaurants) => res.render('index', { restaurants }))
    .catch((error) => console.log(error))
})

// 排列desc
router.get('/rating/desc', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .sort({ rating: 'desc' })
    .then((restaurants) => res.render('index', { restaurants }))
    .catch((error) => console.log(error))
})
module.exports = router
