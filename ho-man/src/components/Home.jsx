import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./layout/navbar";
import React,{useEffect} from "react";
import Footer from "./layout/footer";
import Homesup from "./Homesup";

export default function Home() {


  useEffect(() => {
    document.title = "ho-man | Home";
  }, []);
  const currentPath = useLocation();
  return (
    <div>
      <Navbar />
      <div>{currentPath.pathname === "/home" ? <Homesup /> : <Outlet />}</div>
      <Footer />
    </div>
  );
}
