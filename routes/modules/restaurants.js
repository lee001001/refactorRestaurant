const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// set  NEW ROUTE
router.get('/new', (req, res) => {
  return res.render('new')
})

// Creat funcation
router.post('/', (req, res) => {
  // 接收表單的資料
  const restaurants = req.body
  restaurants.userId = req.user._id
  return Restaurant.create(restaurants)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// Set detail Route
router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurants) => res.render('detail', { restaurants }))
    .catch(error => console.log(error))
})

// set edit route
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurants) => res.render('edit', { restaurants }))
    .catch(error => console.log(error))
})

// set edit post route
router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const update = req.body
  update.userId = req.user._id
  return Restaurant.findOne({ _id, userId })
    .then((restaurants) => {
      restaurants = Object.assign(restaurants, update)
      return restaurants.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(error => console.log(error))
})

// set delete POST route
router.delete('/:id', (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  return Restaurant.findOne({ _id, userId })
    .then((restaurant) => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// set search route
router.get('/', (req, res) => {
  const keyword = req.query.keyword
  const userId = req.user._id
  Restaurant.find({ userId }) // 挖出資料庫所有資料
    .lean()
    .then(restaurants => {
      const keyRestaurants = restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(keyword.toLowerCase()))
      res.render('index', { restaurants: keyRestaurants, keyword })
    })
    .catch(error => console.error(error))
})

// 升序排列asc
router.get('/sort/asc', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .sort({ name: 'asc' })
    .then((restaurants) => res.render('index', { restaurants }))
    .catch((error) => console.log(error))
})

// 降序排列desc
router.get('/sort/desc', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .sort({ name: 'desc' })
    .then((restaurants) => res.render('index', { restaurants }))
    .catch((error) => console.log(error))
})

// 升序排列asc分數
router.get('/sort/rating/asc', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .sort({ rating: 'asc' })
    .then((restaurants) => res.render('index', { restaurants }))
    .catch((error) => console.log(error))
})

// 排列desc
router.get('/sort/rating/desc', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
    .lean()
    .sort({ rating: 'desc' })
    .then((restaurants) => res.render('index', { restaurants }))
    .catch((error) => console.log(error))
})

module.exports = router
