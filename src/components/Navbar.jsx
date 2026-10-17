import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Compass, Search } from "lucide-react";

const navLinks = [
  { name: "News", path: "/news" },
  { name: "Destination", path: "/#destinations" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition hover:text-teal-600 ${
      isActive ? "text-teal-600" : "text-slate-600"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
        <Link to="/" className="flex shrink-0 items-center gap-2">
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

          <Link
            to="/login"
            className="rounded-full bg-teal-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
          >
            Login
          </Link>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
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
            className="block rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-50"
          >
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

          <Link
            to="/login"
            onClick={() => setMenuOpen(false)}
            className="block rounded-lg bg-teal-600 px-3 py-2 text-white"
          >
            Login
          </Link>
        </div>
      )}
    </header>
  );
}