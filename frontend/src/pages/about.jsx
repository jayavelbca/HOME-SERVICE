
export default function About() {
  const features = [
    {
      icon: "🛠️",
      title: "Experienced Professionals",
      description:
        "Our skilled professionals deliver reliable home services.",
    },
    {
      icon: "⏰",
      title: "On-Time Service",
      description:
        "We respect your time and work to complete every job on schedule.",
    },
    {
      icon: "💰",
      title: "Affordable Pricing",
      description:
        "Get quality service at clear and reasonable prices.",
    },
    {
      icon: "⭐",
      title: "Quality Guaranteed",
      description:
        "We focus on customer satisfaction and quality workmanship.",
    },
  ];

  return (
    <section id="about" className="bg-white py-16 md:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:grid-cols-2 md:px-8">

        {/* About Us */}
        <div>
          <p className="mb-3 font-semibold uppercase tracking-widest text-blue-600">
            About Our Company
          </p>

          <h2 className="mb-6 text-3xl font-bold leading-tight text-gray-900 md:text-5xl">
            We Make Your Home
            <span className="text-blue-600"> Better</span>
          </h2>

          <p className="mb-5 leading-7 text-gray-600">
            We provide dependable home services to make your
            everyday life easier. From repairs to maintenance,
            our team is here to help you keep your home
            comfortable and running smoothly.
          </p>

          <p className="mb-8 leading-7 text-gray-600">
            Our goal is to deliver professional workmanship,
            friendly support, and a smooth service experience
            for every customer.
          </p>

          <a
            href="#services"
            className="inline-block rounded-lg bg-blue-600 px-6 py-3
            font-semibold text-white transition hover:bg-blue-700"
          >
            Explore Our Services
          </a>
        </div>

        {/* Why Choose Us */}
        <div id="why-choose-us" className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-gray-100
              bg-gray-50 p-6 transition duration-300
              hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-4 text-3xl">
                {feature.icon}
              </div>

              <h3 className="mb-2 text-lg font-bold text-gray-900">
                {feature.title}
              </h3>

              <p className="text-sm leading-6 text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
