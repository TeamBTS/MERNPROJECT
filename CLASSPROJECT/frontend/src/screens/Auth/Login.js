import React, { useState,useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


const Login = () => {
  
  // STATES 
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const navigate = useNavigate();

  //FUNCTIONS
  const userLogin = ()=>{
    const formData = new FormData();
    formData.append("email",userEmail);
    formData.append("password",userPassword);

    axios({
      method: "post",
      url: "http://localhost:8888/login",
      data: formData,
      headers: { "Content-Type": "multipart/form-data"},
    })
      .then(function (response) {
        if(response.data.match == true)
        {
          localStorage.setItem("user",JSON.stringify(response.data.loggedInUser));
          navigate('/');
        }else
        {
          alert("No User found with this email and password");
        }
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  }

  useEffect(()=>{
    let currentUserStatus = localStorage.getItem('user');
    if(currentUserStatus){
      navigate('/');
        }
  },[]);

  return (
    <div className="container" style={{ marginTop: 100 }}>
      <h1>USER LOGIN</h1>
      <div className="form-group">
        <div className="form-floating mb-3">
          <input
            name="email"
            value={userEmail}
            onChange={(e) => {
              setUserEmail(e.target.value);
            }}
            type="email"
            className="form-control"
            
            placeholder="Email"
          />
          <label>Email address</label>
        </div>
        <div className="form-floating">
          <input
            name="password"
            value={userPassword}
            onChange={(e) => {
              setUserPassword(e.target.value);
            }}
            type="password"
            className="form-control"
            
            placeholder="Password"
          />
          <label >Password</label>
        </div>
        <div style={{ marginTop: 40 }}>
          <input
            type="button"
            className="btn btn-primary form-control"
            value="Login"
            onClick={()=>{
              userLogin();
            }}
          />
        </div>
        <div style={{ marginTop: 40 }}>
          <h4>Don't Have an account ? <Link to="/signup">SIGNUP</Link> </h4> 
        </div>
      </div>
    </div>
  );
};

export default Login;
