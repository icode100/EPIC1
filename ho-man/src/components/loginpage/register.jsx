import React, { useEffect,useState } from "react";
import "./login.css";
import { Alert } from "bootstrap-4-react/lib/components";
// import axios from 'axios';
import { useNavigate } from "react-router-dom";
export default function Register(props) {
    useEffect(() => {
        document.title = "ho-man | Register";
      }, []);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnfpassword, setCnfPassword] = useState("");
  const [name, setName] = useState("");
  const [error,setError] = useState({
    status:'false',
    type:'',
    msg:'',
  })
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const actualData = {
        name:data.get('name'),
        email:data.get('email'),
        password:data.get('password'),
        passwordcnf:data.get('confirm password'),
    }
    if(actualData.name && actualData.email && actualData.password && actualData.password === actualData.passwordcnf){
      console.log(actualData);
      document.getElementById('loginform');
      setError({status:'false',msg:'login success',type:'success'})
      navigate('/');
    }
    else if(actualData.name && actualData.email && actualData.password && actualData.password !== actualData.passwordcnf) {
      setError({status:'true',msg:'passwords do not match',type:'danger'})
    }
    else{
        setError({status:'true',msg:'all fields are mandatory',type:'danger'})
    }
    
    
  };
  

  return (
    <>
      <div className="container0">
        <form className="form" id="loginform1" onSubmit={handleSubmit}>
          <h2 className="h2">Student Register</h2>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              name="name"
              id="floatingInput"
              placeholder="Name"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <label htmlFor="floatingInput">Name</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              name="email"
              id="floatingInput 1"
              placeholder="name@example.com"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <label htmlFor="floatingInput 1">Email address</label>
          </div>
          <div className="form-floating mb-3">
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
          <div className="form-floating">
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
          <button className="btn btn-warning my-3" type="submit">
            <ion-icon name="log-in-outline"></ion-icon>
          </button>
          
        </form>
        {error.status==="true"?<Alert danger>{error.msg}</Alert>:<></>}
      </div>
    </>
  );
}
