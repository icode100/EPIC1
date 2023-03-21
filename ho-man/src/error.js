import React from "react";
import error from './error.gif'
export default function Error() {
  return (
    <>
      <div className="row" >
        
        <img
          className="col-md-12"
          src={error}
          style={{ position: "absolute",display:'flex',alignContent:'center',justifyContent:'center' }}
          alt="..."
        ></img>
      </div>
    </>
  );
}
