
import { useState } from "react";
import { MessageCircle, MapPin, Phone, Clock } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: "",
    address: "",
  });

  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!/^[6-9]\d{9}$/.test(form.phone)) {
      setError("Enter a valid 10-digit Indian mobile number.");
      return;
    }

    if (!form.service) {
      setError("Please select a service.");
      return;
    }

    const message = [
      "Hello HomeEase!",
      "",
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Service: ${form.service}`,
      `Address: ${form.address}`,
    ].join("\n");

    // Replace with the real business WhatsApp number.
    const businessNumber = "919876543210";

    const url = `https://wa.me/${businessNumber}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <section id="contact" className="bg-white px-5 py-20 md:px-10">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-gray-500">
            Get In Touch
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">
            Book Your Home Service
          </h2>

          <p className="mt-5 max-w-lg leading-7 text-gray-600">
            Tell us what you need. Submit the form to send your
            service enquiry directly to our WhatsApp.
          </p>

          <div className="mt-9 space-y-6">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-gray-100 p-3">
                <Phone size={22} />
              </div>
              <div>
                <h3 className="font-semibold">Phone Support</h3>
                <p className="text-sm text-gray-500">
                  Contact our service team
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-gray-100 p-3">
                <Clock size={22} />
              </div>
              <div>
                <h3 className="font-semibold">Flexible Booking</h3>
                <p className="text-sm text-gray-500">
                  Request a convenient service time
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-gray-100 p-3">
                <MapPin size={22} />
              </div>
              <div>
                <h3 className="font-semibold">Service Address</h3>
                <p className="text-sm text-gray-500">
                  Share your location in the form
                </p>
              </div>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-gray-200 bg-gray-50 p-6 md:p-8"
        >
          <h3 className="text-2xl font-bold">Request a Service</h3>

          <div className="mt-6 space-y-5">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                maxLength={80}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-black"
              />
            </div>

            <div>
              <label htmlFor="phone" className="mb-2 block text-sm font-medium">
                Mobile Number
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                inputMode="numeric"
                value={form.phone}
                onChange={handleChange}
                placeholder="10-digit mobile number"
                pattern="[6-9][0-9]{9}"
                maxLength={10}
                required
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-black"
              />
            </div>

            <div>
              <label htmlFor="service" className="mb-2 block text-sm font-medium">
                Select Service
              </label>
              <select
                id="service"
                name="service"
                value={form.service}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-black"
              >
                <option value="">Choose a service</option>
                <option value="Plumbing">Plumbing</option>
                <option value="Electrical">Electrical</option>
                <option value="AC Repair">AC Repair</option>
                <option value="Home Cleaning">Home Cleaning</option>
              </select>
            </div>

            <div>
              <label htmlFor="address" className="mb-2 block text-sm font-medium">
                Service Address
              </label>
              <textarea
                id="address"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Enter your area and address"
                required
                maxLength={500}
                rows={3}
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-black"
              />
            </div>

            {error && (
              <p role="alert" className="text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-black px-6 py-4 font-semibold text-white transition hover:bg-gray-800"
            >
              <MessageCircle size={20} />
              Send Enquiry on WhatsApp
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
