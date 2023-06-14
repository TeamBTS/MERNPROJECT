const customReferences = require('../references/customReferences');
const userSchema = customReferences.mongoose.Schema({
    "name":String,
    "email":String,
    "password":String,
    "isAdmin":Boolean
   });

   module.exports = customReferences.mongoose.model('users',userSchema);