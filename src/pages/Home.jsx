import Hero from "../components/Hero";
import Destinations from "../components/Destinations";

export default function Home() {
  return (
    <>
      <Hero />
      <Destinations />

      <section className="mx-auto max-w-7xl px-5 pb-20">
        <div className="rounded-3xl bg-teal-700 px-6 py-12 text-center text-white sm:px-12">
          <h2 className="text-3xl font-extrabold">
            Ready for your next adventure?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-teal-100">
            Discover amazing places across Bangladesh and plan
            a memorable trip.
          </p>
          <a
            href="/booking"
            className="mt-6 inline-block rounded-full bg-white px-7 py-3 font-bold text-teal-800 hover:bg-teal-50"
          >
            Start Your Journey
          </a>
        </div>
      </section>
    </>
  );
}