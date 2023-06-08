const express = require("express");
const app = express();
require("./database/config");
const userModel = require("./model/User");
const customReferences = require("./references/customReferences");
const formData = customReferences.multer();

app.post("/signup", formData.none(), async (request, response) => {
  const newUser = new userModel(request.body);
  const res = await newUser.save();
  response.send(res);
});

app.listen(8888);
