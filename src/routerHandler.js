const productRoutes = require("./app/route")

const cartRoutes = require('./app/cart/route')

module.exports = app => {
    app.use("/product", productRoutes);
    app.use("/cart", cartRoutes);
}

