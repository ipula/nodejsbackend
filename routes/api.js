'use strict'

var express=require('express');
var router=express.Router();

// var mongoose=require('mongoose');
// mongoose.connect('mongodb://localhost/rest-test');

var Products=require('../models/product');
var controller=require('../controller/ProductController');
var middleware=require('../middleware/product');

// router.get('/products',function(req,res){
//     var products = Products.find({},function(err,product){

//           if (err) throw err;
//           console.log(products);
//           res.status(201).send(product);
//     });
// });

// router.get('/products',middleware.signRoute,middleware.getProducts);
router.get('/products',middleware.getProducts);

router.post('/products',middleware.signRoute,middleware.addProduct);

router.delete('/products/:id',middleware.signRoute,middleware.deleteProduct);

router.put('/products/:id',middleware.signRoute,middleware.updateProduct);

router.get('/products/:id',middleware.signRoute,middleware.getProductById);

router.post('/authenticate',middleware.authenticate);

module.exports=router;