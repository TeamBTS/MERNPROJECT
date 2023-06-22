import "./App.css";
import Navbar from "./components/Navbars/Navbar";
import CustomerNavbar from "./components/Navbars/CustomerNavbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./screens/Auth/Signup";
import PrivateComponent from "./components/Private/PrivateComponent";
import Login from "./screens/Auth/Login";
import { isUserLoggedIn } from "./helpers/AuthHelper";
import React, { useEffect, useState } from "react";
import AddProduct from "./screens/Admin/AddProduct";
import ViewProducts from "./screens/Admin/ViewProducts";
import EditProduct from "./screens/Admin/EditProduct";
import ViewAllProducts from "./screens/Customer/ViewAllProducts";
import ViewCart from "./screens/Customer/Cart/ViewCart";

function App() {
  const currentUser = isUserLoggedIn();
  const [isAdmin,setIsAdmin] = useState(true);

  useEffect(()=>{
    if(currentUser)
    {
      let currentUserType = JSON.parse(localStorage.getItem('user')).isAdmin;
      setIsAdmin(currentUserType);
    }
  },[]);
  return (
    <div className="App">
      <BrowserRouter>
        {/* {isAdmin ? 
          <Navbar />
         :
          <CustomerNavbar />
        } */}
        <Routes>
          <Route element={<PrivateComponent />}>
          {isAdmin ?
            <React.Fragment> 
              <Route path="/" element={<ViewProducts />} />
              <Route path="/addProducts" element={<AddProduct />} />
              <Route path="/updateProducts" element={<h1>Update PRODUCTS</h1>} />
              <Route path="/profile" element={<h1>Profile</h1>} />
              <Route path="/logout" element={<h1>Logout</h1>} />
              <Route path="/deleteSingleProduct" element={<h1>DELETE PRODUCT</h1>} />
              <Route path="/editSingleProduct/:id" element={<EditProduct />} />
              
            </React.Fragment>
          :
          <React.Fragment> 
            <Route path="/" element={<ViewAllProducts />} />
            <Route path="/carts" element={<ViewCart />} />
            <Route path="/customerOrders" element={<h1>Update PRODUCTS</h1>} />
            <Route path="/customerProfile" element={<h1>Profile</h1>} />
            <Route path="/logout" element={<h1>Logout</h1>} />
          </React.Fragment>
          }
            
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
