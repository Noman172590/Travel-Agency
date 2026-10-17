
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  Search,
  MapPin,
  BookOpen,
  Send,
} from "lucide-react";

// Fallback image
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80";

// Blog data
const blogs = [
  {
    id: 1,
    title: "Cox's Bazar Travel Guide: Everything You Need to Know",
    excerpt:
      "Discover the world's longest natural sea beach, explore local food, enjoy breathtaking sunsets, and plan the perfect coastal getaway.",
    category: "Destinations",
    author: "NihoniumBD Team",
    date: "Oct 12, 2026",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1400&q=85",
    featured: true,
  },
  {
    id: 2,
    title: "A Peaceful Weekend Escape to Sreemangal",
    excerpt:
      "Walk through endless tea gardens, discover green landscapes, and enjoy a relaxing weekend surrounded by nature.",
    category: "Nature",
    author: "Noman",
    date: "Oct 08, 2026",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 3,
    title: "10 Essential Tips for First-Time Travelers",
    excerpt:
      "Make your next adventure easier with smart packing, budget planning, safety tips, and a little preparation.",
    category: "Travel Tips",
    author: "NihoniumBD Team",
    date: "Oct 05, 2026",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 4,
    title: "Exploring the Mangrove Beauty of Sundarbans",
    excerpt:
      "Learn about the world's largest mangrove forest, its wildlife, river journeys, and responsible travel experiences.",
    category: "Adventure",
    author: "NihoniumBD Team",
    date: "Sep 28, 2026",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 5,
    title: "How to Plan a Memorable Trip on a Small Budget",
    excerpt:
      "Explore practical ways to save on transportation, accommodation, meals, and activities without missing the fun.",
    category: "Travel Tips",
    author: "Noman",
    date: "Sep 22, 2026",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 6,
    title: "Saint Martin's Island: A Tropical Escape",
    excerpt:
      "Plan an island getaway with blue waters, coastal views, fresh seafood, and unforgettable sunset moments.",
    category: "Destinations",
    author: "NihoniumBD Team",
    date: "Sep 15, 2026",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1000&q=80",
  },
];

const categories = [
  "All",
  "Destinations",
  "Travel Tips",
  "Nature",
  "Adventure",
];

// Reusable image component with fallback
function BlogImage({
  src,
  alt,
  className = "",
  loading = "lazy",
}) {
  const [imageSrc, setImageSrc] = useState(src || FALLBACK_IMAGE);

  return (
    <img
      src={imageSrc}
      alt={alt}
      loading={loading}
      onError={() => {
        if (imageSrc !== FALLBACK_IMAGE) {
          setImageSrc(FALLBACK_IMAGE);
        }
      }}
      className={className}
    />
  );
}

// Blog card
function BlogCard({ blog }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link
        to={`/blog/${blog.id}`}
        className="block overflow-hidden"
      >
        <BlogImage
          src={blog.image}
          alt={blog.title}
          className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </Link>

      <div className="p-5 sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
            {blog.category}
          </span>

          <span className="flex items-center gap-1 text-xs text-gray-500">
            <Clock3 size={14} />
            {blog.readTime}
          </span>
        </div>

        <Link to={`/blog/${blog.id}`}>
          <h3 className="mb-3 text-xl font-bold leading-snug text-gray-900 transition group-hover:text-teal-700">
            {blog.title}
          </h3>
        </Link>

        <p className="mb-5 text-sm leading-6 text-gray-600">
          {blog.excerpt}
        </p>

        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
          <div>
            <p className="text-sm font-semibold text-gray-800">
              {blog.author}
            </p>

            <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">
              <CalendarDays size={13} />
              {blog.date}
            </p>
          </div>

          <Link
            to={`/blog/${blog.id}`}
            aria-label={`Read ${blog.title}`}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-50 text-teal-700 transition hover:bg-teal-700 hover:text-white"
          >
            <ArrowRight size={19} />
          </Link>
        </div>
      </div>
    </article>
  );
}

