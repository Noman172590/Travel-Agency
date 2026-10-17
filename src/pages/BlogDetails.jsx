
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, Clock3 } from "lucide-react";

const blogs = [
  {
    id: 1,
    title: "Cox's Bazar Travel Guide: Everything You Need to Know",
    excerpt:
      "Discover the world's longest natural sea beach, explore local food, enjoy breathtaking sunsets, and plan the perfect coastal getaway.",
    category: "Destinations",
    author: "NihoniumBD Team",
    date: "Oct 12, 2026",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1400&q=85",
    content: [
      "Cox's Bazar is one of Bangladesh's most popular coastal destinations. Its long sandy beach, ocean views, and vibrant local culture make it a memorable place to explore.",
      "Spend time walking along the beach, enjoy the sunset, sample local seafood, and explore nearby attractions. Plan your transport and accommodation ahead of your trip, especially during holidays.",
      "Pack comfortable clothing, sun protection, and any essentials you need. Respect the local environment, follow beach safety advice, and avoid leaving waste behind.",
    ],
  },
  {
    id: 2,
    title: "A Peaceful Weekend Escape to Sreemangal",
    excerpt:
      "Walk through endless tea gardens, discover green landscapes, and enjoy a relaxing weekend surrounded by nature.",
    category: "Nature",
    author: "Noman",
    date: "Oct 08, 2026",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1000&q=80",
    content: [
      "Sreemangal is known for its green tea gardens, peaceful landscapes, and refreshing atmosphere. It is a wonderful choice for travelers looking for a relaxing break.",
      "Explore tea estates, enjoy the scenery, and plan time to visit nearby natural attractions. Comfortable shoes and a camera can make your trip even better.",
      "Before traveling, check transport schedules and local conditions so you can make the most of your weekend.",
    ],
  },
  {
    id: 3,
    title: "10 Essential Tips for First-Time Travelers",
    excerpt:
      "Make your next adventure easier with smart packing, budget planning, safety tips, and a little preparation.",
    category: "Travel Tips",
    author: "NihoniumBD Team",
    date: "Oct 05, 2026",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=80",
    content: [
      "A successful trip begins with a little preparation. Research your destination, make a realistic budget, and confirm your accommodation and transportation.",
      "Pack only what you need, keep important documents secure, and save useful contact information. Carry essential medication and a small travel kit if needed.",
      "Stay aware of your surroundings, respect local customs, and leave room in your itinerary for unexpected discoveries.",
    ],
  },
  {
    id: 4,
    title: "Exploring the Mangrove Beauty of Sundarbans",
    excerpt:
      "Learn about the world's largest mangrove forest, its wildlife, river journeys, and responsible travel experiences.",
    category: "Adventure",
    author: "NihoniumBD Team",
    date: "Sep 28, 2026",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1000&q=80",
    content: [
      "The Sundarbans is a remarkable mangrove ecosystem with winding waterways, rich biodiversity, and unique natural scenery.",
      "Choose an authorized tour operator, follow your guide's instructions, and observe wildlife from a safe distance. The forest is a sensitive habitat that deserves careful protection.",
      "Responsible travel helps protect this extraordinary environment for future generations.",
    ],
  },
  {
    id: 5,
    title: "How to Plan a Memorable Trip on a Small Budget",
    excerpt:
      "Explore practical ways to save on transportation, accommodation, meals, and activities without missing the fun.",
    category: "Travel Tips",
    author: "Noman",
    date: "Sep 22, 2026",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1000&q=80",
    content: [
      "Budget travel starts with setting a spending limit and choosing a destination that fits it. Compare transportation options and book accommodation that suits your needs.",
      "Try local food, explore free attractions, and keep some money aside for unexpected costs. Traveling outside peak periods may also give you more options.",
      "A memorable journey is about the experiences you have, not how much you spend.",
    ],
  },
  {
    id: 6,
    title: "Saint Martin's Island: A Tropical Escape",
    excerpt:
      "Plan an island getaway with blue waters, coastal views, fresh seafood, and unforgettable sunset moments.",
    category: "Destinations",
    author: "NihoniumBD Team",
    date: "Sep 15, 2026",
    readTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1000&q=80",
    content: [
      "Saint Martin's Island is known for its coastal scenery and distinctive island atmosphere. Travel rules and access arrangements can vary by season.",
      "Check current official travel guidance before planning your journey, and choose accommodation and transport arrangements in advance.",
      "Help preserve the island by avoiding litter, respecting local communities, and following environmental guidance.",
    ],
  },
];

export default function BlogDetails() {
  const { id } = useParams();
  const blog = blogs.find((item) => item.id === Number(id));

  if (!blog) {
    return (
      <main className="min-h-[60vh] px-5 py-20 text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          Blog not found
        </h1>
        <p className="mt-3 text-gray-600">
          Sorry, this travel story does not exist.
        </p>
        <Link
          to="/blog"
          className="mt-6 inline-flex rounded-lg bg-teal-700 px-5 py-3 font-semibold text-white"
        >
          Back to Blog
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <Link
          to="/blog"
          className="mb-8 inline-flex items-center gap-2 font-semibold text-teal-700 hover:text-teal-900"
        >
          <ArrowLeft size={18} />
          Back to all stories
        </Link>

        <img
          src={blog.image}
          alt={blog.title}
          className="h-64 w-full rounded-3xl object-cover sm:h-96"
        />

        <div className="mt-8">
          <span className="rounded-full bg-teal-100 px-4 py-2 text-sm font-semibold text-teal-800">
            {blog.category}
          </span>

          <h1 className="mt-5 text-3xl font-extrabold leading-tight text-gray-900 sm:text-5xl">
            {blog.title}
          </h1>

          <p className="mt-5 text-lg leading-8 text-gray-600">
            {blog.excerpt}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-5 border-b border-gray-200 pb-6 text-sm text-gray-500">
            <span className="font-semibold text-gray-800">
              {blog.author}
            </span>
            <span className="flex items-center gap-2">
              <CalendarDays size={16} />
              {blog.date}
            </span>
            <span className="flex items-center gap-2">
              <Clock3 size={16} />
              {blog.readTime}
            </span>
          </div>

          <div className="mt-8 space-y-6 text-base leading-8 text-gray-700 sm:text-lg">
            {blog.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-12 rounded-2xl bg-teal-50 p-6">
            <h2 className="text-xl font-bold text-gray-900">
              Ready for your next adventure?
            </h2>
            <p className="mt-2 text-gray-600">
              Explore more stories and find inspiration for your next trip.
            </p>
            <Link
              to="/blog"
              className="mt-4 inline-flex rounded-lg bg-teal-700 px-5 py-3 font-semibold text-white hover:bg-teal-800"
            >
              Explore More Stories
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
