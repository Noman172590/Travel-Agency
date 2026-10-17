import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import SearchPage from "./pages/Search";
import Booking from "./pages/Booking";
import Login from "./pages/Login";
import Register from "./pages/Register";
import News from "./pages/News";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";

function SimplePage({ title, description }) {
  return (
    <main className="mx-auto min-h-[60vh] max-w-7xl px-5 py-16">
      <h1 className="text-4xl font-extrabold">{title}</h1>
      <p className="mt-4 max-w-2xl leading-7 text-slate-500">{description}</p>
      <Link
        to="/"
        className="mt-6 inline-block rounded-xl bg-teal-600 px-5 py-3 font-semibold text-white"
      >
        Back to Home
      </Link>
    </main>
  );
}

function NotFound() {
  return (
    <SimplePage
      title="404 — Page not found"
      description="Sorry, the page you are looking for does not exist."
    />
  );
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/news" element={<News />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/news"
            element={
              <SimplePage
                title="Travel News"
                description="Discover travel updates, destination news, and useful information for your next trip."
              />
            }
          />

          <Route
            path="/blog"
            element={
              <SimplePage
                title="Travel Blog"
                description="Read travel stories, itineraries, and practical travel guides for Bangladesh."
              />
            }
          />

          <Route
            path="/contact"
            element={
              <SimplePage
                title="Contact Us"
                description="Have questions about your next trip? Contact our travel team for assistance."
              />
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}
