import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import Profile from "./components/Profile.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";
import ResetPassword from "./components/ResetPassword.jsx";
import NotFound from "./components/NotFound.jsx";
// import Dashboard from "./components/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:username" element={<Profile />}></Route>
        {/* <Route path="/:username/submissions" element={<Profile />}></Route> */}
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
        <Route path="/resetPassword/:token" element={<ResetPassword />}></Route>
        <Route path="*" element={<NotFound />} />
        {/* <Route path="/dashboard" element={<Dashboard />}></Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
