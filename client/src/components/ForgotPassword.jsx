import { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:5555/auth/forgot-password", {
      email,
    })
      .then((response) => {
        console.log(response.data);
        if (response.data.status) {
          alert("Check your email for reset password link");
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
        <h2 className="text-2xl font-bold mb-2 text-center">Forgot Password</h2>
        <label className="block text-gray-700 mb-2" htmlFor="email">
          Email:
        </label>
        <input
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
          type="email"
          id="email"
          autoComplete="off"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className="w-full bg-black text-white p-3 rounded-lg font-semibold"
          type="submit"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
