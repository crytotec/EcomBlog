import { Search, ShoppingBag, Menu, X, User } from "lucide-react";
import {useState } from "react";
import { userAuth } from "../context/AuthContext";
import { cartAuth } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
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

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLoggedIn, user, logout } = userAuth();
  const { cart } = cartAuth();
  const navigate = useNavigate()
  const updateuser = async () => {
      try {
        await logout();
        toast.success("logout succesful")
        navigate("/")
        console.log("login successful");
      } catch (error) {
        toast.error("login error")
        console.log(error);
      }
    };
  return (
    <div style={{ backgroundColor: C.paper, color: C.ink }} className="h-full w-full overflow-y-auto">
      {/* NAV */}
      <header className="fixed w-full top-0 z-30 border-b" style={{ backgroundColor: C.paper, borderColor: C.paperDark }}>
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-4 flex items-center justify-between">
          <Link to="/">
          <span className="text-2xl" style={{ fontFamily: "'Fraunces', serif", fontWeight: 700, letterSpacing: "-0.01em" }}>
            Foxed &amp; Bound
          </span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm" style={{ fontFamily: "'Source Serif 4', serif" }}>
            <a className="hover:opacity-60 transition-opacity" href="#shelves">Shelves</a>
            <a className="hover:opacity-60 transition-opacity" href="#featured">New Arrivals</a>
            <a className="hover:opacity-60 transition-opacity" href="#picks">Staff Picks</a>
            <a className="hover:opacity-60 transition-opacity" href="#about">About</a>
          </nav>

          <div className="flex items-center gap-4">
            <button aria-label="Search" className="hover:opacity-60 transition-opacity">
              <Search size={19} strokeWidth={1.6} />
            </button>

            <div className="relative">
              <Link to="/cart">
                <ShoppingBag size={19} strokeWidth={1.6} />
                <div className="absolute -right-2 -top-2 rounded-full bg-red-600 text-white w-4 h-4 flex items-center justify-center text-[10px] font-bold z-10">
                  {cart.length}
                </div>
              </Link>
            </div>

            <button className="md:hidden" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu">
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <Link
                  to="/account"
                  className="hover:opacity-60 transition-opacity flex items-center gap-1.5 text-sm"
                  style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  <User size={16} strokeWidth={1.6} />
                  {user?.name?.split(" ")[0] ?? "Account"}
                </Link>
                <button
                  onClick={updateuser}
                  className="hover:opacity-60 transition-opacity cursor-pointer text-sm"
                  style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link className="hover:opacity-60 transition-opacity text-sm" to="/register">
                  signup
                </Link>
                <Link className="hover:opacity-60 transition-opacity text-sm" to="/login">
                  login
                </Link>
              </div>
            )}
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden px-5 pb-4 flex flex-col gap-3 text-sm" style={{ fontFamily: "'Source Serif 4', serif" }}>
            <a href="#shelves">Shelves</a>
            <a href="#featured">New Arrivals</a>
            <a href="#picks">Staff Picks</a>
            <a href="#about">About</a>
          </div>
        )}
      </header>
    </div>
  );
}

export default Navbar;