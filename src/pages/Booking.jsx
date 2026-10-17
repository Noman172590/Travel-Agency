import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CalendarDays, Users, MapPin } from "lucide-react";

export default function Booking() {
  const [params] = useSearchParams();
  const [destination, setDestination] = useState(
    params.get("destination") || "Cox's Bazar"
  );
  const [date, setDate] = useState("");
  const [travelers, setTravelers] = useState("2");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen px-5 py-14">
      <div className="mx-auto max-w-2xl rounded-3xl bg-white p-6 shadow-lg sm:p-10">
        <p className="font-semibold text-teal-600">YOUR NEXT ADVENTURE</p>
        <h1 className="mt-2 text-3xl font-extrabold">Book your trip</h1>
        <p className="mt-3 text-slate-500">
          Choose your destination and travel details.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block font-medium">Destination</label>
            <div className="flex items-center gap-3 rounded-xl border p-3">
              <MapPin className="text-teal-600" size={20} />
              <select
                value={destination}
                onChange={(e) => {
                  setDestination(e.target.value);
                  setSubmitted(false);
                }}
                className="w-full bg-transparent outline-none"
              >
                {[
                  "Cox's Bazar",
                  "Sreemangal",
                  "Sundarbans",
                  "Saint Martin",
                ].map((place) => (
                  <option key={place} value={place}>
                    {place}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-2 block font-medium">Travel date</label>
            <div className="flex items-center gap-3 rounded-xl border p-3">
              <CalendarDays className="text-teal-600" size={20} />
              <input
                type="date"
                required
                min={new Date().toLocaleDateString("en-CA")}
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                  setSubmitted(false);
                }}
                className="w-full outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block font-medium">Travelers</label>
            <div className="flex items-center gap-3 rounded-xl border p-3">
              <Users className="text-teal-600" size={20} />
              <select
                value={travelers}
                onChange={(e) => {
                  setTravelers(e.target.value);
                  setSubmitted(false);
                }}
                className="w-full bg-transparent outline-none"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((count) => (
                  <option key={count} value={count}>
                    {count} {count === 1 ? "traveler" : "travelers"}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-teal-600 py-3.5 font-bold text-white hover:bg-teal-700"
          >
            Continue Booking
          </button>
        </form>

        {submitted && (
          <div className="mt-5 rounded-xl bg-teal-50 p-4 text-teal-800">
            <h2 className="font-bold">Booking details ready!</h2>
            <p className="mt-1 text-sm">
              Destination: {destination}
            </p>
            <p className="text-sm">Date: {date}</p>
            <p className="text-sm">Travelers: {travelers}</p>
            <p className="mt-2 text-sm">
              Demo only — no reservation has been made. Connect a backend
              to save bookings and confirm availability.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}