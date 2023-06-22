const customReferences = require('./references/customReferences');
require("./database/config");
require("./controllers/Auth/AuthController");
require("./controllers/Product/ProductController");
require("./controllers/Cart/CartController");

customReferences.app.listen(8888);
