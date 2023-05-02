import React from "react";
import { useGetLoggedUserQuery } from "../services/userAuth";
import {getToken} from "../services/localStorageService";





export default function Homesup() {
  
  const {access_token} = getToken()
  const {data,isSuccess} = useGetLoggedUserQuery(access_token);
  return (
    <div className="container">
      <h1>Hello! {isSuccess && data? data.name.split(" ")[0]:""} </h1>This is NIT AP Ho-Man. <br />
      We are here to seamlessly manage the hostel through technology. <br />
      This is an app by the students for the students under the guidelines of
      NIT AP. <br />
      To look for options please check the above navbar <h1>👆</h1>
      Hoping for a revisit !!! <h1>😃</h1>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
