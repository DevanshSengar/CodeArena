import { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:5555/auth/login", {
      email,
      password,
    })
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          const { username } = res.data;
          navigate(`/${username}`);
        }
      })
      .catch((err) => {
        alert("Invalid Credentials");
        console.log(err);
      });
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-2 text-center">Login</h2>
        <p className="text-gray-600 mb-6 text-center">
          Enter your credentials to access your account
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded-lg"
              type="email"
              id="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="w-full p-3 border border-gray-300 rounded-lg"
              type="password"
              id="password"
              placeholder="********"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-between items-center mb-6">
            <Link
              className="text-blue-600 hover:underline"
              to="/forgotPassword"
            >
              Forgot Password?
            </Link>
          </div>
          <button
            className="w-full bg-black text-white p-3 rounded-lg font-semibold hover:bg-gray-700"
            type="submit"
          >
            Login
          </button>
          <p className="text-center mt-4">
            Don&apos;t Have Account?{" "}
            <Link className="text-blue-600 hover:underline" to="/signup">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
