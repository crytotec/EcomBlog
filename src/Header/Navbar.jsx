import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

function Navbar({ Add }) {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);


  useEffect(()=>{
   if (open) {
    document.body.style.overflow='hidden'
   }else{
    document.body.style.overflow='auto'
   }


   return () => document.body.style.overflow='auto'
  },[open])
  return (
    <div className="w-full sticky top-0 z-50 bg-yellow-600">

      {/* NAVBAR TOP */}
      <div className="max-w-[1200px] mx-auto flex justify-between items-center p-4 text-white">

        {/* LOGO */}
        <Link to="/">
          <h1 className="font-bold text-xl cursor-pointer hover:text-yellow-300 transition">
            My Store
          </h1>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-6 items-center">

          <Link to="/" className="hover:text-yellow-300 transition">Home</Link>
          <Link to="/service" className="hover:text-yellow-300 transition">Service</Link>

          {/* AUTH */}
          {!user ? (
            <Link to="/login" className="hover:text-yellow-300 transition">
              Login
            </Link>
          ) : (
            <button
              onClick={() => signOut(auth)}
              className="hover:text-yellow-300 transition"
            >
              Logout
            </button>
          )}

          {/* ADMIN ONLY */}
          {user && (
            <Link to="/admin" className="hover:text-yellow-300 transition">
              Admin
            </Link>
          )}

          <Link to="/blog" className="hover:text-yellow-300 transition">Blog</Link>
          <Link to="/delivery" className="hover:text-yellow-300 transition">Delivery</Link>

          {/* CART */}
          <div className="relative">
            <Link to="/cart" className="hover:text-yellow-300 transition">
              Cart
            </Link>

            {Add.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 rounded-full">
                {Add.length}
              </span>
            )}
          </div>

        </div>

        {/* MOBILE ICON */}
        <div className="md:hidden text-2xl">
          <button onClick={() => setOpen(!open)}>
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>

      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden fixed top-[64px] left-0 w-full h-screen bg-black/40 z-40">

          <div className="bg-yellow-600 w-full flex flex-col items-center gap-6 py-6 text-white font-semibold">

            <Link onClick={() => setOpen(false)} to="/" className="hover:text-yellow-300 transition">Home</Link>
            <Link onClick={() => setOpen(false)} to="/service" className="hover:text-yellow-300 transition">Service</Link>

            {!user ? (
              <Link onClick={() => setOpen(false)} to="/login" className="hover:text-yellow-300 transition">
                Login
              </Link>
            ) : (
              <button
                onClick={() => {
                  signOut(auth);
                  setOpen(false);
                }}
                className="hover:text-yellow-300 transition"
              >
                Logout
              </button>
            )}

            {user && (
              <Link onClick={() => setOpen(false)} to="/admin" className="hover:text-yellow-300 transition">
                Admin
              </Link>
            )}

            <Link onClick={() => setOpen(false)} to="/blog" className="hover:text-yellow-300 transition">Blog</Link>
            <Link onClick={() => setOpen(false)} to="/delivery" className="hover:text-yellow-300 transition">Delivery</Link>

            <Link onClick={() => setOpen(false)} to="/cart" className="hover:text-yellow-300 transition">
              Cart ({Add.length})
            </Link>

          </div>

        </div>
      )}

    </div>
  );
}

export default Navbar;