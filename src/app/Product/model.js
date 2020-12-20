const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "제품이름을 입력하세요"],
  },
  price: {
    type: String,
    required: [true, "제품가격을 입력하세요"],
  },
  description: {type: String, required: true},
  image: {
    type: String,
    required: true,
  },
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;