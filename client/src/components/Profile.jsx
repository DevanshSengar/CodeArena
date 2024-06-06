import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar.jsx";
import ProblemsList from "./ProblemsList.jsx";
import NotFound from "./NotFound.jsx";

const Home = () => {
  const { username } = useParams();
  const [userExists, setUserExists] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUsername = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5555/auth/check-username/${username}`
        );
        setUserExists(response.data.exists);
      } catch (error) {
        setUserExists(false);
      } finally {
        setLoading(false);
      }
    };

    checkUsername();
  }, [username]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userExists) {
    return <NotFound />;
  }
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <ProblemsList />
    </div>
  );
};

export default Home;
