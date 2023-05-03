const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  product: String,
  price: Number,
  description: String,
  size: String,
  img: {
    data: Buffer,
    contentType: String
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;