const customReferences = require('../references/customReferences');
const productSchema = customReferences.mongoose.Schema({
    "product_title":String,
    "product_price":String,
    "product_description":String,
    "product_category":String
   });

   module.exports = customReferences.mongoose.model('products',productSchema);