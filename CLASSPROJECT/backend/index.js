const express = require("express");
const app = express();
const cors = require('cors');
app.use(cors());
require("./database/config");
const userModel = require("./model/User");
const customReferences = require("./references/customReferences");
const formData = customReferences.multer();

app.post("/signup", formData.none(), async (request, response) => {
  const newUser = new userModel(request.body);
  const res = await newUser.save();
  if(res)
  {
    response.send({"save":true,"newUser":res});
  }else
  {
    response.send({"save":false});
  }
});

app.listen(8888);
