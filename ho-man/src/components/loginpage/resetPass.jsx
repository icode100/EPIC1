import React, { useEffect, useState } from "react";
import "./login.css";
import { CircularProgress } from "@mui/material";
import { usePasswordChangeMutation } from "../../services/userAuth";
import { getToken } from "../../services/localStorageService";
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';
import {Typography} from "@mui/material";
import { useNavigate } from "react-router-dom";
export default function ResetPass() {
  useEffect(() => {
    document.title = "ho-man | Reset password";
  }, []);
  const {access_token} = getToken();
  const [passwordChange,{isLoading}] = usePasswordChangeMutation();
  const [password, setPassword] = useState("");
  const [cnfpassword, setCnfPassword] = useState("");
  const [server_error,setServerError] = useState({});
  const navigate = useNavigate();
  const handleSubmit = async (event)=>{
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const actualData = {
      password:data.get('password'),
      password2:data.get('confirm password'),
    }
    const res =  await passwordChange({actualData,access_token})
    if(res.error){
      console.log(res.error)
      setServerError(res.error.data.errors)
    }
    if(res.data){
      // console.log(res.data.userid);
      navigate('/home');
    }

  }


  return (
    <div className="container0">
      <form className="form" id="loginform" onSubmit={handleSubmit}>
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
        {server_error.password ? <Typography style={{fontSize:16,color:'red',paddingLeft:10}}>{server_error.password[0]}</Typography>:""}
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
          {server_error.password2 ? <Typography style={{fontSize:16,color:'red',paddingLeft:10}}>{server_error.password2[0]}</Typography>:""}

        </div>
        {server_error.non_field_errors ? <Typography style={{fontSize:16,color:'red',paddingLeft:10}}>{server_error.non_field_errors[0]}</Typography>:""}
        {isLoading? <CircularProgress/>:<button className="btn btn-warning my-3" type="submit">
            <LockResetOutlinedIcon/>
          </button>}
      </form>
      {/* {error.status === "true" ? <Alert info>{error.msg}</Alert> : <></>} */}
    </div>
  );
}
