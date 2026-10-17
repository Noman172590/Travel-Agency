import { Link } from "react-router-dom";
import DestinationCard from "./DestinationCard";

export const destinations = [
  {
    name: "Cox's Bazar",
    image:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=900&q=80",
    description:
      "Enjoy the sea beach, local seafood, and beautiful sunsets.",
    price: 2500,
    duration: "2 Days / 1 Night",
  },
  {
    name: "Sreemangal",
    image:
      "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=900&q=80",
    description:
      "Explore green landscapes, tea gardens, and peaceful nature.",
    price: 1800,
    duration: "2 Days / 1 Night",
  },
  {
    name: "Sundarbans",
    image:
      "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=900&q=80",
    description:
      "Discover mangrove forests, waterways, and wildlife adventures.",
    price: 4500,
    duration: "3 Days / 2 Nights",
  },
  {
    name: "Saint Martin",
    image:
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=900&q=80",
    description:
      "Experience island scenery, blue waters, and relaxing beach time.",
    price: 5500,
    duration: "3 Days / 2 Nights",
  },
];

export default function Destinations() {
  return (
    <section id="destinations" className="mx-auto max-w-7xl px-5 py-20">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-semibold uppercase tracking-widest text-teal-600">
            Explore Bangladesh
          </p>
          <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
            Popular Destinations
          </h2>
          <p className="mt-3 max-w-xl text-slate-500">
            Find your next adventure, from sandy beaches to lush green forests.
          </p>
        </div>

        <Link
          to="/search"
          className="font-semibold text-teal-700 hover:text-teal-900"
        >
          View all destinations →
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {destinations.map((destination) => (
          <DestinationCard
            key={destination.name}
            destination={destination}
          />
        ))}
      </div>
    </section>
  );
}