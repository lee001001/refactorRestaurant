const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../../models/user')

//  create a login router module
router.get('/login', (req, res) => {
  res.render('login')
})

// receive the value from login router
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

// create a register router modulre
router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  // 接收註冊表單的參數
  const { name, email, password, confirmPassword } = req.body
  // 在資料庫找到使用者的email
  User.findOne({ email }).then(user => {
    // 如果找到則回傳已經註冊過, 且回註冊頁面
    if (user) {
      console.log('The User already register')
      res.render('register')
    } else {
      // 如果沒有則回傳到資料庫
      return User.create({
        name,
        email,
        password
      })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    }
  })
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/users/login')
})

module.exports = router
