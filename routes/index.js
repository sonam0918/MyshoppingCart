var express = require('express');
var router = express.Router();
var path = require('path');
var http = require('http');
var global_var = require('../public/javascripts/validate');
 
/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});
 

 //Setting API route with paramters

router.get('/products/:usertype/:productid', function(req,res){
        var myProducts;
   

myJSON = "";

//giving source URL
var url = "http://sneakpeeq-sites.s3.amazonaws.com/interviews/ce/feeds/store.js";

//Fetching source data 
    http.get(url, function(res){
    var body = '';

        res.on('data', function(chunk){
            body += chunk;
        });

        res.on('end', function(){
            myProducts = JSON.parse(body);
            myJSON = body;
            //val = body;
            foundFlag = false;
            myProd = "not found";
            myProdName = "not found";
            myProdPrice = 0;
            // comparing the user parameter passed in API call with our product list
            for(i=0; i < myProducts.products.length; i++) {
                if(myProducts.products[i].id == req.params.productid) {
                    myProd = myProducts.products[i].id;

                    switch(req.params.usertype) {
                        case "retail":
                            myProdPrice = myProducts.products[i].msrpInCents;
                            break;
                        case "wholesale":
                            myProdPrice = myProducts.products[i].msrpInCents*0.75;
                            break;
                        default:
                            break;
                    }

                    
                    myProdName = myProducts.products[i].name;
                    foundFlag = true;
                    break;
                }
            }

            val = {
                "products": {
                    "productid": myProd
                    , "name": myProdName
                    , "price": myProdPrice
                }
            }; 

            console.log("Got a response: ", myProducts.site);
     
        });
        
    }).on('error', function(e){
          console.log("Got an error: ", e);
    });

    res.status(200).json(val);
 });

module.exports = router;