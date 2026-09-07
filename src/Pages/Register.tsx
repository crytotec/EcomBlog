import { Eye, Mail, Lock, User, ArrowRight, EyeOff } from "lucide-react";
import { userAuth } from "../context/AuthContext";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

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
function Register() {
  const {signup} = userAuth()
  const [showPassword, setShowpassword]=useState(false)
  const navigate=useNavigate()
  const updatesignup = async (e:FormEvent<HTMLFormElement>) =>{
   e.preventDefault()
   const formdata= new FormData(e.currentTarget)
   const name= formdata.get("name") as string
   const email= formdata.get("email") as string
   const password= formdata.get("password") as string

   try {
    await signup(name, email, password)
    toast.success("signup successful")
    navigate("/")
    console.log('signup successful');
    
   } catch (error) {
    toast.error("signup error")
    console.log(error);
    
   }
  }
  return (
    <div style={{ backgroundColor: C.paper, color: C.ink }} className="min-h-screen w-full flex items-center justify-center px-5 py-16">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-2xl" style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, letterSpacing: "-0.01em" }}>
            Foxed &amp; Bound
          </span>
          <p className="text-sm mt-3" style={{ color: "#4A473E", fontFamily: "'Source Serif 4', serif" }}>
            Open a reading card and start your shelf.
          </p>
        </div>

        {/* Card — library membership card motif */}
        <div className="border-2 border-dashed rounded-sm p-8" style={{ borderColor: C.oxblood, backgroundColor: C.cream }}>
          <div className="flex items-center justify-between mb-6">
            <span
              className="text-xs uppercase tracking-[0.15em]"
              style={{ fontFamily: "'IBM Plex Mono', monospace", color: C.oxblood }}
            >
              New Reader
            </span>
            <Lock size={16} style={{ color: C.oxblood }} />
          </div>

          <h1 className="text-2xl mb-1" style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}>
            Create an account
          </h1>
          <p className="text-sm mb-6" style={{ color: "#4A473E", fontFamily: "'Source Serif 4', serif" }}>
            Takes less than a minute.
          </p>

          <form onSubmit={updatesignup} className="flex flex-col gap-4">
            <div>
              <label
                htmlFor="name"
                className="text-xs uppercase tracking-[0.1em] block mb-2"
                style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#4A473E" }}
              >
                Full name
              </label>
              <div className="relative">
                <User size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#8A8674" }} />
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Jordan Ellis"
                  className="w-full pl-10 pr-4 py-3 rounded-sm border text-sm outline-none"
                  style={{ borderColor: C.paperDark, fontFamily: "'Source Serif 4', serif", backgroundColor: "white" }}
                />
              </div>
            </div>

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
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 rounded-sm border text-sm outline-none"
                  style={{ borderColor: C.paperDark, fontFamily: "'Source Serif 4', serif", backgroundColor: "white" }}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-xs uppercase tracking-[0.1em] block mb-2"
                style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#4A473E" }}
              >
                Password
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#8A8674" }} />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 rounded-sm border text-sm outline-none"
                  style={{ borderColor: C.paperDark, fontFamily: "'Source Serif 4', serif", backgroundColor: "white" }}
                />
                <button type="button" onClick={() => setShowpassword(true)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "#8A8674" }}>
                  {showPassword ? (<Eye size={15} />) : (<EyeOff size={15}/>)}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="text-xs uppercase tracking-[0.1em] block mb-2"
                style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#4A473E" }}
              >
                Confirm password
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#8A8674" }} />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" :"password"}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 rounded-sm border text-sm outline-none"
                  style={{ borderColor: C.paperDark, fontFamily: "'Source Serif 4', serif", backgroundColor: "white" }}
                />
                <button onClick={()=> setShowpassword(true)} className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color: "#8A8674" }}>
                  {showPassword ? (<Eye size={15} />) : (<EyeOff size={15}/>)}
                </button>
              </div>
            </div>

            <label className="flex items-start gap-2 text-sm cursor-pointer select-none" style={{ fontFamily: "'Source Serif 4', serif" }}>
              <input
                type="checkbox"
                name="agreed"
                className="accent-current mt-0.5"
                style={{ color: C.oxblood }}
              />
              <span style={{ color: "#4A473E" }}>
                I agree to the{" "}
                <a href="#" style={{ color: C.oxblood }}>
                  Terms
                </a>{" "}
                and{" "}
                <a href="#" style={{ color: C.oxblood }}>
                  Privacy Policy
                </a>
              </span>
            </label>

            <button
              type="submit"
              className="w-full mt-2 px-6 py-3.5 text-sm uppercase tracking-[0.1em] text-white rounded-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              style={{ backgroundColor: C.oxblood, fontFamily: "'IBM Plex Mono', monospace" }}
            >
              Create account <ArrowRight size={14} />
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
          Already have an account?{" "}
          <a href="#" className="hover:opacity-60 transition-opacity" style={{ color: C.oxblood, fontWeight: 500 }}>
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;