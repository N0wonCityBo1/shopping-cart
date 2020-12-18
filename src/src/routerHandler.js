const productRoutes = require("./app/route")
module.exports = app => {
    app.use("/product", productRoutes);
}