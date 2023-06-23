import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import CustomerNavbar from "../../../components/Navbars/CustomerNavbar";

const ViewCart = () => {
  const [allCartItems, setAllCartItems] = useState([]);
  const [cartTotalAmount, setCartTotalAmount] = useState(0);
  const navigate = useNavigate();

  const viewMyCart = () => {
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    const formData = new FormData();
    formData.append("user_id", userId);

    axios({
      method: "post",
      url: "http://localhost:8888/viewCarts",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function(response) {
        console.log(response.data);
        setAllCartItems(response.data.allCarts);
        setCartTotalAmount(response.data.totalAmountOfCart);
      })
      .catch(function(response) {
        console.log(response);
      });
  };

  const deleteSingleCart = (singleCart) => {
    // alert(singleProduct._id);
    const formData = new FormData();
    formData.append("id", singleCart._id);

    axios({
      method: "post",
      url: "http://localhost:8888/deleteSingleCart",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function(response) {
        if (response.data.delete == true) {
          navigate("/carts");
        } else {
          navigate("/carts");
        }
      })
      .catch(function(response) {
        console.log(response);
      });
  };

  const proceedToCheckout = () => {
    if (allCartItems.length > 0) {
      const userId = JSON.parse(localStorage.getItem("user"))._id;
      const formData = new FormData();
      formData.append("user_id", userId);

      axios({
        method: "post",
        url: "http://localhost:8888/create_checkout_session",
        data:formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then(function(response) {
          if(response.data.url)
          {
            window.location.href = response.data.url;
          }else
          {
            alert("NO URL FOUND");
          }
        })
        .catch(function(response) {
          console.log(response);
        });
    } else {
      alert("There is nothing in your cart.");
    }
  };

  useEffect(() => {
    viewMyCart();
  }, []);

  return (
    <React.Fragment>
      <CustomerNavbar />
      <h1 className="mt-5 mb-5">My Cart</h1>
      <table className="table table-hover">
        <thead>
          <tr className="table-primary">
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">Qty</th>
            <th scope="col">Description</th>
            <th scope="col">Category</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {allCartItems.length > 0 ? (
            allCartItems.map((item, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{item.product_id.product_title}</td>
                <td>{item.product_id.product_price}</td>
                <td>{item.qty}</td>
                <td>{item.product_id.product_description.substr(0, 100)}...</td>
                <td>{item.product_id.product_category}</td>
                <td>
                  <Link
                    to="/"
                    onClick={() => {
                      deleteSingleCart(item);
                    }}
                    className="btn btn-sm btn-danger mb-1"
                  >
                    Delete
                  </Link>
                  <br />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <th colSpan="6" scope="row">
                No Record found
              </th>
            </tr>
          )}
        </tbody>
      </table>
      <div className="row">
        <div className="col-md-10">
          <h4 style={{ textAlign: "right" }}>TOTAL AMOUNT : </h4>
        </div>
        <div className="col-md-2">
          <h5>{cartTotalAmount}</h5>
        </div>
      </div>
      <div className="row" style={{ marginTop: 100 }}>
        <div className="col-md-12">
          <button
            onClick={() => {
              proceedToCheckout();
            }}
            className="btn btn-primary btn-block"
          >
            Proceed To Checkout
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ViewCart;
