const productModel = require("../../model/Product");
const customReferences = require("../../references/customReferences");
const formData = customReferences.multer();

customReferences.app.post("/createProduct", formData.none(), async (request, response) => {
    const newProduct = new productModel(request.body);
    const res = await newProduct.save();
    if(res)
    {
      response.send({"save":true,"newProduct":res});
    }else
    {
      response.send({"save":false});
    }
  });
  
  customReferences.app.post("/viewProducts", formData.none(), async (request, response) => {
    const res = await productModel.find();
  
    if(res.length > 0)
    {
      response.send({"allProducts":res});
    }else
    {
      response.send({"allProducts":[]});
    }
  });