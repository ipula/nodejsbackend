const mongoose=require('mongoose');
var Products=require('../models/product');
var controller=require('../controller/ProductController');
var jwt    = require('jsonwebtoken');
var config = require('../middleware/config');


var generatePayload = function(product){
    var payload = {};
    payload.product = {
        name: product.name
    };
    return payload;
}



module.exports={

     deleteProduct:function(req,res)
    {
        controller.deleteProduct(req,function(err,product)
        {
            if(product)
            {
                var response = {
                        message: "Todo successfully deleted",
                };
            res.status(200).send(response);
            }
            if(err){
                var response = {
                        message: "user not found",
                };
                    res.status(500).send(response);
            }

        });
    },

    addProduct:function(req,res)
    {
        controller.addProduct(req,function(err,product)
        {
            if(product)
            {
                var response = {
                        message: "successfully created",
                };
            res.status(200).send(response);
            }
            if(err){
                var response = {
                        message: "user not found",
                };
                    res.status(500).send(err);
            }

        });
    },

     getProducts:function(req,res)
    {
        controller.getAllProducts(req,function(err,product)
        {
            if(product)
            {
                var response = {
                        message: "ok",
                };
            res.status(200).send(product);
            }
            if(err){
                var response = {
                        message: "no recodes",
                };
                    res.status(500).send(err);
            }

        });
    },
    updateProduct:function(req,res)
    {
        controller.updateProduct(req,function(err,product){
            if(product)
            {
                var response = {
                        message: "ok",
                };
            res.status(200).send(product);
            }
            if(err){
                var response = {
                        message: "no recodes",
                };
                    res.status(500).send(err);
            }
    
        });
    },

    getProductById:function(req,res)
    {
        controller.getProductById(req,function(err,product){
            if(product)
            {
                var response = {
                        message: "ok",
                };
            res.status(200).send(product);
            }
            if(err){
                var response = {
                        message: "no recodes",
                };
                    res.status(500).send(err);
            }

        });
    },

    authenticate:function(req,res)
    {
        controller.userAuthentication(req,function(err,product){

            if(err)
            {
                  res.status(500).send(err);   
            }
            if(product)
            {
                 var payload = generatePayload(product);

                     var token = jwt.sign(product,config.secret , {
                        expiresIn: 1440 // expires in 24 hours
                        });

                       var response = {
                            success: true,
                            obj:product,
                            message: 'Enjoy your token!',
                            token: token
                        };    

                        res.status(200).send(response);   

            }
            else
            { 
                       var response = {
                            success: false,
                            message: 'User name or Password Incorrect!',
                            token: token
                        };    

                        res.status(500).send(response);   
            }

        });
    },

    signRoute:function(req,res,next){

            var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.params.token;
            
            if(token)
            {
                    jwt.verify(token,config.secret,function(error,decoded){

                    if(error)
                    {
                            return res.status(500).send({ success: false, message: 'Failed to authenticate token.' });
                    }
                    else{
                        req.decoded = decoded;    
                        console.log( req.decoded);
                        next();
                    }

                });

            }
            else
            {
                return res.status(403).send({ 
                    success: false, 
                    message: 'No token provided.' 
                });
    
            }
    },
}