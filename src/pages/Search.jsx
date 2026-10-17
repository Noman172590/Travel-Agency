import { useSearchParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import DestinationCard from "../components/DestinationCard";
import { destinations } from "../components/Destinations";

export default function SearchPage() {
  const [params] = useSearchParams();
  const query = params.get("q") || "";

  const results = destinations.filter((destination) =>
    `${destination.name} ${destination.description}`
      .toLowerCase()
      .includes(query.trim().toLowerCase())
  );

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-5 py-12">
      <h1 className="text-3xl font-extrabold">Find your destination</h1>

      <div className="mt-6 max-w-2xl">
        <SearchBar initialValue={query} />
      </div>

      <p className="my-8 text-slate-500">
        {query
          ? `${results.length} result(s) for "${query}"`
          : "Explore all available destinations."}
      </p>

      {results.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {results.map((destination) => (
            <DestinationCard
              key={destination.name}
              destination={destination}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl bg-white p-10 text-center">
          <h2 className="text-xl font-bold">No destinations found</h2>
          <p className="mt-2 text-slate-500">
            Try searching for Cox's Bazar, Sreemangal, or Sundarbans.
          </p>
        </div>
      )}
    </main>
  );
}