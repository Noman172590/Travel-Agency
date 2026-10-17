import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-slate-950 px-5 py-10 text-white">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 sm:flex-row">
        <div>
          <h2 className="text-2xl font-extrabold">
            Nihonium<span className="text-teal-400">BD</span>
          </h2>
          <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">
            Discover Bangladesh, explore new destinations, and plan
            your next adventure with us.
          </p>
        </div>

        <div className="flex flex-wrap gap-5 text-sm text-slate-300">
          <Link to="/search" className="hover:text-teal-400">Explore</Link>
          <Link to="/booking" className="hover:text-teal-400">Booking</Link>
          <Link to="/login" className="hover:text-teal-400">Login</Link>
          <Link to="/contact" className="hover:text-teal-400">Contact</Link>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-7xl border-t border-slate-800 pt-5 text-sm text-slate-500">
        © {new Date().getFullYear()} NihoniumBD. All rights reserved.
      </div>
    </footer>
  );
}