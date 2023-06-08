import React from "react";
import {Link} from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
      <div className="container-fluid">
            <Link className="link-item" to="/">ECommerce Dashboard</Link> 
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link to="/" className="link-item">Products</Link>
            </li>
            <li className="nav-item">
              <Link to="/addProducts" className="link-item">Add Product</Link>
            </li>
            <li className="nav-item">
              <Link to="/updateProducts" className="link-item">Update Product</Link>
            </li>
            <li className="nav-item">
              <Link to="/profile" className="link-item">Profile</Link>
            </li>
            <li className="nav-item">
              <Link to="/logout" className="link-item">Logout</Link>
            </li>
            <li className="nav-item">
              <Link to="/signup" className="link-item">Signup</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
