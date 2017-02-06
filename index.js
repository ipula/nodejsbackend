const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');

mongoose.connect('mongodb://localhost/rest-test');

let app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(function(req,res,next){

    res.header('Access-Control-Allow-Origin',"*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Heders','Content-Type');
    next();

});
app.use('/api', require('./routes/api'));


app.listen(4000);
console.log('API running on port 4000');