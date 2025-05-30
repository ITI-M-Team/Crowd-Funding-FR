import React from "react";
import {Route ,Routes} from "react-router"
import SignUp from "../Pages/SignUp";
import LayoutsWithHeaderFooter from "../components/LayoutsWithHeaderFooter";
import Home from "../Pages/Home";
import Signup2 from "../Pages/Signup2";
import ForgetPassword from "../Pages/forget_password";
import Projects from "../Pages/Projects";



function RouteList() {
  return (  
    <>
        <Routes>
            <Route element={<LayoutsWithHeaderFooter/>}>
                <Route path="/" element={<Home/>} />
                <Route path="/signup" element={<Signup2/>} />
                <Route path="/projects" element={<Projects/>} />
                <Route path="/forget_password" element={<ForgetPassword />} />
            </Route>
        </Routes>
    </>
  );
}

export default RouteList;