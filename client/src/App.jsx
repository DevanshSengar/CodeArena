import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import Home from "./components/Home.jsx";
// import ForgotPassword from "./Components/ForgotPassword";
// import ResetPassword from "./Components/ResetPassword";
// import Dashboard from "./Components/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        {/* <Route path = "/forgotPassword" element={<ForgotPassword />}></Route> */}
        {/* <Route path = "/resetPassword/:token" element={<ResetPassword />}></Route> */}
        {/* <Route path="/dashboard" element={<Dashboard />}></Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
