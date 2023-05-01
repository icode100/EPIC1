import React, { useEffect,useState } from "react";
import "./login.css";
import { Alert, CircularProgress } from '@mui/material';
import { useLoginUserMutation } from "../../services/userAuth";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { storeToken,getToken } from "../../services/localStorageService";
import { useDispatch } from "react-redux";
import { setUserToken } from "../../features/authSlice";





export default function Login(props) {
  useEffect(() => {
    document.title = "ho-man | Login";
  }, []);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginUser,{isLoading}] = useLoginUserMutation();
  const [server_error,setServerError] = useState({});
  const dispatch = useDispatch();



  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const actualData = {
      email:data.get('email'),
      password:data.get('password'),
    }
    // console.log(actualData)
    const res = await loginUser(actualData);
    // console.log(res)
    if(res.error){
      setServerError(res.error.data.errors)
    }
    if(res.data){
      // console.log(res.data.userid);
      storeToken(res.data.token);
      let {access_token} = getToken()
      dispatch(setUserToken({access_token:access_token}))
      navigate('/home');
    }
    
  };


  
  let {access_token} = getToken()
  useEffect(()=>{
    dispatch(setUserToken({access_token:access_token}))
  },[access_token,dispatch])
  

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
            {server_error.email ? <Typography style={{fontSize:12,color:'red',paddingLeft:10}}>{server_error.email[0]}</Typography> :""}
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
            {server_error.password ? <Typography style={{fontSize:12,color:'red',paddingLeft:10}}>{server_error.password[0]}</Typography> :""}
          </div>
          
          {isLoading? <CircularProgress/>:<button className="btn btn-warning my-3" type="submit">
            <ion-icon name="log-in-outline"></ion-icon>
          </button>}
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
        {server_error.non_field_errors?<Alert severity="error">{server_error.non_field_errors[0]}</Alert>:""}
      </div>
    </>
  );
}
