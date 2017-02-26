var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    Settings = require('./settings');

var ProductSchema = new Schema({
  ProductId : {
    type : Number, required: true, trim: true
  },
  ProductName : {
    type : String, required: true, trim: true
  },
  Price : {
    type : Number, required: true, trim: true
  },
  Category : {
    type : String, required: true, trim: true
  }
});
/*
ProductSchema.index({ id: 1, type: 1 }); // schema level
*/
/*
ProductSchema.pre('save', function(next) {
  var doc = this;
  // Calculate the next id on new Product only.
  if (this.isNew) {
    Settings.findOneAndUpdate( {"collectionName": "products"}, { $inc: { nextSeqNumber: 1 } }, function (err, settings) {
      if (err) next(err);
      doc.id = settings.nextSeqNumber - 1; // substract 1 because I need the 'current' sequence number, not the next
      next();
    });
  } else {
    next();
  }
});*/

exports.ProductSchema = ProductSchema;
module.exports = mongoose.model('Product', ProductSchema, 'products');
