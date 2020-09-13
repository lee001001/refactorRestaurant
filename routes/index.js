// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 準備引入home模組
const home = require('./modules/home')
router.use('/', home)

// 引入restaurants模組
const restaurants = require('./modules/restaurants')
router.use('/restaurants', restaurants)

// 引入search模組
const search = require('./modules/search')
router.use('/search', search)

// 引入sort模組
const sort = require('./modules/sort')
router.use('/sort', sort)

// 匯出路由器
module.exports = router
