const cartModel = require("../../model/Cart");
const productModel = require("../../model/Product");
const customReferences = require("../../references/customReferences");
const formData = customReferences.multer();
const stripe = require('stripe')('');


customReferences.app.post("/createCart", formData.none(), async (request, response) => {
 
  // const isAlreadyAddedIntoCart = await cartModel.find({"user_id":request.body})
  // response.send(isAlreadyAddedIntoCart);
    const newCart = new cartModel(request.body);
    const res = await newCart.save();
    if(res)
    {
      response.send({"save":true,"newCart":res});
    }else
    {
      response.send({"save":false});
    }
  });
  
customReferences.app.post("/viewCarts", formData.none(), async (request, response) => {
    const res = await cartModel.find({"user_id":request.body.user_id}).populate('product_id').populate('user_id');
    let totalAmountOfCart = 0;
    
    if(res.length > 0)
    {
      res.map((item)=>{
          totalAmountOfCart=Number(totalAmountOfCart)+Number(item.amount);
      });

      response.send({"allCarts":res,"totalAmountOfCart":totalAmountOfCart});
    }else
    {
      response.send({"allCarts":[]});
    }

  });

customReferences.app.post("/deleteSingleCart", formData.none(), async (request, response) => {
    
    const res = await cartModel.deleteOne({"_id":request.body.id});
  
    if(res != null)
    {
      response.send({"delete":true});
    }else
    {
      response.send({"delete":false});
    }
  });

customReferences.app.post("/create_checkout_session", formData.none(), async (request, response) => {
  
  const res = await cartModel.find({"user_id":request.body.user_id}).populate('product_id').populate('user_id');
  let totalAmountOfCart = 0;
  let cartItemsForStripe = [];  
    if(res.length > 0)
    {
      
      res.map((item)=>{
          totalAmountOfCart=Number(totalAmountOfCart)+Number(item.amount);
          cartItemsForStripe.push(
            {'price_data':{
                    'currency' : 'USD',
                    'unit_amount' : item.amount * 100,
                    'product_data' : {
                        'name' : item.product_id.product_title,
                    },
                  },
                'quantity' :item.qty,
            }
          );
      });

     const session = await stripe.checkout.sessions.create({
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/carts',
      line_items: cartItemsForStripe,
      mode: 'payment',
      });

      response.send({"url":session.url});
    }else
    {
      response.send({"url":"noCart"});
    }
    
  });  