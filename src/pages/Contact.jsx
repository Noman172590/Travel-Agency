import { useState } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import {
  MapPin,
  Mail,
  Phone,
  Send,
  MessageCircle,
  LoaderCircle,
  CheckCircle,
  AlertCircle,
  LogIn,
} from "lucide-react";

const EMAIL_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAIL_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAIL_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const Contact = () => {
  const navigate = useNavigate();

  // Check whether the user is logged in.
  const [user] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  });

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    destination: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (status.message) {
      setStatus({ type: "", message: "" });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Require login before sending a message.
    if (!user) {
      setStatus({
        type: "error",
        message: "Please log in before sending a message.",
      });
      return;
    }

    if (!EMAIL_SERVICE_ID || !EMAIL_TEMPLATE_ID || !EMAIL_PUBLIC_KEY) {
      setStatus({
        type: "error",
        message:
          "Email service is not configured. Please check your EmailJS environment variables.",
      });
      return;
    }

    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      await emailjs.send(
        EMAIL_SERVICE_ID,
        EMAIL_TEMPLATE_ID,
        {
          title: "New Contact Message - NihoniumBD",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          destination: formData.destination || "Not specified",
          message: formData.message,
        },
        {
          publicKey: EMAIL_PUBLIC_KEY,
        }
      );

      setStatus({
        type: "success",
        message:
          "Your message has been sent successfully! We will get back to you soon.",
      });

      setFormData({
        name: user?.name || "",
        email: user?.email || "",
        phone: "",
        destination: "",
        message: "",
      });
    } catch (error) {
      console.error("EmailJS error:", error);

      setStatus({
        type: "error",
        message:
          "Sorry, your message could not be sent. Please check your EmailJS settings and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Login-required screen.
  if (!user) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4 py-16">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-lg">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <LogIn size={30} />
          </div>

          <h1 className="mb-3 text-2xl font-bold text-slate-900">
            Login Required
          </h1>

          <p className="mb-6 leading-7 text-slate-600">
            Please log in to your NihoniumBD account before contacting us.
            We look forward to helping you plan your next trip.
          </p>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            <LogIn size={18} />
            Login to Continue
          </button>

          <p className="mt-4 text-sm text-slate-500">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="font-semibold text-blue-600 hover:underline"
            >
              Register here
            </button>
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-slate-50">
      {/* Hero section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-950 via-blue-800 to-cyan-700 px-4 py-16 text-white sm:py-20">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 font-semibold uppercase tracking-[0.2em] text-cyan-200">
            NihoniumBD
          </p>

          <h1 className="mb-4 text-4xl font-extrabold sm:text-5xl">
            Contact Us
          </h1>

          <p className="max-w-2xl text-base leading-7 text-blue-100 sm:text-lg">
            Have a question about your next adventure? Send us a message.
            Our team is ready to help you plan your perfect journey.
          </p>
        </div>

        <div className="pointer-events-none absolute -right-12 -top-16 h-64 w-64 rounded-full border-[40px] border-white/10" />
        <div className="pointer-events-none absolute -bottom-28 right-1/4 h-64 w-64 rounded-full bg-cyan-400/10 blur-2xl" />
      </section>

      {/* Contact section */}
      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-5">
          {/* Contact information */}
          <aside className="space-y-6 lg:col-span-2">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Get in Touch
              </h2>

              <p className="mt-3 leading-7 text-slate-600">
                Tell us what you need. Whether you have questions about a
                destination, a booking, or a travel plan, we are happy to help.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
                  <MapPin size={23} />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900">Our Location</h3>
                  <p className="mt-1 text-slate-600">
                    Dhaka, Bangladesh
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-700">
                  <Mail size={23} />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900">
                    Email Address
                  </h3>
                  <a
                    href="mailto:rayhanarju16@gmail.com"
                    className="mt-1 block break-all text-slate-600 transition hover:text-blue-600"
                  >
                    rayhanarju16@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700">
                  <Phone size={23} />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900">
                    Phone Number
                  </h3>
                  <p className="mt-1 text-slate-600">
                    Add your business phone number here
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-blue-50 p-5">
              <div className="mb-2 flex items-center gap-2 text-blue-800">
                <MessageCircle size={20} />
                <h3 className="font-semibold">We're here to help</h3>
              </div>

              <p className="text-sm leading-6 text-slate-600">
                Complete the form with your contact details and message.
                Your inquiry will be sent to our email address.
              </p>
            </div>
          </aside>

          {/* Contact form */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg sm:p-8 lg:col-span-3">
            <div className="mb-7">
              <h2 className="text-2xl font-bold text-slate-900">
                Send Us a Message
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Fields marked with * are required.
              </p>
            </div>

            {status.message && (
              <div
                role="status"
                aria-live="polite"
                className={`mb-6 flex items-start gap-3 rounded-lg border p-4 ${
                  status.type === "success"
                    ? "border-green-200 bg-green-50 text-green-800"
                    : "border-red-200 bg-red-50 text-red-800"
                }`}
              >
                {status.type === "success" ? (
                  <CheckCircle className="mt-0.5 shrink-0" size={20} />
                ) : (
                  <AlertCircle className="mt-0.5 shrink-0" size={20} />
                )}

                <p className="text-sm leading-6">{status.message}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Full Name *
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    maxLength={100}
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Email Address *
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    maxLength={254}
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Phone Number *
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+880 1XXXXXXXXX"
                    required
                    maxLength={30}
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="destination"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Travel Destination
                  </label>

                  <input
                    id="destination"
                    name="destination"
                    type="text"
                    value={formData.destination}
                    onChange={handleChange}
                    placeholder="e.g. Cox's Bazar"
                    maxLength={150}
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Your Message *
                </label>

                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help you..."
                  rows={6}
                  required
                  minLength={5}
                  maxLength={5000}
                  className="w-full resize-y rounded-lg border border-slate-300 px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {loading ? (
                  <>
                    <LoaderCircle size={19} className="animate-spin" />
                    Sending Message...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </button>

              <p className="text-xs leading-5 text-slate-500">
                By submitting this form, you agree to be contacted regarding
                your inquiry.
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;