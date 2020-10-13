const express = require('express')
const router = express.Router()

//  create a login router module
router.get('/login', (req, res) => {
  res.render('login')
})

// receive the value from login router
router.post('/login', (req, res) => {

})

// create a register router modulre
router.get('/register', (req, res) => {
  res.render('register')
})

module.exports = router