// Main Blog page
export default function Blog() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const featuredBlog = blogs.find((blog) => blog.featured);

  const filteredBlogs = useMemo(() => {
    const query = search.trim().toLowerCase();

    return blogs.filter((blog) => {
      const matchesCategory =
        activeCategory === "All" ||
        blog.category === activeCategory;

      const matchesSearch =
        !query ||
        blog.title.toLowerCase().includes(query) ||
        blog.excerpt.toLowerCase().includes(query) ||
        blog.category.toLowerCase().includes(query) ||
        blog.author.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  function handleSubscribe(event) {
    event.preventDefault();

    if (!email.trim()) return;

    // Demo only: connect a backend or email service for real subscriptions.
    setSubscribed(true);
    setEmail("");
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero section */}
      <section className="relative isolate overflow-hidden bg-gray-950">
        <BlogImage
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2000&q=85"
          alt="Beautiful mountain landscape"
          loading="eager"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />

        <div className="absolute inset-0 -z-10 bg-gray-950/70" />

        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="max-w-3xl">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur">
              <BookOpen size={16} />
              Stories, Guides & Inspiration
            </span>

            <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
              Discover the World,
              <span className="block text-teal-300">
                One Story at a Time.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-gray-200 sm:text-lg">
              Find travel inspiration, discover hidden gems across
              Bangladesh, and get practical tips to make every
              journey unforgettable.
            </p>

            <a
              href="#all-blogs"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-teal-600 px-6 py-3.5 font-semibold text-white transition hover:bg-teal-500"
            >
              Explore Stories
              <ArrowRight size={19} />
            </a>
          </div>
        </div>
      </section>

      {/* Featured blog */}
      {featuredBlog && (
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center gap-2">
            <MapPin className="text-teal-700" size={21} />

            <h2 className="text-2xl font-bold text-gray-900">
              Editor's Pick
            </h2>
          </div>

          <article className="grid overflow-hidden rounded-3xl bg-white shadow-md md:grid-cols-2">
            <Link
              to={`/blog/${featuredBlog.id}`}
              className="block min-h-64 overflow-hidden"
            >
              <BlogImage
                src={featuredBlog.image}
                alt={featuredBlog.title}
                className="h-full min-h-64 w-full object-cover transition duration-500 hover:scale-105"
              />
            </Link>

            <div className="flex flex-col justify-center p-6 sm:p-10">
              <span className="mb-4 w-fit rounded-full bg-teal-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-teal-700">
                Featured Story
              </span>

              <h2 className="text-2xl font-bold leading-snug text-gray-900 sm:text-3xl">
                {featuredBlog.title}
              </h2>

              <p className="mt-4 leading-7 text-gray-600">
                {featuredBlog.excerpt}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <span>{featuredBlog.author}</span>

                <span className="flex items-center gap-1">
                  <CalendarDays size={15} />
                  {featuredBlog.date}
                </span>
              </div>

              <Link
                to={`/blog/${featuredBlog.id}`}
                className="mt-7 inline-flex w-fit items-center gap-2 font-semibold text-teal-700 hover:text-teal-900"
              >
                Read Full Story
                <ArrowRight size={18} />
              </Link>
            </div>
          </article>
        </section>
      )}

      {/* Blog listing */}
      <section
        id="all-blogs"
        className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8"
      >
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-widest text-teal-700">
              The NihoniumBD Journal
            </p>

            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Latest Travel Stories
            </h2>

            <p className="mt-3 text-gray-600">
              Ideas and guides for your next great adventure.
            </p>
          </div>

          {/* Search input */}
          <div className="relative w-full lg:max-w-sm">
            <Search
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search travel stories..."
              aria-label="Search travel stories"
              className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-12 pr-4 outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-600/10"
            />
          </div>
        </div>

        {/* Category filters */}
        <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                activeCategory === category
                  ? "bg-teal-700 text-white shadow-sm"
                  : "border border-gray-200 bg-white text-gray-600 hover:border-teal-600 hover:text-teal-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mb-5 text-sm text-gray-500">
          Showing {filteredBlogs.length}{" "}
          {filteredBlogs.length === 1 ? "story" : "stories"}
        </div>

        {/* Blog cards */}
        {filteredBlogs.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
            <Search
              className="mx-auto mb-4 text-gray-400"
              size={38}
            />

            <h3 className="text-xl font-bold text-gray-900">
              No stories found
            </h3>

            <p className="mt-2 text-gray-500">
              Try another keyword or choose a different category.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setActiveCategory("All");
              }}
              className="mt-5 rounded-lg bg-teal-700 px-5 py-2.5 font-semibold text-white hover:bg-teal-800"
            >
              Clear Filters
            </button>
          </div>
        )}
      </section>

      {/* Newsletter section */}
      <section className="bg-teal-800">
        <div className="mx-auto max-w-5xl px-4 py-14 text-center sm:px-6 sm:py-16 lg:px-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white">
            <Send size={25} />
          </div>

          <h2 className="mt-5 text-3xl font-extrabold text-white sm:text-4xl">
            Travel Inspiration, Delivered
          </h2>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-teal-50">
            Get travel guides, destination ideas, and helpful tips
            for your next adventure.
          </p>

          {subscribed ? (
            <p
              role="status"
              className="mx-auto mt-7 max-w-lg rounded-xl bg-white/10 p-4 font-medium text-white"
            >
              Thanks for your interest! Newsletter signup is
              currently a demo.
            </p>
          ) : (
            <form
              onSubmit={handleSubscribe}
              className="mx-auto mt-7 flex max-w-xl flex-col gap-3 sm:flex-row"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email address"
                aria-label="Email address"
                className="min-w-0 flex-1 rounded-xl border border-white/20 bg-white px-4 py-3.5 text-gray-900 outline-none focus:ring-4 focus:ring-white/20"
              />

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gray-950 px-6 py-3.5 font-semibold text-white transition hover:bg-gray-900"
              >
                Subscribe
                <ArrowRight size={18} />
              </button>
            </form>
          )}

          <p className="mt-4 text-xs text-teal-100">
            No spam. Just travel inspiration.
          </p>
        </div>
      </section>
    </main>
  );
}
