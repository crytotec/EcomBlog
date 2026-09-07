import { useState } from "react";
import { User, Package, MapPin, LogOut, Pencil, ChevronRight } from "lucide-react";
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

type Tab = "profile" | "orders" | "addresses";

type Order = {
  id: string;
  date: string;
  status: "Delivered" | "Shipped" | "Processing";
  total: number;
  items: number;
  color: string;
};

// TODO: replace with a real fetch from your backend once orders are persisted there
const ORDERS: Order[] = [
  { id: "FB-48213", date: "Jul 2, 2026", status: "Delivered", total: 40.5, items: 2, color: C.oxblood },
  { id: "FB-47790", date: "Jun 14, 2026", status: "Delivered", total: 18.0, items: 1, color: C.forest },
  { id: "FB-46102", date: "May 29, 2026", status: "Shipped", total: 58.5, items: 3, color: C.gold },
];

const statusColor: Record<Order["status"], string> = {
  Delivered: C.forest,
  Shipped: C.gold,
  Processing: C.oxblood,
};

function NavItem({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3 rounded-sm text-sm transition-colors"
      style={{
        backgroundColor: active ? C.ink : "transparent",
        color: active ? C.cream : C.ink,
        fontFamily: "'Source Serif 4', serif",
      }}
    >
      {icon}
      {label}
    </button>
  );
}

