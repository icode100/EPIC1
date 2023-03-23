import React, { useEffect,useState } from "react";
import "./login.css";
// import { Alert } from "bootstrap-4-react/lib/components";
// import axios from 'axios';
// import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../../services/userAuth";
export default function Register(props) {
    useEffect(() => {
        document.title = "ho-man | Register";
      }, []);
  const [server_error,setServerError] = useState();
  // const navigate = useNavigate();
  const [registerUser,{isLoading}] = useRegisterUserMutation()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnfpassword, setCnfPassword] = useState("");
  const [name, setName] = useState("");
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const actualData = {
        email:data.get('email'),
        name:data.get('name'),
        password:data.get('password'),
        password2:data.get('confirm password'),
    }
    const res = await registerUser(actualData)
    // console.log(res)
    // console.log(actualData)
    if(res.error){
      console.log(res.error.data.errors)
      setServerError(res.error.data.errors)
    }
    if(res.data){
      console.log(res.data)
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
      </div>
    </>
  );
}
