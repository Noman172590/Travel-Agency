import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, Clock, Newspaper } from "lucide-react";

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
    content: [
      "Cox's Bazar is one of Bangladesh's most popular seaside destinations. Its long sandy beach, beautiful sunsets, and relaxing coastal atmosphere make it an excellent choice for a holiday.",
      "Visitors can enjoy a walk along the beach, taste fresh seafood at local restaurants, and explore nearby attractions. Plan your activities according to the weather and the time available for your trip.",
      "Before travelling, confirm your accommodation and transportation. Bring comfortable clothing, sunscreen, and any essentials you may need. Follow beach safety instructions and keep the coastline clean.",
    ],
  },
  {
    id: 2,
    category: "Travel Tips",
    title: "7 Things to Pack Before Your Next Bangladesh Adventure",
    description:
      "From comfortable shoes to sun protection, here are some useful essentials to make your journey more comfortable.",
    image:
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1000&q=85",
    date: "October 12, 2026",
    readTime: "4 min read",
    content: [
      "A well-prepared bag can make your Bangladesh trip more comfortable. Start with lightweight clothes suitable for your destination and the expected weather.",
      "Pack comfortable walking shoes, personal toiletries, sunscreen, a reusable water bottle, a phone charger, and a basic first-aid kit. Keep important documents and emergency contacts accessible.",
      "Check the weather forecast and your transport arrangements before leaving. Packing only what you need can make moving between destinations much easier.",
    ],
  },
  {
    id: 3,
    category: "Destinations",
    title: "Sreemangal: Explore the Beauty of Green Tea Gardens",
    description:
      "Plan a peaceful escape surrounded by tea estates, green landscapes, and the natural beauty of northeastern Bangladesh.",
    image:
      "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1000&q=85",
    date: "October 10, 2026",
    readTime: "4 min read",
    content: [
      "Sreemangal is known for its green tea gardens, peaceful scenery, and refreshing natural surroundings. It is a wonderful option for travellers looking for a break from busy city life.",
      "During your visit, explore tea estates, enjoy the surrounding countryside, and learn about the region's tea-growing heritage. Respect local communities and follow guidance when visiting private estates.",
      "Plan your transport and accommodation in advance, especially during busy travel periods. Leave enough time to enjoy the scenery without rushing between attractions.",
    ],
  },
  {
    id: 4,
    category: "Nature",
    title: "Discover the Mangrove Forests of the Sundarbans",
    description:
      "Learn about the world's largest mangrove forest and prepare for a responsible wildlife and nature experience.",
    image:
      "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1000&q=85",
    date: "October 8, 2026",
    readTime: "6 min read",
    content: [
      "The Sundarbans is a remarkable mangrove ecosystem in the Bengal delta. Its waterways, forests, and wildlife make it an important natural heritage destination.",
      "Visitors generally explore through organised trips and approved routes. Choose responsible operators, listen to your guide, and follow all wildlife safety rules.",
      "Prepare for changing weather and outdoor conditions. Avoid disturbing animals, leave no litter, and respect restrictions designed to protect this sensitive ecosystem.",
    ],
  },
  {
    id: 5,
    category: "Travel Tips",
    title: "How to Plan a Budget-Friendly Trip in Bangladesh",
    description:
      "Simple ways to plan transport, accommodation, meals, and activities while keeping your travel expenses under control.",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=85",
    date: "October 5, 2026",
    readTime: "5 min read",
    content: [
      "A memorable trip does not have to be expensive. Begin by setting a budget that covers transportation, accommodation, meals, activities, and an emergency reserve.",
      "Compare transport options and book accommodation that fits both your budget and your travel plans. Local food and free outdoor attractions can help keep costs manageable.",
      "Keep track of your expenses during the trip and confirm prices before making bookings. A little planning can help you enjoy more while spending less.",
    ],
  },
  {
    id: 6,
    category: "Destinations",
    title: "Saint Martin: Tips for Planning an Island Getaway",
    description:
      "Explore island scenery and learn why checking current transport, weather, and travel restrictions is important before departure.",
    image:
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1000&q=85",
    date: "October 2, 2026",
    readTime: "4 min read",
    content: [
      "Saint Martin is known for its island scenery and coastal atmosphere. A visit requires careful planning because transport options and travel conditions can change.",
      "Before booking, check the latest official travel guidance, boat schedules, weather conditions, and any visitor restrictions. Do not assume that transport operates throughout the year.",
      "Help preserve the island by reducing plastic waste, respecting local communities, and keeping beaches clean. Plan your return journey before departure.",
    ],
  },
];

export default function NewsDetails() {
  const { id } = useParams();
  const news = newsData.find((item) => item.id === Number(id));

  if (!news) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-5 text-center">
        <Newspaper size={48} className="text-slate-300" />
        <h1 className="mt-5 text-3xl font-extrabold text-slate-900">
          Article not found
        </h1>
        <p className="mt-3 text-slate-500">
          Sorry, this news article does not exist.
        </p>
        <Link
          to="/news"
          className="mt-6 rounded-xl bg-teal-600 px-5 py-3 font-semibold text-white hover:bg-teal-700"
        >
          Back to News
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 pb-16">
      <div className="mx-auto max-w-4xl px-5 pt-8">
        <Link
          to="/news"
          className="inline-flex items-center gap-2 font-semibold text-teal-700 hover:text-teal-900"
        >
          <ArrowLeft size={18} />
          Back to News
        </Link>

        <article className="mt-6 overflow-hidden rounded-3xl bg-white shadow-sm">
          <img
            src={news.image}
            alt={news.title}
            className="h-64 w-full object-cover sm:h-96"
          />

          <div className="p-6 sm:p-10">
            <span className="inline-block rounded-full bg-teal-50 px-3 py-1.5 text-sm font-bold text-teal-700">
              {news.category}
            </span>

            <h1 className="mt-5 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
              {news.title}
            </h1>

            <div className="mt-5 flex flex-wrap gap-5 text-sm text-slate-500">
              <span className="flex items-center gap-2">
                <CalendarDays size={17} />
                {news.date}
              </span>
              <span className="flex items-center gap-2">
                <Clock size={17} />
                {news.readTime}
              </span>
            </div>

            <p className="mt-7 text-lg leading-8 text-slate-600">
              {news.description}
            </p>

            <div className="mt-8 space-y-5 text-base leading-8 text-slate-700">
              {news.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-10 border-t border-slate-100 pt-6">
              <Link
                to="/news"
                className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-3 font-semibold text-white hover:bg-teal-700"
              >
                <ArrowLeft size={18} />
                Explore More News
              </Link>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}