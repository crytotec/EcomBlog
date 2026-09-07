import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Package, ShoppingBag, LogOut } from "lucide-react";
import { userAuth } from "../context/AuthContext";

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

const NAV_ITEMS = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/orders", label: "Orders", icon: ShoppingBag, end: false },
  { to: "/admin/products", label: "Products", icon: Package, end: false },
];

function AdminLayout() {
  const { user, logout } = userAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login", { replace: true });
  };

  return (
    <div style={{ backgroundColor: C.paper, color: C.ink }} className="min-h-screen w-full flex">
      {/* Sidebar */}
      <aside
        className="w-60 flex-shrink-0 border-r flex flex-col justify-between"
        style={{ borderColor: C.paperDark, backgroundColor: C.cream }}
      >
        <div>
          <div className="px-6 py-6 border-b" style={{ borderColor: C.paperDark }}>
            <p className="text-lg" style={{ fontFamily: "'Fraunces', serif", fontWeight: 700 }}>
              Store admin
            </p>
          </div>

          <nav className="flex flex-col gap-1 p-4">
            {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2.5 rounded-sm text-sm transition-colors ${
                    isActive ? "" : "hover:bg-black/5"
                  }`
                }
                style={({ isActive }) => ({
                  fontFamily: "'IBM Plex Mono', monospace",
                  backgroundColor: isActive ? C.ink : "transparent",
                  color: isActive ? C.cream : C.ink,
                })}
              >
                <Icon size={16} />
                {label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Account footer */}
        <div className="p-4 border-t" style={{ borderColor: C.paperDark }}>
          <div className="px-2 mb-3">
            <p className="text-sm truncate" style={{ fontFamily: "'Source Serif 4', serif" }}>
              {user?.email}
            </p>
            <p className="text-xs uppercase tracking-[0.08em]" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#8A8674" }}>
              Admin
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-sm text-sm hover:bg-black/5 transition-colors"
            style={{ fontFamily: "'IBM Plex Mono', monospace", color: C.oxblood }}
          >
            <LogOut size={16} />
            Sign out
          </button>
        </div>
      </aside>

      {/* Page content */}
      <main className="flex-1 min-w-0">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;