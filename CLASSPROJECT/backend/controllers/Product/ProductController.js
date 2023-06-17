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
  customReferences.app.post("/deleteSingleProduct", formData.none(), async (request, response) => {
    
    const res = await productModel.deleteOne({"_id":request.body.id});
  
    if(res != null)
    {
      response.send({"delete":true});
    }else
    {
      response.send({"delete":false});
    }
  });
  customReferences.app.get("/editSingleProduct:id", formData.none(), async (request, response) => {
    response.send(request.params.id);
    // const res = await productModel.findOne({"_id":request.params.id});
  
    // if(res != null)
    // {
    //   response.send({"singleProduct":res});
    // }else
    // {
    //   response.send({"singleProduct":[]});
    // }
  });