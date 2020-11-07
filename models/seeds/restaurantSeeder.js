if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const bcrypt = require('bcryptjs')

const Restaurant = require('../restaurant')
const restaurantList = require('../restaurant.json').results

const User = require('../user')
const db = require('../../config/mongoose')
const SEED_USERS = [{
  name: 'user1',
  email: 'user1@example.com',
  password: '12345678'
},
{
  name: 'user2',
  email: 'user2@example.com',
  password: '12345678'
}]

db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USERS[0].password, salt))
    .then(hash => {
      SEED_USERS.forEach(SEED_USER => SEED_USER.password = hash)
      return User.insertMany(SEED_USERS)
    })
    .then(users => {
      return Promise.all(restaurantList.map((restaurants, index) => {
        if (index < 3) {
          restaurants.userId = users[0]._id
          return Restaurant.create(Object.assign({}, restaurants))
        }
        if (index < 6) {
          restaurants.userId = users[1]._id
          return Restaurant.create(Object.assign({}, restaurants))
        }
      }))
    })
    .then(() => {
      console.log('done.')
      process.exit()
    })
})
