const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  product: String,
  price: Integer,
  description: String,
  size: {
    type: Integer,
    require: false
  },
  img: {
    data: Buffer,
    contentType: String
  }
});

const Shop = mongoose.model('Shop', shopSchema);

module.exports = Shop;