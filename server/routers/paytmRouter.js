const express = require('express');
const addPaymentGatewayCtrl = require('../controllers/paymentGatewayCtrl').addPaymentGatewayCtrl
const paymentResponseCtrl = require('../controllers/paymentGatewayCtrl').paymentResponseCtrl

const paytmRouter = express.Router()

paytmRouter.post('/payment',addPaymentGatewayCtrl)
paytmRouter.post('/callback',paymentResponseCtrl)

module.exports = paytmRouter;
