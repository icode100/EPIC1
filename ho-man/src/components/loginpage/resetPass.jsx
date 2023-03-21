import React, { useEffect, useState } from "react";
import "./login.css";
// import { Alert } from "bootstrap-4-react/lib/components";
// import axios from 'axios';
// import { useNavigate } from "react-router-dom";
export default function ResetPass() {
  useEffect(() => {
    document.title = "ho-man | Reset password";
  }, []);
  
  const [password, setPassword] = useState("");
  const [cnfpassword, setCnfPassword] = useState("");
//   const [error,setError] = useState({
//     status:'false',
//     type:'',
//     msg:'',
//   })
  return (
    <div className="container0">
      <form className="form" id="loginform">
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            name="password"
            id="floatingInput"
            placeholder="email"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <label htmlFor="floatingPassword">Email</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            name="password"
            id="floatingPassword"
            placeholder="new password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <label htmlFor="floatingPassword">new password</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            name="confirm password"
            id="floatingPassword 1"
            placeholder="confirm password"
            value={cnfpassword}
            onChange={(event) => setCnfPassword(event.target.value)}
          />
          <label htmlFor="floatingPassword 1">confirm password</label>
        </div>
      </form>
      {/* {error.status === "true" ? <Alert info>{error.msg}</Alert> : <></>} */}
    </div>
  );
}
