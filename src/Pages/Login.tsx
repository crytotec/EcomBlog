import { Eye, Mail, Lock, ArrowRight, EyeOff } from "lucide-react";
import { userAuth } from "../context/AuthContext";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
const C = {
  ink: "#1B1B16",
  paper: "#EFE7D8",
  paperDark: "#E3D9C4",
  cream: "#F7F2E7",
  oxblood: "#7A2E2E",
  oxbloodDark: "#5E2222",
  forest: "#37483B",
  gold: "#B08D57",
  sage: "#8B9A82",
};

function Login() {
  const { login } = userAuth();
  const [showpassword, setShowpassword]=useState(false)
  const navigate = useNavigate()
  const updateuser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formdata = new FormData(e.currentTarget);
    const email = formdata.get("email") as string;
    const keepSignedIn = formdata.get("keepSignedIn") === "on";
    const password = formdata.get("password") as string;
    try {
      await login(email, password, keepSignedIn);
      toast.success("login succesful")
      navigate("/")
      console.log("login successful");
    } catch (error) {
      toast.error("login error")
      console.log(error);
    }
  };

  return (
    <div
      style={{ backgroundColor: C.paper, color: C.ink }}
      className="min-h-screen w-full flex items-center justify-center px-5 py-16"
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <span
            className="text-2xl"
            style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, letterSpacing: "-0.01em" }}
          >
            Foxed &amp; Bound
          </span>
          <p className="text-sm mt-3" style={{ color: "#4A473E", fontFamily: "'Source Serif 4', serif" }}>
            Welcome back to the shelves.
          </p>
        </div>

        {/* Card — library membership card motif */}
        <div
          className="border-2 border-dashed rounded-sm p-8"
          style={{ borderColor: C.oxblood, backgroundColor: C.cream }}
        >
          <div className="flex items-center justify-between mb-6">
            <span
              className="text-xs uppercase tracking-[0.15em]"
              style={{ fontFamily: "'IBM Plex Mono', monospace", color: C.oxblood }}
            >
              Reader Login
            </span>
            <Lock size={16} style={{ color: C.oxblood }} />
          </div>

          <h1 className="text-2xl mb-1" style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}>
            Sign in
          </h1>
          <p className="text-sm mb-6" style={{ color: "#4A473E", fontFamily: "'Source Serif 4', serif" }}>
            Pick up right where you left off.
          </p>

          <form className="flex flex-col gap-4" onSubmit={updateuser}>
            <div>
              <label
                htmlFor="email"
                className="text-xs uppercase tracking-[0.1em] block mb-2"
                style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#4A473E" }}
              >
                Email
              </label>
              <div className="relative">
                <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#8A8674" }} />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-sm border text-sm outline-none"
                  style={{ borderColor: C.paperDark, fontFamily: "'Source Serif 4', serif", backgroundColor: "white" }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="password"
                  className="text-xs uppercase tracking-[0.1em]"
                  style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#4A473E" }}
                >
                  Password
                </label>
                
                  <Link to="/forgot-password"
                  className="text-xs hover:opacity-60 transition-opacity"
                  style={{ fontFamily: "'IBM Plex Mono', monospace", color: C.oxblood }}
                >
                  Forgot?
                </Link>
              </div>
<div className="relative">
  <Lock
    size={15}
    className="absolute left-3 top-1/2 -translate-y-1/2"
    style={{ color: "#8A8674" }}
  />

   <input
      id="password"
       name="password"
       type={showpassword ? "text" : "password"}
       autoComplete="current-password"
      placeholder="••••••••"
       className="w-full pl-10 pr-10 py-3 rounded-sm border text-sm outline-none"
        style={{
        borderColor: C.paperDark,
        fontFamily: "'Source Serif 4', serif",
        backgroundColor: "white",
       }}
       />

      <button
        type="button"
        onClick={() => setShowpassword(!showpassword)}
        className="absolute right-3 top-1/2 -translate-y-1/2"
        style={{ color: "#8A8674" }}
       >
       {showpassword ? <Eye size={15} /> : <EyeOff size={15} />}
      </button>
         </div>
            </div>

            <label className="flex items-center gap-2 text-sm cursor-pointer select-none" style={{ fontFamily: "'Source Serif 4', serif" }}>
              <input type="checkbox" name="keepSignedIn" className="accent-current" style={{ color: C.oxblood }} />
              Keep me signed in
            </label>

            <button
              type="submit"
              className="w-full mt-2 px-6 py-3.5 text-sm uppercase tracking-[0.1em] text-white rounded-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              style={{ backgroundColor: C.oxblood, fontFamily: "'IBM Plex Mono', monospace" }}
            >
              Sign in <ArrowRight size={14} />
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px" style={{ backgroundColor: C.paperDark }} />
            <span className="text-xs uppercase tracking-[0.1em]" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#8A8674" }}>
              or
            </span>
            <div className="flex-1 h-px" style={{ backgroundColor: C.paperDark }} />
          </div>

          <button
            type="button"
            className="w-full px-6 py-3 text-sm rounded-sm border hover:bg-black/5 transition-colors"
            style={{ borderColor: C.ink, fontFamily: "'Source Serif 4', serif" }}
          >
            Continue with Google
          </button>
        </div>

        <p className="text-center text-sm mt-6" style={{ color: "#4A473E", fontFamily: "'Source Serif 4', serif" }}>
          New here?{" "}
          <a href="#" className="hover:opacity-60 transition-opacity" style={{ color: C.oxblood, fontWeight: 500 }}>
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;