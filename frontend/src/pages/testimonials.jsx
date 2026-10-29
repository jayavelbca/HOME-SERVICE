
const reviews = [
  {
    name: "Arun Kumar",
    service: "Plumbing Service",
    rating: 5,
    review:
      "The plumber arrived on time and fixed the issue professionally. Great experience!",
    initials: "AK",
  },
  {
    name: "Priya S",
    service: "Home Cleaning",
    rating: 5,
    review:
      "Very friendly team and excellent cleaning service. My home looks fresh and neat.",
    initials: "PS",
  },
  {
    name: "Vijay R",
    service: "AC Repair",
    rating: 4,
    review:
      "The technician explained the problem clearly and completed the repair efficiently.",
    initials: "VR",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="bg-gray-50 px-5 py-16 md:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-600">
            Customer Reviews
          </p>

          <h2 className="text-3xl font-bold text-gray-900 md:text-5xl">
            What Our Customers Say
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-gray-600">
            We aim to make every home service experience
            simple, reliable and convenient.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((item) => (
            <article
              key={item.name}
              className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div
                className="mb-5 text-xl tracking-widest text-amber-500"
                aria-label={`${item.rating} out of 5 stars`}
              >
                {"★".repeat(item.rating)}
                <span className="text-gray-300">
                  {"★".repeat(5 - item.rating)}
                </span>
              </div>

              <p className="mb-6 leading-7 text-gray-600">
                "{item.review}"
              </p>

              <div className="flex items-center gap-3 border-t border-gray-100 pt-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 font-bold text-white">
                  {item.initials}
                </div>

                <div>
                  <h3 className="font-bold text-gray-900">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {item.service}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
