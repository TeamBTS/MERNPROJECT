import React, { useState,useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbars/Navbar";


const EditProduct = () => {
  
  // STATES 
  const [productId, setProductId] = useState(0);
  const [productTitle, setProductTitle] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const navigate = useNavigate();
  const params = useParams();


  //FUNCTIONS
  const updateSingleProduct = ()=>{
    const formData = new FormData();
    formData.append("id",productId);
    formData.append("product_title",productTitle);
    formData.append("product_price",productPrice);
    formData.append("product_description",productDescription);
    formData.append("product_category",productCategory);

    axios({
      method: "post",
      url: "http://localhost:8888/updateSingleProduct",
      data: formData,
      headers: { "Content-Type": "multipart/form-data"},
    })
      .then(function (response) {
        
        if(response.data.update == true)
        {
          navigate('/');
        }else
        {
          alert("Unable to update product. Please try again later.");
        }
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  }

  const getSingleProductDetail = ()=>{
    const formData = new FormData();
    formData.append("id",params.id);
    axios({
      method: "post",
      url: "http://localhost:8888/editSingleProduct",
      data: formData,
      headers: { "Content-Type": "multipart/form-data"},
    })
      .then(function (response) {
        console.log(response.data);
        if(response.data.match == true)
        {
          setProductId(response.data.singleProduct._id);
          setProductTitle(response.data.singleProduct.product_title)
          setProductPrice(response.data.singleProduct.product_price)
          setProductDescription(response.data.singleProduct.product_description)
          setProductCategory(response.data.singleProduct.product_category)
        }else
        {
          alert("Unable to fetch product. Please try again later.");
        }
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  }

  useEffect(()=>{
    getSingleProductDetail();
  },[]);

  return (
    <React.Fragment>
      <Navbar />
      <div className="container" style={{ marginTop: 100 }}>
        <h1>EDIT Product</h1>
        <div className="form-group">
          <div className="form-floating mb-3">
            <input
              value={productTitle}
              onChange={(e) => {
                setProductTitle(e.target.value);
              }}
              type="text"
              className="form-control"
              
              placeholder="Product Title"
            />
            <label>Product Title</label>
          </div>
          <div className="form-floating mb-3">
            <input
              value={productPrice}
              onChange={(e) => {
                setProductPrice(e.target.value);
              }}
              type="number"
              className="form-control"
              placeholder="Product Price in dollars"
            />
            <label >Product Price</label>
          </div>
          <div className="form-floating mb-3">
            <input
              value={productDescription}
              onChange={(e) => {
                setProductDescription(e.target.value);
              }}
              type="text"
              className="form-control"
              placeholder="Product Description"
            />
            <label >Product Description</label>
          </div>
          <div className="form-floating mb-3">
            <input
              value={productCategory}
              onChange={(e) => {
                setProductCategory(e.target.value);
              }}
              type="text"
              className="form-control"
              placeholder="Product Category"
            />
            <label >Product Category</label>
          </div>
          <div style={{ marginTop: 40 }}>
            <input
              type="button"
              className="btn btn-primary form-control"
              value="Update Product"
              onClick={()=>{
                updateSingleProduct();
              }}
            />
          </div>
        
        </div>
      </div>
    </React.Fragment>
  );
};

export default EditProduct;
