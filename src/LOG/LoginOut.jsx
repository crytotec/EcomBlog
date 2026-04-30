import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function LogOut() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 text-center">

        <h2 className="text-2xl font-bold text-green-800">
          You’ve been logged out
        </h2>

        <button
          onClick={handleLogout}
          className="mt-6 w-full bg-green-700 text-white py-3 rounded-lg"
        >
          Logout
        </button>

      </div>
    </div>
  );
}

export default LogOut;