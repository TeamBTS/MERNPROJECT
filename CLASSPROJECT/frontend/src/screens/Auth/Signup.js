import React, { useState } from "react";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  return (
    <div className="container" style={{ marginTop: 100 }}>
      <div className="form-group">
        <div className="form-floating mb-3">
          <input
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="Username"
          />
          <label for="floatingInput">Username</label>
        </div>
        <div className="form-floating mb-3">
          <input
            value={userEmail}
            onChange={(e) => {
              setUserEmail(e.target.value);
            }}
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="Email"
          />
          <label for="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input
            value={userPassword}
            onChange={(e) => {
              setUserPassword(e.target.value);
            }}
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
          />
          <label for="floatingPassword">Password</label>
        </div>
        <div style={{ marginTop: 40 }}>
          <input
            type="button"
            className="btn btn-primary form-control"
            value="Signup"
            onClick={()=>{
              console.warn(username,userEmail,userPassword);

            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
