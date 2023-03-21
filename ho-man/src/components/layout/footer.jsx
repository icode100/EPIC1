import React from "react";
import favicon from "./favicon.ico";
export default function Footer() {
  return (
    <div
      class="row p-3 mt-2 bg-dark-subtle text-white"
      style={{
        position: "static",
        bottom: "0",
        width: "100%",
        left: "0",
        right: "0",
      }}
    >
      <div
        className="col-md-6 my-3"
        id="col-1"
        style={{ fontSize: "50px", color: "black" }}
      >
        <img
          src={favicon}
          alt="Logo"
          width="100"
          height="85"
          class="d-inline-block align-text-top"
        />
        Ho-Man
      </div>
      <div className="col-md-6 my-5 mx-0">
        Designed and built with all the love in the world <br /> by the Ipsit
        and Vishal <br />
        Currently v1.0.0. <br />© National Institute of Technology Andhra
        Pradesh Ho-Man
      </div>
    </div>
  );
}
