import { useState } from "react";
import Axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const { token } = useParams();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post(`http://localhost:5555/auth/reset-password/${token}`, {
      password,
    })
      .then((response) => {
        if (response.data.status) {
          navigate("/login");
        }
        console.log(response.data);
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
        <h2 className="text-2xl font-bold mb-2 text-center">Reset Password</h2>
        <label className="block text-gray-700 mb-2" htmlFor="password">
          New Password:
        </label>
        <input
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
          type="password"
          id="password"
          placeholder="********"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full bg-black text-white p-3 rounded-lg font-semibold"
          type="submit"
        >
          Reset
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
