import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"; // Adjust the path as per your file structure

const Navbar = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const handleLogout = () => {
    axios
      .post("http://localhost:5555/auth/logout")
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
    <nav className="bg-white border-b border-gray-200 shadow-md text-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img src={logo} alt="CodeArena Logo" className="h-12 pl-2" />
          {/* <Link
            to={`/${username}/problems`}
            className="text-gray-600 hover:text-gray-900 hover:bg-gray-200 px-3 py-2 rounded-lg"
          >
            Problems
          </Link> */}
          <Link
            to="/submissions"
            className="text-gray-600 hover:text-gray-900 hover:bg-gray-200 px-3 py-2 rounded-lg"
          >
            Submissions
          </Link>
        </div>
        <button
          onClick={handleLogout}
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
