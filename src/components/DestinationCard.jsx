import { Link } from "react-router-dom";
import { ArrowUpRight, MapPin } from "lucide-react";

export default function DestinationCard({ destination }) {
  const { name, image, description, price, duration } = destination;

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-teal-700 shadow">
          {duration}
        </span>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <MapPin size={16} className="text-teal-600" />
          Bangladesh
        </div>

        <h3 className="mt-2 text-xl font-bold">{name}</h3>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
          {description}
        </p>

        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
          <div>
            <p className="text-xs text-slate-500">Starting from</p>
            <p className="text-lg font-extrabold text-teal-700">
              ৳{price}
              <span className="text-xs font-normal text-slate-500">
                {" "} / person
              </span>
            </p>
          </div>

          <Link
            to={`/booking?destination=${encodeURIComponent(name)}`}
            className="rounded-xl bg-teal-50 p-3 text-teal-700 transition hover:bg-teal-600 hover:text-white"
            aria-label={`Book a trip to ${name}`}
          >
            <ArrowUpRight size={20} />
          </Link>
        </div>
      </div>
    </article>
  );
}