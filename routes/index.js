// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const { authenticator } = require('../middleware/auth') // 掛載 middleware

const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const users = require('./modules/users')
const search = require('./modules/search')

router.use('/users', users)
router.use('/restaurants', authenticator, restaurants)
router.use('/search', authenticator, search)
router.use('/', authenticator, home)
// 匯出路由器
module.exports = router
