import { useState } from "react";
import "../App.css";
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
      .then((response) => {
        if (response.data.status) {
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="w-72 p-5 border border-gray-300 rounded-lg shadow"
        onSubmit={handleSubmit}
      >
        <h2>Sign Up</h2>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          autoComplete="off"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          placeholder="******"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Sign Up</button>
        <p>
          Have an Account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
