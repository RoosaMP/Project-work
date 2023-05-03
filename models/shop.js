const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
  product: String,
  price: Number,
  description: String,
  size:Number,
  img: {
    data: Buffer,
    contentType: String
  }
});

const Shop = mongoose.model('shop', shopSchema);

module.exports = Shop;