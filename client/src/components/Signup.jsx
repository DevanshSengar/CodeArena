import { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:5555/auth/signup", {
      username,
      email,
      password,
    })
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-2 text-center">Sign Up</h2>
        <label className="block text-gray-700 mb-2" htmlFor="username">
          Username:
        </label>
        <input
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
          type="text"
          id="username"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label className="block text-gray-700 mb-2" htmlFor="email">
          Email:
        </label>
        <input
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
          type="email"
          id="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="block text-gray-700 mb-2" htmlFor="password">
          Password:
        </label>
        <input
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
          type="password"
          id="password"
          placeholder="******"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-black text-white p-3 rounded-lg font-semibold hover:bg-gray-700"
          type="submit"
        >
          Sign Up
        </button>
        <p className="text-center mt-4">
          Have an Account?{" "}
          <Link className="text-blue-600 hover:underline" to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
