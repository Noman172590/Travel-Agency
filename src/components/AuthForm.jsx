import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Compass,
  Mail,
  Lock,
  User,
LoaderCircle,
} from "lucide-react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";

import { auth, googleProvider } from "../firebase";

export default function AuthForm({ mode = "login" }) {
  const isRegister = mode === "register";
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function saveUser(user) {
    const userData = {
      uid: user.uid,
      name: user.displayName || user.email?.split("@")[0] || "Traveler",
      email: user.email || "",
      photoURL: user.photoURL || "",
    };

    localStorage.setItem("user", JSON.stringify(userData));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (isRegister) {
        const result = await createUserWithEmailAndPassword(
          auth,
          email.trim(),
          password
        );

        await updateProfile(result.user, {
          displayName: name.trim(),
        });

        saveUser(result.user);
      } else {
        const result = await signInWithEmailAndPassword(
          auth,
          email.trim(),
          password
        );

        saveUser(result.user);
      }

      navigate("/");
    } catch (error) {
      const errors = {
        "auth/email-already-in-use": "This email is already registered.",
        "auth/invalid-email": "Please enter a valid email address.",
        "auth/invalid-credential": "Incorrect email or password.",
        "auth/weak-password": "Password must be at least 6 characters.",
        "auth/too-many-requests": "Too many attempts. Please try again later.",
        "auth/network-request-failed": "Check your internet connection.",
        "auth/operation-not-allowed":
          "Enable Email/Password in Firebase Authentication settings.",
      };

      setMessage(errors[error.code] || error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setLoading(true);
    setMessage("");

    try {
      const result = await signInWithPopup(auth, googleProvider);
      saveUser(result.user);
      navigate("/");
    } catch (error) {
      setMessage(
        error.code === "auth/popup-closed-by-user"
          ? "Google sign-in was cancelled."
          : error.code === "auth/unauthorized-domain"
            ? "Add this domain in Firebase Authorized domains."
            : error.message
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-slate-50 px-5 py-12">
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

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={loading}
          className="mt-7 flex w-full items-center justify-center gap-3 rounded-xl border border-slate-300 py-3 font-semibold hover:bg-slate-50 disabled:opacity-60"
        >
          {loading ? (
            <LoaderCircle size={20} className="animate-spin" />
          ) : (
            <span className="font-bold text-blue-600">G</span>
          )}
          Continue with Google
        </button>

        <div className="my-5 flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-xs text-slate-400">OR WITH EMAIL</span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <label className="flex items-center gap-3 rounded-xl border p-3">
              <User size={20} className="text-slate-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                minLength={2}
                maxLength={100}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              placeholder="Password (at least 6 characters)"
              autoComplete={isRegister ? "new-password" : "current-password"}
              className="w-full outline-none"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 py-3.5 font-bold text-white hover:bg-teal-700 disabled:opacity-60"
          >
            {loading && <LoaderCircle size={19} className="animate-spin" />}
            {loading
              ? "Please wait..."
              : isRegister
                ? "Create Account"
                : "Login"}
          </button>
        </form>

        {message && (
          <p
            role="alert"
            className="mt-4 break-words rounded-lg bg-red-50 p-3 text-sm text-red-700"
          >
            {message}
          </p>
        )}

        <p className="mt-6 text-center text-sm text-slate-500">
          {isRegister
            ? "Already have an account?"
            : "Don't have an account?"}{" "}
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