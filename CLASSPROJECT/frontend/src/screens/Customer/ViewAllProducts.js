import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import CustomerNavbar from "../../components/Navbars/CustomerNavbar";

const ViewAllProducts = () => {
    const [allProducts,setAllProducts] = useState([]);
    const navigate = useNavigate();

    const viewAllProducts = ()=>{
   
        axios({
          method: "post",
          url: "http://localhost:8888/viewProducts",
          headers: { "Content-Type": "multipart/form-data"},
        })
          .then(function (response) {
            console.log(response.data);
            setAllProducts(response.data.allProducts);
            
          })
          .catch(function (response) {
            //handle error
            console.log(response);
          });
      }   

    const addToCart = (productId,productPrice)=>{
       
        const formData = new FormData();
        let userid=JSON.parse(localStorage.getItem('user'))._id;
        formData.append("product_id",productId);
        formData.append("user_id",userid);
        formData.append("qty",1);
        formData.append("amount",productPrice * 1);
        formData.append("is_purchased",false);

        axios({
          method: "post",
          url: "http://localhost:8888/createCart",
          data:formData,
          headers: { "Content-Type": "multipart/form-data"},
        })
          .then(function (response) {
            console.log(response);
            if(response.data.save == true)
            {
              alert("PRODUCT ADDED INTO YOUR CART.")
              navigate("/");
            }else
            {
              alert("CANNOT ADD PRODUCT INTO YOUR CART.")
              navigate("/");
            }
            
          })
          .catch(function (response) {
            //handle error
            console.log(response);
          });
      }      
  
   useEffect(()=>{
    viewAllProducts();
  },[]);  


  return (
    <React.Fragment>
      <CustomerNavbar />
      <h1 className="mt-5 mb-5">All Products</h1>
      <table className="table table-hover">
        <thead>
          <tr className="table-primary">
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">Description</th>
            <th scope="col">Category</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
        {allProducts.length > 0 ? 
            allProducts.map((item,index)=>(
            <tr>
            <th scope="row">{index+1}</th>
            <td>{item.product_title}</td>
            <td>{item.product_price}</td>
            <td>{item.product_description.substr(0,100)}...</td>
            <td>{item.product_category}</td>
            <td>
                <Link to="/" onClick={()=>{
                  addToCart(item._id,item.product_price);
                }} className="btn btn-sm btn-success mb-1">Add To Cart</Link><br/>
            </td>
          </tr> 
        )):
        <tr>
            <th colSpan="6" scope="row">No Record found</th>
        </tr> 
        }
          
          
        </tbody>
      </table>
    </React.Fragment>
  );
};

export default ViewAllProducts;
