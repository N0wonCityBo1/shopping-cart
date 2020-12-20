const { find } = require("./model");
const Cart = require("./model");
exports.cart = async () => {
    const carts = await Cart.find().populate({
        path: "items.productId",
        select: "name price total"
    });;
    return carts[0];
};
exports.addItem = async payload => {
    const newItem = await Cart.create(payload);
    return newItem
};


// exports.reduceItem = async id => {
//     const product = await Cart.update({ items:{$elemMatch:{ _id : id}}},{$set : {'items.$."quantity"': "0"}});
//     return product
// }