const mongoose = require('mongoose');

// Định nghĩa schema cho sản phẩm
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  stock: { type: Number, required: true },
  price: { type: Number, required: true },
  size: { type: String, default: '' },
  productType: { type: String, default: '' },
  color: { type: String, default: '' },
  images: { type: [String], default: [] },
  materials: { type: String, default: '' },
});

// Tạo mô hình sản phẩm và xuất khẩu
const Product = mongoose.model('Product', productSchema);
module.exports = Product;
