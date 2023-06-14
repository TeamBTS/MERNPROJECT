import React, { useState,useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


const Signup = () => {
  
  // STATES 
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const navigate = useNavigate();

  //FUNCTIONS
  const userRegister = ()=>{
    const formData = new FormData();
    formData.append("name",username);
    formData.append("email",userEmail);
    formData.append("password",userPassword);
    formData.append("isAdmin",false);

    axios({
      method: "post",
      url: "http://localhost:8888/signup",
      data: formData,
      headers: { "Content-Type": "multipart/form-data"},
    })
      .then(function (response) {
        if(response.data.save == true)
        {
          localStorage.setItem("user",JSON.stringify(response.data.newUser));
          navigate('/');
        }else
        {
          alert("Account cannot be created");
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
      <h1>USER REGISTRATION</h1>
      <div className="form-group">
        <div className="form-floating mb-3">
          <input
            name="name"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            type="text"
            className="form-control"
            placeholder="Username"
          />
          <label>Username</label>
        </div>
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
            value="Signup"
            onClick={()=>{
              userRegister();
            }}
          />
        </div>
        <div style={{ marginTop: 40 }}>
          <h4>Already have an account ? <Link to="/login">LOGIN</Link> </h4> 
        </div>
      </div>
    </div>
  );
};

export default Signup;
