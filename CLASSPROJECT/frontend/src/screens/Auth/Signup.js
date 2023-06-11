import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  return (
    <div className="container" style={{ marginTop: 100 }}>
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
              console.log("CLICKED");
              const formData = new FormData();
              formData.append("name",username);
              formData.append("email",userEmail);
              formData.append("password",userPassword);

              axios({
                method: "post",
                url: "http://localhost:8888/signup",
                data: formData,
                headers: { "Content-Type": "multipart/form-data"},
              })
                .then(function (response) {
                  //handle success
                  console.log(response);
                })
                .catch(function (response) {
                  //handle error
                  console.log(response);
                });

            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
