const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const path = require('path');
const envDir = path.join(__dirname, './.env')
require("dotenv").config({ path: envDir });

require("./config/mongoose.js")(app);
app.use('/files', express.static("files"));
require('./routerHandler')(app)


app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json())
app.get('/', (req, res) => {
    res.json({
        message: 'Arise MERN developers'
    });
});
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Application is running on ${port}`);
});

