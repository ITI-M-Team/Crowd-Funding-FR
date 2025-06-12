import React from "react";
import { Route, Routes } from "react-router";
import SignUp from "../Pages/SignUp";
import LayoutsWithHeaderFooter from "../components/LayoutsWithHeaderFooter";
import Home from "../Pages/Home";
import Signup2 from "../Pages/Signup2";
import ForgetPassword from "../Pages/forget_password";
import Projects from "../Pages/Projects";
import AddProject from "../Pages/AddProject";
import ProjectDetail from "../Pages/ProjectDetail"; // تأكدي من صحة المسار

function RouteList() {
  return (
    <>
      <Routes>
        <Route element={<LayoutsWithHeaderFooter />}>
          <Route path="/" element={<Home />} />
          <Route path="/addproject" element={<AddProject />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/project/:id" element={<ProjectDetail />} /> {/* أضفناها هنا */}
          <Route path="/forget_password" element={<ForgetPassword />} />
        </Route>
        <Route path="/signup" element={<Signup2 />} />
      </Routes>
    </>
  );
}

export default RouteList;

// import React from "react";
// import {Route ,Routes} from "react-router"
// import SignUp from "../Pages/SignUp";
// import LayoutsWithHeaderFooter from "../components/LayoutsWithHeaderFooter";
// import Home from "../Pages/Home";
// import Signup2 from "../Pages/Signup2";
// import ForgetPassword from "../Pages/forget_password";
// import Projects from "../Pages/Projects";
// import AddProject from "../Pages/AddProject";



// function RouteList() {
//   return (  
//     <>
//         <Routes>
//             <Route element={<LayoutsWithHeaderFooter/>}>
//                 <Route path="/" element={<Home/>} />
//                <Route path="/addproject" element={<AddProject/>} />
//                 <Route path="/projects" element={<Projects/>} />
//                 <Route path="/forget_password" element={<ForgetPassword />} />
//             </Route>
//              <Route path="/signup" element={<Signup2/>} />
//         </Routes>
//     </>
//   );
// }

// export default RouteList;