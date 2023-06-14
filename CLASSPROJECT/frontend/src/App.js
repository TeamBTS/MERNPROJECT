import "./App.css";
import Navbar from "./components/Navbars/Navbar";
import CustomerNavbar from "./components/Navbars/CustomerNavbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./screens/Auth/Signup";
import PrivateComponent from "./components/Private/PrivateComponent";
import Login from "./screens/Auth/Login";
import { isUserLoggedIn } from "./helpers/AuthHelper";
import React, { useEffect, useState } from "react";

function App() {
  const currentUser = isUserLoggedIn();
  const [isAdmin,setIsAdmin] = useState(true);

  useEffect(()=>{
    if(currentUser)
    {
      let currentUserType = JSON.parse(localStorage.getItem('user'))[0].isAdmin;
      setIsAdmin(currentUserType);
    }
  },[]);
  return (
    <div className="App">
      <BrowserRouter>
        {isAdmin ? 
          <Navbar />
         :
          <CustomerNavbar />
        }
        <Routes>
          <Route element={<PrivateComponent />}>
          {isAdmin ?
            <React.Fragment> 
              <Route path="/" element={<h1>ALL PRODUCTS</h1>} />
              <Route path="/addProducts" element={<h1>Add PRODUCTS</h1>} />
              <Route path="/updateProducts" element={<h1>Update PRODUCTS</h1>} />
              <Route path="/profile" element={<h1>Profile</h1>} />
              <Route path="/logout" element={<h1>Logout</h1>} />
            </React.Fragment>
          :
          <React.Fragment> 
            <Route path="/" element={<h1>CUSTOMER PRODUCTS</h1>} />
            <Route path="/addProducts" element={<h1>Add PRODUCTS</h1>} />
            <Route path="/updateProducts" element={<h1>Update PRODUCTS</h1>} />
            <Route path="/profile" element={<h1>Profile</h1>} />
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
