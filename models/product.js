var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var connection = mongoose.createConnection("mongodb://localhost/rest-test");
autoIncrement.initialize(connection);

var productSchema=new mongoose.Schema({
    // id:{type:Number, unique:true},
    name:{type:String},
    sku:{type:String},
    price:{type:Number}

});
// productSchema.plugin(autoIncrement.plugin(),{ model: 'Product', field:'id' });
productSchema.plugin(autoIncrement.plugin,{ model: 'Product' , field: 'id',startAt:1,incrementBy:1});
module.exports=mongoose.model('Product',productSchema);

