const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json())

//결제시스템 (paypal)
const paypal = require('paypal-rest-sdk');
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'myclientid',
    'client_secret': 'secret'
  });

require("./config/mongoose.js")(app);
app.use('/files', express.static("files"));
require('./app/routeHandler')(app)

app.get('/', (req, res) => {
    res.json({
        message: '팀로그 쇼핑몰'
    });
});

app.post('/pay',(req,res) =>{
    const create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:4000/success",
            "cancel_url": "http://localhost:4000/cencel"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "item",
                    "sku": "item",
                    "price": "1.00",
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": "1.00"
            },
            "description": "This is the payment description."
        }]
    };
    paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
        throw error;
    } else {
        for(let i =0;i<payment.links.length;i++){
            if(payment.links[i].rel === 'approval_url'){
                    res.redirect(payment.links[i].href);
            }
        }
    }

});
     
});
app.get('/success', (req,res)=>{
  const payerId = req.query.PayerId;
  const paymentId = req.query.paymentId;

   const excute_payment_json = {
             "payer_id": payerId,
             "transactions" : [ {
                "amounts": {
                    "currency": "USD",
                    "total" : "25.00"
                }
             }]
            };
paypal.payment.execute(paymentId,excute_payment_json,function(err,payment){
    if(err){
        console.log(err.response);
        throw err;
    }else{
        console.log(JSON.stringify(payment));
        res.send('success');
    }
});

});

app.get('/cancel', (req,res) => res.send('Cancelled'))
 //여기까지 결제 시스템
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(` ${port} 포트에서 실행중`);
});