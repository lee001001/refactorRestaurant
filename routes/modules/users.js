const express = require('express')
const router = express.Router()

//  create a login router module
router.get('/login', (req, res) => {
  res.render('login')
})

module.exports = router
