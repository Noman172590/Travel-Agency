import { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SearchBar({ initialValue = "" }) {
  const [query, setQuery] = useState(initialValue);
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm"
    >
      <Search className="ml-2 shrink-0 text-teal-600" size={21} />

      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Where do you want to go?"
        className="min-w-0 flex-1 px-2 py-3 outline-none"
        aria-label="Search destinations"
      />

      <button
        type="submit"
        className="rounded-xl bg-teal-600 px-5 py-3 font-semibold text-white hover:bg-teal-700"
      >
        Search
      </button>
    </form>
  );
}