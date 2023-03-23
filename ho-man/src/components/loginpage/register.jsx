import React, { useEffect,useState } from "react";
import { Alert } from '@mui/material';
import "./login.css";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../../services/userAuth";
export default function Register(props) {
    useEffect(() => {
        document.title = "ho-man | Register";
      }, []);
  const [server_error,setServerError] = useState({});
  const navigate = useNavigate();
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
      // console.log(res.error.data.errors)
      setServerError(res.error.data.errors)
      
    }
    if(res.data){
      console.log(res.data)
      navigate('/')
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
              className="form-control mb-3"
              name="name"
              id="floatingInput"
              placeholder="Name"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <label htmlFor="floatingInput">Name</label>
            {server_error.name ? <Typography style={{fontSize:12,color:'red',paddingLeft:10}}>{server_error.name[0]}</Typography> :""}
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
            {server_error.email ? <Typography style={{fontSize:12,color:'red',paddingLeft:10}}>{server_error.email[0]}</Typography> :""}
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
            {server_error.password ? <Typography style={{fontSize:12,color:'red',paddingLeft:10}}>{server_error.password2[0]}</Typography> :""}
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
            {server_error.password ? <Typography style={{fontSize:12,color:'red',paddingLeft:10}}>{server_error.password2[0]}</Typography> :""}
          </div>
          <button className="btn btn-warning my-3" type="submit">
            <ion-icon name="log-in-outline"></ion-icon>
          </button>
          
        </form>
        {server_error.non_field_errors?<Alert severity="error">{server_error.non_field_errors[0]}</Alert>:""}
      </div>
    </>
  );
}
