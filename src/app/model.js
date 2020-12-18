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

  // country: {
  //   type: String,
  //   required: [true, "제품의 나라를 입력하세요"],
  // },
  // explanation: {
  //   type: String,
  //   required: [true, "제품설명을 입력하세요"],
  // },
  
 image: {
    type: String,
    required: true,
  },
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;