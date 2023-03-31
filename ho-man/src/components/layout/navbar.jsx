import React, { useState } from "react";
import Clock from "../clock/clock";
import favicon from "./favicon.ico";
import { NavLink } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { removeToken } from "../../services/localStorageService";
import { useDispatch } from "react-redux";
import { unsetUserToken } from "../../features/authSlice";

export default function Navbar(props) {
  const [nlstate, setnlstate] = useState("");
  const [lstate, setlstate] = useState("");
  const [idcstate, setidcstate] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(unsetUserToken({ access_token: null }));
    removeToken();
    navigate("/");
  };
  function isActiveFunc(match, location) {
    if (match) {
      setnlstate("");
      setlstate("");
      setidcstate("");
    } else if (location.pathname === "/home/nonlocal") {
      setnlstate("active");
      setlstate("");
      setidcstate("");
    } else if (location.pathname === "home/local") {
      setnlstate("");
      setlstate("active");
      setidcstate("");
    } else if (location.pathname === "home/idcard") {
      setnlstate("");
      setlstate("");
      setidcstate("active");
    }
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-secondary sticky-top">
      <div className="container-fluid">
        <NavLink
          className="navbar-brand"
          exact
          to="/home"
          onClick={() => {
            setnlstate("");
            setidcstate("");
            setlstate("");
          }}
        >
          <img
            src={favicon}
            width="40"
            height="35"
            className="d-inline-block align-text-top"
            alt="..."
          />{" "}
          Ho-Man
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav nav-tabs me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className={`nav-link ${nlstate}`}
                to="nonlocal"
                role="button"
                isActive={isActiveFunc}
              >
                Non-local Outing <ion-icon name="train-outline"></ion-icon>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={`nav-link ${lstate}`}
                to="local"
                isActive={isActiveFunc}
              >
                Local Outing <ion-icon name="bicycle-outline"></ion-icon>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={`nav-link ${idcstate}`}
                to="icard"
                isActive={isActiveFunc}
                role="button"
              >
                ID Card <ion-icon name="id-card-outline"></ion-icon>
              </NavLink>
            </li>
          </ul>
          <Button
            variant="contained"
            href="#contained-buttons"
            style={{ marginRight: "20px" }}
            onClick={handleLogout}
          >
            Logout<LogoutIcon />
          </Button>
          <Clock />
        </div>
      </div>
    </nav>
  );
}
