const customReferences = require('../references/customReferences');
const cartSchema = customReferences.mongoose.Schema({
    product_id:{
        type:customReferences.mongoose.Schema.Types.ObjectId,
        ref:'products'
    },
    user_id:{
        type:customReferences.mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    "qty":Number,
    "amount":String,
    is_purchashed:{
        type:Boolean,
        default:false,
    }
   });

   module.exports = customReferences.mongoose.model('carts',cartSchema);