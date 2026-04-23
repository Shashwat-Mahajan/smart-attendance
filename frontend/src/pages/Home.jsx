import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 space-y-6">
      <h1 className="text-4xl font-bold">Smart Attendance System</h1>
      <p className="text-gray-600">Welcome! Please login or signup</p>

      <div className="space-x-4">
        <Link to="/login">
          <button className="bg-indigo-600 text-white px-6 py-2 rounded">
            Login
          </button>
        </Link>

        <Link to="/signup">
          <button className="bg-green-600 text-white px-6 py-2 rounded">
            Signup
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
