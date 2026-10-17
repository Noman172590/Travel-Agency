
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  Clock,
  ArrowUpRight,
  Newspaper,
  Search,
} from "lucide-react";

const newsData = [
  {
    id: 1,
    category: "Destinations",
    title: "Cox's Bazar: Your Guide to an Unforgettable Beach Trip",
    description:
      "Discover the sandy beach, stunning sunsets, local seafood, and essential tips for planning your next Cox's Bazar holiday.",
    image:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1000&q=85",
    date: "October 15, 2026",
    readTime: "5 min read",
    featured: true,
  },
  {
    id: 2,
    category: "Travel Tips",
    title: "7 Things to Pack Before Your Next Bangladesh Adventure",
    description:
      "From comfortable shoes to sun protection, here are some useful essentials to make your journey more comfortable.",
    image:
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=900&q=80",
    date: "October 12, 2026",
    readTime: "4 min read",
  },
  {
    id: 3,
    category: "Destinations",
    title: "Sreemangal: Explore the Beauty of Green Tea Gardens",
    description:
      "Plan a peaceful escape surrounded by tea estates, green landscapes, and the natural beauty of northeastern Bangladesh.",
    image:
      "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=900&q=80",
    date: "October 10, 2026",
    readTime: "4 min read",
  },
  {
    id: 4,
    category: "Nature",
    title: "Discover the Mangrove Forests of the Sundarbans",
    description:
      "Learn about the world's largest mangrove forest and prepare for a responsible wildlife and nature experience.",
    image:
      "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=900&q=80",
    date: "October 8, 2026",
    readTime: "6 min read",
  },
  {
    id: 5,
    category: "Travel Tips",
    title: "How to Plan a Budget-Friendly Trip in Bangladesh",
    description:
      "Simple ways to plan transport, accommodation, meals, and activities while keeping your travel expenses under control.",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80",
    date: "October 5, 2026",
    readTime: "5 min read",
  },
  {
    id: 6,
    category: "Destinations",
    title: "Saint Martin: Tips for Planning an Island Getaway",
    description:
      "Explore island scenery and learn why checking current transport, weather, and travel restrictions is important before departure.",
    image:
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=900&q=80",
    date: "October 2, 2026",
    readTime: "4 min read",
  },
];

const categories = [
  "All News",
  "Destinations",
  "Travel Tips",
  "Nature",
];

function NewsCard({ news }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative overflow-hidden">
        <img
          src={news.image}
          alt={news.title}
          loading="lazy"
          className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-teal-700 shadow-sm">
          {news.category}
        </span>
      </div>

      <div className="p-5">
        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <CalendarDays size={14} />
            {news.date}
          </span>

          <span className="flex items-center gap-1.5">
            <Clock size={14} />
            {news.readTime}
          </span>
        </div>

        <h2 className="mt-4 text-xl font-bold leading-7 text-slate-900 transition group-hover:text-teal-700">
          {news.title}
        </h2>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
          {news.description}
        </p>

        <Link
          to={`/news/${news.id}`}
          className="mt-5 inline-flex items-center gap-2 font-semibold text-teal-700 hover:text-teal-900"
        >
          Read article
          <ArrowUpRight size={17} />
        </Link>
      </div>
    </article>
  );
}

export default function News() {
  const [activeCategory, setActiveCategory] = useState("All News");
  const [search, setSearch] = useState("");

  const filteredNews = newsData.filter((news) => {
    const matchesCategory =
      activeCategory === "All News" ||
      news.category === activeCategory;

    const matchesSearch =
      `${news.title} ${news.description} ${news.category}`
        .toLowerCase()
        .includes(search.toLowerCase().trim());

    return matchesCategory && matchesSearch;
  });

  const featuredNews = newsData.find((news) => news.featured);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Page heading */}
      <section className="bg-gradient-to-br from-teal-800 via-teal-700 to-slate-900 px-5 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center gap-2 text-sm font-semibold text-teal-200">
            <Newspaper size={19} />
            TRAVELBD JOURNAL
          </div>

          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl">
            Travel News &{" "}
            <span className="text-teal-300">Inspiration</span>
          </h1>

          <p className="mt-5 max-w-2xl leading-7 text-teal-50/90">
            Discover travel guides, destination highlights, useful
            travel tips, and inspiration for exploring beautiful Bangladesh.
          </p>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              document
                .getElementById("news-list")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="mt-8 flex max-w-xl items-center gap-3 rounded-2xl bg-white p-2"
          >
            <Search className="ml-3 shrink-0 text-slate-400" size={21} />

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search travel articles..."
              className="min-w-0 flex-1 py-3 text-slate-800 outline-none"
              aria-label="Search travel articles"
            />

            <button
              type="submit"
              className="rounded-xl bg-teal-600 px-5 py-3 font-semibold text-white hover:bg-teal-700"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Featured news */}
      {featuredNews && (
        <section className="mx-auto max-w-7xl px-5 pt-12">
          <div className="grid overflow-hidden rounded-3xl bg-white shadow-sm md:grid-cols-2">
            <div className="min-h-64 overflow-hidden">
              <img
                src={featuredNews.image}
                alt={featuredNews.title}
                className="h-full min-h-64 w-full object-cover"
              />
            </div>

            <div className="flex flex-col justify-center p-6 sm:p-10">
              <span className="w-fit rounded-full bg-teal-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-teal-700">
                Featured article
              </span>

              <h2 className="mt-5 text-2xl font-extrabold leading-tight sm:text-3xl">
                {featuredNews.title}
              </h2>

              <p className="mt-4 leading-7 text-slate-500">
                {featuredNews.description}
              </p>

              <Link
                to={`/news/${featuredNews.id}`}
                className="mt-6 inline-flex w-fit items-center gap-2 rounded-xl bg-teal-600 px-5 py-3 font-semibold text-white hover:bg-teal-700"
              >
                Read featured story
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* News list */}
      <section
        id="news-list"
        className="mx-auto max-w-7xl px-5 py-14 sm:py-16"
      >
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="font-semibold uppercase tracking-widest text-teal-600">
              Explore & Discover
            </p>

            <h2 className="mt-2 text-3xl font-extrabold">
              Latest Articles
            </h2>
          </div>

          <p className="text-sm text-slate-500">
            {filteredNews.length} articles found
          </p>
        </div>

        {/* Category filter */}
        <div className="mt-7 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                activeCategory === category
                  ? "bg-teal-600 text-white shadow-md shadow-teal-600/20"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-teal-300 hover:text-teal-700"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Cards */}
        {filteredNews.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredNews.map((news) => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-slate-100 bg-white px-5 py-16 text-center">
            <Search className="mx-auto text-slate-300" size={38} />

            <h3 className="mt-4 text-xl font-bold">
              No articles found
            </h3>

            <p className="mt-2 text-slate-500">
              Try another keyword or select a different category.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setActiveCategory("All News");
              }}
              className="mt-5 font-semibold text-teal-700 hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      {/* Call to action */}
      <section className="mx-auto max-w-7xl px-5 pb-16">
        <div className="rounded-3xl bg-teal-50 px-6 py-10 text-center sm:px-12">
          <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
            Ready to explore Bangladesh?
          </h2>

          <p className="mx-auto mt-3 max-w-xl leading-7 text-slate-600">
            Find your favorite destination and start planning your next trip.
          </p>

          <Link
            to="/search"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-teal-600 px-6 py-3 font-bold text-white hover:bg-teal-700"
          >
            Explore destinations
            <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
