const customReferences = require('./references/customReferences');
require("./database/config");
require("./controllers/Auth/AuthController");
require("./controllers/Product/ProductController");

customReferences.app.listen(8888);
