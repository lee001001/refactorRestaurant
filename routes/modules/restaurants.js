const express = require('express')
const router = express.Router()
const Restaurant = require('../../models/restaurant')

// set  NEW ROUTE
router.get('/new', (req, res) => {
  return res.render('new')
})

// Creat funcation
router.post('/', (req, res) => {
  return Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// Set detail Route
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('detail', { restaurant }))
    .catch(error => console.log(error))
})

// set edit route
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

// set edit post route
router.put('/:id', (req, res) => {
  const id = req.params.id
  const requestBody = req.body
  return Restaurant.findById(id)
    .then((restaurant) => {
      restaurant = Object.assign(restaurant, requestBody)
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

// set delete POST route
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then((restaurant) => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
