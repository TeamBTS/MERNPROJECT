const customReferences = require('../references/customReferences');
const productSchema = customReferences.mongoose.Schema({
    "title":String,
    "price":String,
    "description":String,
    "category":String
   });

   module.exports = customReferences.mongoose.model('products',productSchema);