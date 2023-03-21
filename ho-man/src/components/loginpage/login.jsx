import React, { useEffect,useState } from "react";
import "./login.css";
import { Alert } from "bootstrap-4-react/lib/components";
// import axios from 'axios';
import { useNavigate } from "react-router-dom";
export default function Login(props) {
  useEffect(() => {
    document.title = "ho-man | Login";
  }, []);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError] = useState({
    status:'false',
    type:'',
    msg:'',
  })
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const actualData = {
      email:data.get('email'),
      password:data.get('password'),
    }
    if(actualData.email && actualData.password){
      console.log(actualData);
      document.getElementById('loginform');
      setError({status:'false',msg:'login success',type:'success'})
      navigate('/home');
    }
    else{
      setError({status:'true',msg:'all fields are mandatory',type:'warning'})
    }
    
  };
  

  return (
    <>
      <div className="container0">
        <form className="form" id="loginform" onSubmit={handleSubmit}>
          <h2 className="h2">Student Login</h2>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              name="email"
              id="floatingInput"
              placeholder="name@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              name="password"
              id="floatingPassword"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <button className="btn btn-warning my-3" type="submit">
            <ion-icon name="log-in-outline"></ion-icon>
          </button>
          <p>
            <a
              id="forgot"
              href="/resetpass"
            >
              forgot credentials 😢???
            </a>
            <a
              id="register"
              href="/register"
            > <br />
              Register here 😊
            </a>
          </p>
        </form>
        {error.status==="true"?<Alert info>{error.msg}</Alert>:<></>}
      </div>
    </>
  );
}
