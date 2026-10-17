
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  CalendarDays,
  Users,
  MapPin,
  Plane,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";

const places = [
  "Cox's Bazar",
  "Sreemangal",
  "Sundarbans",
  "Saint Martin",
];

export default function Booking() {
  const [params] = useSearchParams();

  const initialDestination = places.includes(params.get("destination"))
    ? params.get("destination")
    : "Cox's Bazar";

  const [destination, setDestination] = useState(initialDestination);
  const [date, setDate] = useState(null);
  const [travelers, setTravelers] = useState(2);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    if (!date || date < new Date(new Date().setHours(0, 0, 0, 0))) {
      return;
    }

    setSubmitted(true);
  }

  function resetConfirmation() {
    setSubmitted(false);
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-3xl bg-white shadow-xl md:grid-cols-[0.85fr_1.15fr]">

        {/* Left banner */}
        <div className="relative flex min-h-64 flex-col justify-between overflow-hidden bg-teal-800 p-7 text-white sm:p-10">
          <div className="absolute inset-0 bg-gradient-to-br from-teal-700 via-teal-800 to-slate-950" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm">
              <Plane size={16} />
              Your next adventure
            </div>

            <h1 className="mt-8 text-3xl font-extrabold leading-tight sm:text-4xl">
              Your journey
              <br />
              starts here.
            </h1>

            <p className="mt-4 max-w-sm leading-7 text-teal-100">
              Choose your destination, pick your travel date,
              and get ready to explore beautiful Bangladesh.
            </p>
          </div>

          <div className="relative mt-8 rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
            <p className="text-sm text-teal-100">Planning a trip to</p>
            <h2 className="mt-1 text-2xl font-bold">{destination}</h2>
            <p className="mt-2 text-sm text-teal-100">
              {date
                ? date.toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : "Select your preferred travel date"}
            </p>
          </div>
        </div>

        {/* Booking form */}
        <div className="p-6 sm:p-10 lg:p-12">
          <p className="text-sm font-bold uppercase tracking-widest text-teal-600">
            Travel booking
          </p>

          <h2 className="mt-2 text-3xl font-extrabold text-slate-900">
            Plan your trip
          </h2>

          <p className="mt-3 leading-6 text-slate-500">
            Fill in your travel details to get started.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">

            {/* Destination */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Destination
              </label>

              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-teal-500 focus-within:ring-4 focus-within:ring-teal-50">
                <MapPin size={20} className="shrink-0 text-teal-600" />

                <select
                  value={destination}
                  onChange={(e) => {
                    setDestination(e.target.value);
                    resetConfirmation();
                  }}
                  className="w-full cursor-pointer appearance-none bg-transparent py-4 text-slate-800 outline-none"
                >
                  {places.map((place) => (
                    <option key={place} value={place}>
                      {place}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={18}
                  className="shrink-0 text-slate-400"
                />
              </div>
            </div>

            {/* Calendar date picker */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Travel date
              </label>

              <div className="relative flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-teal-500 focus-within:ring-4 focus-within:ring-teal-50">
                <CalendarDays
                  size={20}
                  className="shrink-0 text-teal-600"
                />

                <DatePicker
                  selected={date}
                  onChange={(selectedDate) => {
                    setDate(selectedDate);
                    resetConfirmation();
                  }}
                  minDate={new Date()}
                  dateFormat="dd MMMM yyyy"
                  placeholderText="Choose your travel date"
                  required
                  showPopperArrow={false}
                  popperPlacement="bottom-start"
                  calendarClassName="travel-calendar"
                  wrapperClassName="w-full"
                  className="w-full cursor-pointer bg-transparent py-4 text-slate-800 outline-none placeholder:text-slate-400"
                />
              </div>

              <p className="mt-2 text-xs text-slate-400">
                Select a date from today onwards.
              </p>
            </div>

            {/* Travelers */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Number of travelers
              </label>

              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-teal-500 focus-within:ring-4 focus-within:ring-teal-50">
                <Users size={20} className="shrink-0 text-teal-600" />

                <select
                  value={travelers}
                  onChange={(e) => {
                    setTravelers(Number(e.target.value));
                    resetConfirmation();
                  }}
                  className="w-full cursor-pointer appearance-none bg-transparent py-4 text-slate-800 outline-none"
                >
                  {Array.from({ length: 8 }, (_, index) => index + 1).map(
                    (count) => (
                      <option key={count} value={count}>
                        {count} {count === 1 ? "traveler" : "travelers"}
                      </option>
                    )
                  )}
                </select>

                <ChevronDown
                  size={18}
                  className="shrink-0 text-slate-400"
                />
              </div>
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-teal-600 px-5 py-4 font-bold text-white shadow-lg shadow-teal-600/20 transition hover:-translate-y-0.5 hover:bg-teal-700"
            >
              Continue Booking
              <Plane size={18} />
            </button>
          </form>

          {submitted && (
            <div
              role="status"
              className="mt-6 rounded-2xl border border-teal-100 bg-teal-50 p-5"
            >
              <div className="flex items-center gap-2 text-teal-800">
                <CheckCircle2 size={22} />
                <h3 className="font-bold">Your trip details</h3>
              </div>

              <p className="mt-3 text-sm text-slate-700">
                Destination: <strong>{destination}</strong>
              </p>

              <p className="mt-2 text-sm text-slate-700">
                Date:{" "}
                <strong>
                  {date?.toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </strong>
              </p>

              <p className="mt-2 text-sm text-slate-700">
                Travelers: <strong>{travelers}</strong>
              </p>

              <p className="mt-3 text-xs leading-5 text-slate-500">
                Demo only. No reservation has been created yet.
                Connect a backend to save and confirm bookings.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
