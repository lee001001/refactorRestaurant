// Restaurant Mode Schema

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const restaurantSchema = new Schema({
  id: {
    type: Number
  },
  name: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },
  name_en: {
    type: String, // 資料型別是字串
    required: false // 這是個必填欄位
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: false
  },
  phone: {
    type: Number,
    required: false
  },
  google_map: {
    type: String,
    required: false
  },
  rating: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: false
  }
})

module.exports = mongoose.model('Restaurant', restaurantSchema)
