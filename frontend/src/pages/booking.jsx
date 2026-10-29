
import { useState } from "react";

export default function Booking() {

    
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: "",
    date: "",
    address: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

function handleChange(e) {
  setForm({
    ...form,
    [e.target.name]: e.target.value,
  });
  setSubmitted(false);
}

  

async function handleSubmit(e) {
  e.preventDefault();

  if (!/^[6-9]\d{9}$/.test(form.phone)) {
    alert("Enter a valid 10-digit Indian mobile number.");
    return;
  }

  try {
     const response = await fetch("https://home-service-gju5.onrender.com/api/bookings", {      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Booking failed");
    }

    setSubmitted(true);
    setForm({
      name: "",
      phone: "",
      service: "",
      date: "",
      address: "",
      message: "",
    });

    alert("Booking saved successfully!");
  } catch (error) {
    console.error("Booking error:", error);
    alert("Booking failed. Please check that the backend is running.");
  }
}


  return (
    <section
      id="booking"
      className="bg-gray-50 px-5 py-16 md:py-24"
    >
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2">

        <div className="flex flex-col justify-center">
          <p className="mb-3 font-semibold uppercase tracking-widest text-blue-600">
            Book A Service
          </p>

          <h2 className="text-3xl font-bold text-gray-900 md:text-5xl">
            Let Us Take Care
            <span className="block text-gray-500">
              Of Your Home
            </span>
          </h2>

          <p className="mt-5 max-w-lg leading-7 text-gray-600">
            Tell us what you need. Fill in the form and
            prepare your service request.
          </p>

          <div className="mt-8 space-y-4 text-gray-700">
            <p>✓ Professional home services</p>
            <p>✓ Convenient booking request</p>
            <p>✓ Multiple service options</p>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm md:p-8">
          {submitted ? (
            <div className="py-10 text-center">
              <div className="mb-4 text-5xl text-green-600">
                ✓
              </div>

              <h3 className="text-2xl font-bold text-gray-900">
                Request Prepared!
              </h3>

              <p className="mt-3 text-gray-600">
                Your details are filled in this session,
                but no booking has been sent to the business.
              </p>

              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 rounded-lg bg-black px-6 py-3 font-semibold text-white hover:bg-gray-800"
              >
                Back to Form
              </button>
            </div>
          ) : (
            <>
              <h3 className="mb-6 text-2xl font-bold text-gray-900">
                Request a Service
              </h3>

              <form onSubmit={handleSubmit} className="space-y-5">
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
                    autoComplete="name"
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
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
                    autoComplete="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    maxLength={10}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
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
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                  >
                    <option value="">Choose a service</option>
                    <option value="Plumbing">Plumbing</option>
                    <option value="Electrical">Electrical</option>
                    <option value="AC Repair">AC Repair</option>
                    <option value="Home Cleaning">Home Cleaning</option>
                    <option value="Painting">Painting</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="date" className="mb-2 block text-sm font-medium">
                    Preferred Date
                  </label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    min={new Date().toLocaleDateString("en-CA")}
                    value={form.date}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                  />
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
                    placeholder="Enter your address"
                    rows={3}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium">
                    Additional Details (Optional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Describe the issue"
                    rows={2}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600"
                  />
                </div>

             <button 
             type="submit" className="w-full rounded-lg bg-black px-6 py-4 font-semibold text-white hover:bg-gray-800">
                      Submit Booking
                   </button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
