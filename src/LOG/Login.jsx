import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [userFound, setUseerFound]=useState('')
  const navigate = useNavigate();

  // LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
         await signInWithEmailAndPassword(auth, email, password);
      navigate("/")
     
    } catch (error) {
      alert(error.message);
    }
  };

  // SIGNUP
  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      if(auth.email && auth.password){
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Account created successfully!");
      navigate("/")
       }else{
         setUseerFound('Password and email already existed')
      };
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        {/* TITLE */}
        <h2 className="text-3xl font-bold text-center text-green-800">
          {isSignup ? "Create Account ✨" : "Welcome Back 👋"}
        </h2>

        {/* FORM */}
        <form
          onSubmit={isSignup ? handleSignup : handleLogin}
          className="space-y-5 mt-6"
        >

          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 border rounded-lg"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border rounded-lg"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-green-700 text-white py-3 rounded-lg"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>

        </form>

           {userFound &&  <p className="text-center mt-6 text-sm text-gray-600"> {userFound}</p>}
        {/* SWITCH LOGIN / SIGNUP */}
        <p className="text-center mt-6 text-sm text-gray-600">
          {isSignup ? "Already have an account?" : "Don’t have an account?"}{" "}
          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-green-700 font-semibold"
          >
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </p>

      </div>
    </div>
  );
}

export default Login;