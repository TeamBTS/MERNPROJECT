import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { isUserLoggedIn } from "../../helpers/AuthHelper";

const Navbar = () => {
  const currentUserStatus = isUserLoggedIn();
  const navigate = useNavigate();
  const logoutUser = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
      <div className="container-fluid">
        <Link className="link-item" to="/">
          ECommerce Dashboard
        </Link>
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav me-auto">
            {currentUserStatus ? (
              <React.Fragment>
                <li className="nav-item">
                  <Link to="/" className="link-item">
                    Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/addProducts" className="link-item">
                    Add Product
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/updateProducts" className="link-item">
                    Update Product
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/profile" className="link-item">
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    to="/login"
                    onClick={() => {
                      logoutUser();
                    }}
                    className="link-item"
                  >
                    Logout ({JSON.parse(localStorage.getItem('user'))[0].email})
                  </Link>
                </li>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <li className="nav-item">
                  <Link to="/signup" className="link-item">
                    Signup
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/login" className="link-item">
                    Login
                  </Link>
                </li>
              </React.Fragment>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
