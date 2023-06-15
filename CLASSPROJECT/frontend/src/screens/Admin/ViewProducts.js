import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbars/Navbar";

const ViewProducts = () => {
    const [allProducts,setAllProducts] = useState([]);
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
  useEffect(()=>{
    viewAllProducts();
  },[]);  
  return (
    <React.Fragment>
      <Navbar />
      <h1 className="mt-5 mb-5">All Products</h1>
      <Link to="/addProducts"><span className="btn btn-success btn-block">CREATE NEW PRODUCT</span></Link>
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
                <Link className="btn btn-sm btn-danger mb-1">DELETE</Link><br/>
                <Link className="btn btn-sm btn-primary mb-1">EDIT</Link><br/>
                <Link className="btn btn-sm btn-success mb-1">SHOW</Link><br/>
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

export default ViewProducts;
