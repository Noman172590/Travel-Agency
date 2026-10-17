import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Compass,
  Search,
  LogOut,
  UserRound,
  LoaderCircle,
} from "lucide-react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "News", path: "/news" },
  { name: "Destination", path: "/#destinations" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition hover:text-teal-600 ${
      isActive ? "text-teal-600" : "text-slate-600"
    }`;

  const displayName =
    user?.displayName ||
    user?.email?.split("@")[0] ||
    "Traveler";

  const avatarLetter = displayName.charAt(0).toUpperCase();

  async function handleLogout() {
    try {
      await signOut(auth);
      setUserMenuOpen(false);
      setMenuOpen(false);
      navigate("/login");
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  }

  function UserProfile() {
    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => setUserMenuOpen((prev) => !prev)}
          className="flex cursor-pointer items-center gap-2 rounded-full border border-slate-200 p-1 pr-3 transition hover:bg-slate-50"
          aria-label="Open user profile menu"
          aria-expanded={userMenuOpen}
        >
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt={displayName}
              referrerPolicy="no-referrer"
              className="h-9 w-9 rounded-full object-cover"
            />
          ) : (
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-100 font-bold text-teal-700">
              {avatarLetter}
            </span>
          )}

          <span className="max-w-28 truncate text-sm font-semibold text-slate-700">
            {displayName}
          </span>
        </button>

        {userMenuOpen && (
          <div className="absolute right-0 top-full z-50 mt-3 w-64 rounded-xl border border-slate-100 bg-white p-4 shadow-xl">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt=""
                  referrerPolicy="no-referrer"
                  className="h-11 w-11 rounded-full object-cover"
                />
              ) : (
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-teal-100 font-bold text-teal-700">
                  {avatarLetter}
                </span>
              )}

              <div className="min-w-0">
                <p className="truncate font-semibold text-slate-800">
                  {displayName}
                </p>
                <p className="truncate text-sm text-slate-500">
                  {user?.email}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="mt-3 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
            >
              <LogOut size={17} />
              Sign Out
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
        <Link
          to="/"
          className="flex shrink-0 items-center gap-2"
          onClick={() => setMenuOpen(false)}
        >
          <span className="rounded-xl bg-teal-600 p-2 text-white">
            <Compass size={23} />
          </span>

          <span className="text-xl font-extrabold tracking-tight">
            Nihonium<span className="text-teal-600">BD</span>
          </span>
        </Link>

        <form
          action="/search"
          className="hidden max-w-xs flex-1 items-center gap-2 rounded-full bg-slate-100 px-4 py-2.5 md:flex"
        >
          <Search size={18} className="text-slate-400" />
          <input
            name="q"
            placeholder="Search destinations..."
            className="w-full bg-transparent text-sm outline-none"
          />
        </form>

        <div className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) =>
            link.path === "/#destinations" ? (
              <a
                key={link.name}
                href="/#destinations"
                className="text-sm font-medium text-slate-600 hover:text-teal-600"
              >
                {link.name}
              </a>
            ) : (
              <NavLink
                key={link.name}
                to={link.path}
                className={linkClass}
              >
                {link.name}
              </NavLink>
            )
          )}

          {authLoading ? (
            <LoaderCircle
              size={22}
              className="animate-spin text-teal-600"
            />
          ) : user ? (
            <UserProfile />
          ) : (
            <Link
              to="/login"
              className="rounded-full bg-teal-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
            >
              Login
            </Link>
          )}
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="rounded-lg p-2 lg:hidden"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {menuOpen && (
        <div className="space-y-1 border-t border-slate-100 bg-white p-5 lg:hidden">
          <Link
            to="/search"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-50"
          >
            <Search size={17} />
            Search destinations
          </Link>

          {navLinks.map((link) =>
            link.path === "/#destinations" ? (
              <a
                key={link.name}
                href="/#destinations"
                onClick={() => setMenuOpen(false)}
                className="block rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-50"
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className="block rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-50"
              >
                {link.name}
              </Link>
            )
          )}

          <div className="border-t border-slate-100 pt-3">
            {authLoading ? (
              <div className="flex justify-center py-3">
                <LoaderCircle
                  size={22}
                  className="animate-spin text-teal-600"
                />
              </div>
            ) : user ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 px-3 py-2">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={displayName}
                      referrerPolicy="no-referrer"
                      className="h-11 w-11 rounded-full object-cover"
                    />
                  ) : (
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-teal-100 font-bold text-teal-700">
                      {avatarLetter}
                    </span>
                  )}

                  <div className="min-w-0">
                    <p className="truncate font-semibold text-slate-800">
                      {displayName}
                    </p>
                    <p className="truncate text-sm text-slate-500">
                      {user.email}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 font-semibold text-red-600 hover:bg-red-50"
                >
                  <LogOut size={18} />
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block rounded-lg bg-teal-600 px-3 py-2 text-center font-semibold text-white"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
