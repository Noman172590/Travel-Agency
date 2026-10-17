import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-slate-900">
      <img
        src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=2000&q=85"
        alt="Beautiful ocean waves"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />

      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950/85 via-slate-900/55 to-slate-900/10" />

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-24 md:min-h-[560px] md:grid-cols-2 md:py-28">
        <div className="max-w-2xl text-white">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-sm backdrop-blur">
            <MapPin size={16} />
            Explore beautiful Bangladesh
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
            Discover the beauty of{" "}
            <span className="text-teal-300">Cox's Bazar</span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-slate-200 sm:text-lg">
            Cox's Bazar is a coastal city in southeastern Bangladesh,
            famous for its long natural sandy beach, beautiful sunsets,
            and unforgettable seaside experiences.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/search?q=Cox's%20Bazar"
              className="inline-flex items-center gap-2 rounded-full bg-teal-500 px-6 py-3.5 font-semibold text-white hover:bg-teal-400"
            >
              Explore Destination <ArrowRight size={18} />
            </Link>

            <Link
              to="/booking"
              className="rounded-full border border-white/60 px-6 py-3.5 font-semibold text-white hover:bg-white/10"
            >
              Book a Trip
            </Link>
          </div>
        </div>

        <div className="hidden md:block">
          <div className="ml-auto max-w-sm rounded-3xl border border-white/30 bg-white/15 p-5 text-white shadow-2xl backdrop-blur-md">
            <img
              src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=800&q=80"
              alt="Ocean view at a travel destination"
              className="h-48 w-full rounded-2xl object-cover"
            />
            <p className="mt-4 text-sm text-teal-200">FEATURED DESTINATION</p>
            <h2 className="mt-1 text-2xl font-bold">Cox's Bazar</h2>
            <p className="mt-2 text-sm leading-6 text-slate-100">
              Enjoy sea views, local food, peaceful mornings, and
              memorable beach sunsets.
            </p>
            <Link
              to="/booking"
              className="mt-4 inline-flex items-center gap-2 font-semibold hover:text-teal-200"
            >
              Plan your trip <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}