function Account() {
  const [tab, setTab] = useState<Tab>("profile");
  const [editing, setEditing] = useState(false);

  // Assumes AuthContext exposes { user, logout } — adjust field names to match your real context
  const { user, logout } = userAuth();

  // Local draft state for editing, seeded from the real logged-in user
  const [profile, setProfile] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
    phone: user?.phone ?? "",
  });

  // Guard: shouldn't normally happen if route is protected, but keeps this safe standalone
  if (!user) {
    return (
      <div style={{ backgroundColor: C.paper, color: C.ink }} className="min-h-screen w-full flex items-center justify-center">
        <p style={{ fontFamily: "'Source Serif 4', serif" }}>Please log in to view your account.</p>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: C.paper, color: C.ink }} className="min-h-screen w-full">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-12 md:py-16">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-lg flex-shrink-0"
            style={{ backgroundColor: C.oxblood, color: C.cream, fontFamily: "'Fraunces', serif", fontWeight: 600 }}
          >
            {profile.name.split(" ").map((n) => n[0]).join("")}
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl" style={{ fontFamily: "'Fraunces', serif", fontWeight: 700 }}>
              {profile.name}
            </h1>
            <p className="text-sm" style={{ color: "#4A473E", fontFamily: "'IBM Plex Mono', monospace" }}>
              Member since 2024
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-[220px_1fr] gap-10 items-start">
          {/* SIDEBAR */}
          <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible border-b lg:border-b-0 pb-3 lg:pb-0" style={{ borderColor: C.paperDark }}>
            <NavItem icon={<User size={16} />} label="Profile" active={tab === "profile"} onClick={() => setTab("profile")} />
            <NavItem icon={<Package size={16} />} label="Orders" active={tab === "orders"} onClick={() => setTab("orders")} />
            <NavItem icon={<MapPin size={16} />} label="Addresses" active={tab === "addresses"} onClick={() => setTab("addresses")} />
            <div className="hidden lg:block h-px my-2" style={{ backgroundColor: C.paperDark }} />
            <button
              onClick={() =>logout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-sm text-sm hover:opacity-70 transition-opacity flex-shrink-0"
              style={{ color: C.oxblood, fontFamily: "'Source Serif 4', serif" }}
            >
              <LogOut size={16} />
              Sign out
            </button>
          </nav>

          {/* CONTENT */}
          <div>
            {tab === "profile" && (
              <div className="border-2 border-dashed rounded-sm p-6 md:p-8" style={{ borderColor: C.oxblood, backgroundColor: C.cream }}>
                <div className="flex items-center justify-between mb-6">
                  <span
                    className="text-xs uppercase tracking-[0.15em]"
                    style={{ fontFamily: "'IBM Plex Mono', monospace", color: C.oxblood }}
                  >
                    Reader Profile
                  </span>
                  <button
                    onClick={() => setEditing((v) => !v)}
                    className="flex items-center gap-1 text-xs hover:opacity-60 transition-opacity"
                    style={{ fontFamily: "'IBM Plex Mono', monospace", color: C.ink }}
                  >
                    <Pencil size={12} /> {editing ? "Cancel" : "Edit"}
                  </button>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  {(
                    [
                      { label: "Full name", key: "name" as const },
                      { label: "Email", key: "email" as const },
                      { label: "Phone", key: "phone" as const },
                    ]
                  ).map((f) => (
                    <div key={f.key}>
                      <label
                        className="text-xs uppercase tracking-[0.1em] block mb-2"
                        style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#4A473E" }}
                      >
                        {f.label}
                      </label>
                      {editing ? (
                        <input
                          value={profile[f.key]}
                          onChange={(e) => setProfile((p) => ({ ...p, [f.key]: e.target.value }))}
                          className="w-full px-4 py-3 rounded-sm border text-sm outline-none"
                          style={{ borderColor: C.paperDark, fontFamily: "'Source Serif 4', serif", backgroundColor: "white" }}
                        />
                      ) : (
                        <p className="text-sm py-3" style={{ fontFamily: "'Source Serif 4', serif" }}>
                          {profile[f.key]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                {editing && (
                  <button
                    onClick={() => {
                      // TODO: call your backend here to persist profile changes, e.g.
                      // await updateProfile(profile)
                      setEditing(false);
                    }}
                    className="mt-6 px-6 py-3 text-sm uppercase tracking-[0.1em] text-white rounded-sm hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: C.oxblood, fontFamily: "'IBM Plex Mono', monospace" }}
                  >
                    Save changes
                  </button>
                )}
              </div>
            )}

            {tab === "orders" && (
              <div className="flex flex-col gap-4">
                <h2 className="text-xl mb-1" style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}>
                  Order history
                </h2>
                {ORDERS.length === 0 ? (
                  <p className="text-sm" style={{ color: "#4A473E", fontFamily: "'Source Serif 4', serif" }}>
                    No orders yet.
                  </p>
                ) : (
                  ORDERS.map((o) => (
                    <div
                      key={o.id}
                      className="flex items-center gap-4 p-4 rounded-sm border"
                      style={{ borderColor: C.paperDark, backgroundColor: C.cream }}
                    >
                      <div className="w-10 h-14 rounded-sm flex-shrink-0" style={{ backgroundColor: o.color }} />
                      <div className="flex-1">
                        <p className="text-sm" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
                          {o.id}
                        </p>
                        <p className="text-xs mt-1" style={{ color: "#8A8674", fontFamily: "'Source Serif 4', serif" }}>
                          {o.date} · {o.items} {o.items === 1 ? "item" : "items"}
                        </p>
                      </div>
                      <span
                        className="text-xs uppercase tracking-[0.08em] px-3 py-1 rounded-full"
                        style={{ backgroundColor: `${statusColor[o.status]}20`, color: statusColor[o.status], fontFamily: "'IBM Plex Mono', monospace" }}
                      >
                        {o.status}
                      </span>
                      <span className="text-sm w-16 text-right" style={{ fontFamily: "'IBM Plex Mono', monospace", color: C.oxblood }}>
                        ${o.total.toFixed(2)}
                      </span>
                      <ChevronRight size={16} style={{ color: "#8A8674" }} />
                    </div>
                  ))
                )}
              </div>
            )}

            {tab === "addresses" && (
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between mb-1">
                  <h2 className="text-xl" style={{ fontFamily: "'Fraunces', serif", fontWeight: 600 }}>
                    Saved addresses
                  </h2>
                  <button
                    className="text-xs uppercase tracking-[0.1em] px-4 py-2 rounded-sm border hover:bg-black/5 transition-colors"
                    style={{ borderColor: C.ink, fontFamily: "'IBM Plex Mono', monospace" }}
                  >
                    Add new
                  </button>
                </div>
                <div className="p-5 rounded-sm border flex items-start justify-between" style={{ borderColor: C.paperDark, backgroundColor: C.cream }}>
                  <div>
                    <p className="text-sm mb-1 flex items-center gap-2" style={{ fontFamily: "'Source Serif 4', serif" }}>
                      <span
                        className="text-xs uppercase tracking-[0.08em] px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: C.forest, color: C.cream, fontFamily: "'IBM Plex Mono', monospace" }}
                      >
                        Default
                      </span>
                    </p>
                    <p className="text-sm" style={{ fontFamily: "'Source Serif 4', serif" }}>
                      {profile.name}<br />
                      221B Baker Street<br />
                      London, NW1 6XE<br />
                      United Kingdom
                    </p>
                  </div>
                  <button
                    className="text-xs hover:opacity-60 transition-opacity flex items-center gap-1"
                    style={{ fontFamily: "'IBM Plex Mono', monospace", color: C.oxblood }}
                  >
                    <Pencil size={12} /> Edit
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;