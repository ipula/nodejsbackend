const mongoose=require('mongoose');
var Products=require('../models/product');
var CryptoJS = require("crypto-js");

module.exports={

    getAllProducts:function(req,callback){

       return Products.find({},callback);
    },

    deleteProduct:function(req,callback)
    {
        var id=req.params.id;
        var product=Products.findOne({id:id},function(err,product){

            if(err)
            {
                return callback(err,null);
            }
            if(!product)
            {
                 return callback({"error":"no product found"},null);
            }
            if(product)
            {
                 return product.remove(callback);
            }
        });
       
    },
    addProduct:function(req,callback)
    {
        console.log(req.body);
        req.body.sku = CryptoJS.MD5(req.body.sku);
        var products = Products(req.body);
         return products.save(callback);
    //     // res.status(201).send("Created !");
    },

    updateProduct:function(req,callback){
        var product=Products.findOne({id:req.params.id},function(err,product){

                if(err)
                {
                    throw err;
                }
                if(product)
                {
                    product.name=req.body.name;
                    product.sku=req.body.sku;
                    product.price=req.body.price;
                     return product.save(callback);
                // res.status(201).send(product);
                }
               

        });
    },
    getProductById:function(req,callback){

         return Products.findOne({id:req.params.id},callback);
    },


    userAuthentication:function(req,callback){

         var encryptedPassword = String(CryptoJS.MD5(req.body.sku));
        //  var product=Products.findOne({name:req.body.name,sku:encryptedPassword},function(err,product){
        //     if(err)
        //     {
        //         throw err;
        //     }
        //     if(!product)
        //     {
        //         console.log("no product");
        //          return callback({"error":"no product found"},null);
        //     }
        //     if(product)
        //     {
        //          return callback({
        //                 "success":"user found"},product);
        //     }
        //  });

        var product=Products.findOne({name:req.body.name,sku:encryptedPassword},callback);
    }
}