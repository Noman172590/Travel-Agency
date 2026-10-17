import { useState } from "react";
import { Link } from "react-router-dom";
import { Compass, Mail, Lock, User } from "lucide-react";

export default function AuthForm({ mode = "login" }) {
  const isRegister = mode === "register";
  const [message, setMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setMessage(
      "Form validated for demo. Authentication backend is not connected."
    );
  }

  return (
    <main className="flex min-h-[80vh] items-center justify-center px-5 py-12">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-lg sm:p-10">
        <div className="flex items-center justify-center gap-2 text-teal-700">
          <Compass size={30} />
          <span className="text-xl font-extrabold">NihoniumBD</span>
        </div>

        <h1 className="mt-7 text-center text-3xl font-extrabold">
          {isRegister ? "Create an account" : "Welcome back"}
        </h1>

        <p className="mt-2 text-center text-slate-500">
          {isRegister
            ? "Start planning your next adventure."
            : "Login to continue your journey."}
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          {isRegister && (
            <label className="flex items-center gap-3 rounded-xl border p-3">
              <User size={20} className="text-slate-400" />
              <input
                type="text"
                required
                minLength={2}
                placeholder="Full name"
                autoComplete="name"
                className="w-full outline-none"
              />
            </label>
          )}

          <label className="flex items-center gap-3 rounded-xl border p-3">
            <Mail size={20} className="text-slate-400" />
            <input
              type="email"
              required
              placeholder="Email address"
              autoComplete="email"
              className="w-full outline-none"
            />
          </label>

          <label className="flex items-center gap-3 rounded-xl border p-3">
            <Lock size={20} className="text-slate-400" />
            <input
              type="password"
              required
              minLength={8}
              placeholder="Password (at least 8 characters)"
              autoComplete={
                isRegister ? "new-password" : "current-password"
              }
              className="w-full outline-none"
            />
          </label>

          <button
            type="submit"
            className="w-full rounded-xl bg-teal-600 py-3.5 font-bold text-white hover:bg-teal-700"
          >
            {isRegister ? "Create Account" : "Login"}
          </button>
        </form>

        {message && (
          <p role="status" className="mt-4 rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
            {message}
          </p>
        )}

        <p className="mt-6 text-center text-sm text-slate-500">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <Link
            to={isRegister ? "/login" : "/register"}
            className="font-semibold text-teal-700 hover:underline"
          >
            {isRegister ? "Login" : "Create account"}
          </Link>
        </p>
      </div>
    </main>
  );
}