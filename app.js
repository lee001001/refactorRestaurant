const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const Restaurant = require('./models/restaurant')
const port = 3000

const routes = require('./routes')
require('./config/mongoose')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))

app.use(methodOverride('_method'))

// set the routes
app.use(routes)

/*
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then((restaurants) => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})
*/

// set search route
app.delete('/search', (req, res) => {
  const keyword = req.query.keyword
  Restaurant.find() // 挖出資料庫所有資料
    .lean()
    .then(restaurants => {
      const keyRestaurants = restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(keyword.toLowerCase))
      res.render('index', { restaurants: keyRestaurants })
    })
    .catch(error => console.error(error))
})

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})
