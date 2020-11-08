// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const { authenticator } = require('../middleware/auth') // 掛載 middleware

const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const users = require('./modules/users')
const search = require('./modules/search')
const sort = require('./modules/sort')
const auth = require('./modules/auth')

router.use('/restaurants', authenticator, restaurants)
router.use('/users', users)
router.use('/auth', auth)
router.use('/search', authenticator, search)
router.use('/sort', authenticator, sort)
router.use('/', authenticator, home)
// 匯出路由器
module.exports = router
