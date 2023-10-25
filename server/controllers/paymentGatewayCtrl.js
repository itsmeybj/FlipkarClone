var PaytmChecksum = require("../paytm/PaytmChecksum")
const formidable = require('formidable');
const https = require('https')

const addPaymentGatewayCtrl = async (request, response) => {

    const paytmMerchantKey = process.env.PAYTM_MERCHANT_KEY;
    const paytmParams = {};
    paytmParams['MID'] = process.env.PAYTM_MID;
    paytmParams['WEBSITE'] = process.env.PAYTM_WEBSITE;
    paytmParams['CHANNEL_ID'] = process.env.PAYTM_CHANNEL_ID;
    paytmParams['INDUSTRY_TYPE_ID'] = process.env.PAYTM_INDUSTRY_TYPE_ID;
    paytmParams['ORDER_ID'] = 10;
    paytmParams['CUST_ID'] = process.env.PAYTM_MID;
    paytmParams['TXN_AMOUNT'] = "100";
    paytmParams['CALLBACK_URL'] = "http://localhost:5000/callback";
    paytmParams['EMAIL'] = "yogeshbjadhav10@gmail.com";
    paytmParams['MOBILE_NO'] = "1234567890";
    
    try{
        let paytmChecksum = await PaytmChecksum.generateSignature(paytmParams,paytmMerchantKey)
        //console.log(paytmChecksum);
        let params = {
            ...paytmParams,'CHECKSUMHASH':paytmChecksum
        }
        //console.log(params);
        response.status(200).json(params)

    }catch(error){
        console.log('error');
        response.status(500).json({error:error.message})
    }

    // var paytmChecksum = PaytmChecksum.generateSignature(paytmParams, paytmMerchantKey);

    // paytmChecksum.then(function (result) {
    //     console.log("generateSignature Returns: " + result);

    //     var verifyChecksum = PaytmChecksum.verifySignature(paytmParams, paytmMerchantKey, result);
    //     if (verifyChecksum) {
    //         let txn_url = "https://securegw-stage.paytm.in/order/process";
    //         let form_fields = "";
    //         for (x in paytmParams) {
    //             form_fields += "<input type='hidden' name='" + x + "' value='" + paytmParams[x] + "' >"
    //         }
    //         form_fields += "<input type='hidden' name='CHECKSUMHASH' value='" + result + "' >";
            
    //         response.writeHead(200, { 'Content-Type': 'text/html' });
    //         response.write('<html><head><title>Merchant Checkout Page</title></head><body><center><h1>Please do not refresh this page...</h1></center><form method="post" action="' + txn_url + '" name="f1">' + form_fields + '</form><script type="text/javascript">document.f1.submit();</script></body></html>');
    //         response.end();
    //     } else {
    //         console.log("not verifiy")
    //     }
    //     //console.log("verifySignature Returns: " + verifyChecksum);
    // }).catch(function (error) {
    //     console.log(error);
    // });


}

const paymentResponseCtrl = async (request, response) => {

    response.redirect('http://localhost:3000')

    console.log('hi');
    const paytmMerchantKey = process.env.PAYTM_MERCHANT_KEY;   

   const form = new formidable.IncomingForm();
   let paytmCheckSum = request.body.CHECKSUMHASH;
 
   delete request.body.CHECKSUMHASH;
  
   console.log(request.body);
   let isVerifySignature = PaytmChecksum.verifySignature(request.body, paytmMerchantKey,paytmCheckSum);
   //console.log("Checksum Result => ", result, "\n");
   if(isVerifySignature){
       var paytmParams = {};
       paytmParams['MID'] =  request.body.MID;
       paytmParams['ORDER_ID'] = request.body.ORDER_ID;

       console.log(paymentResponseCtrl)
       // PaytmChecksum.generateSignature(paytmParams,paytmMerchantKey).then(function(checksum){
       //     paytmParams['CHECKSUMHASH'] = checksum;

       //     let post_data = JSON.stringify(paytmParams)

       //     let options = {
       //         hostname: 'securegw-stage.paytm.in', // for staging
       //         //hostname: 'securegw.paytm.in', // for production
       //         port: 443,
       //         path: '/order/status',
       //         //method: 'POST',
       //         headers: {
       //             //'Content-Type': 'application/x-www-form-urlencoded',
       //             'Content-Type': 'application/json',
       //             'Content-Length': post_data.length
       //         }
       //     }

       //     var res = "";
       //     var post_req = https.request(options, function(post_res) {
       //       post_res.on('data', function (chunk) {
       //         res += chunk;
       //       });
    
       //       post_res.on('end', function(){
       //         console.log('S2S Response: ', res, "\n");
    
       //         var _result = JSON.parse(res);
       //           if(_result.STATUS == 'TXN_SUCCESS') {
       //               //res.send('payment sucess')
       //               console.log('payment sucess');
       //               res.redirect('http://localhost:3000')
       //           }else {
       //               //res.send('payment failed')
       //               console.log('payment failed');
       //           }
       //         });
       //     });
    
       //     // post the data
       //     post_req.write(post_data);
       //     post_req.end();
       //    });
         
           
       
   }else{
       console.log('checksum missmatched')
   }
}
module.exports.addPaymentGatewayCtrl = addPaymentGatewayCtrl;
module.exports.paymentResponseCtrl = paymentResponseCtrl;
