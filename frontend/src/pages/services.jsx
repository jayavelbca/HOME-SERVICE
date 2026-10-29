
import {
  Wrench,
  Zap,
  Snowflake,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

const services = [
  {
    title: "Plumbing",
    description:
      "Expert solutions for leaking taps, pipe repairs and water issues.",
    icon: Wrench,
    number: "01",
  },
  {
    title: "Electrical",
    description:
      "Safe and reliable electrical repairs, wiring and installations.",
    icon: Zap,
    number: "02",
  },
  {
    title: "AC Repair",
    description:
      "AC servicing, maintenance and cooling problem solutions.",
    icon: Snowflake,
    number: "03",
  },
  {
    title: "Home Cleaning",
    description:
      "Keep your home fresh with professional cleaning services.",
    icon: Sparkles,
    number: "04",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="bg-white px-5 py-20 md:px-10 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-gray-500">
              What We Do
            </p>

            <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
              Services for Every Home
            </h2>

            <p className="mt-4 max-w-xl leading-7 text-gray-600">
              Everything your home needs, delivered by
              skilled professionals you can trust.
            </p>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 self-start font-semibold hover:underline md:self-auto"
          >
            Explore services
            <ArrowUpRight size={18} />
          </a>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <article
                key={service.number}
                className="group rounded-2xl border border-gray-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-black hover:shadow-xl"
              >
                <div className="mb-8 flex items-center justify-between">
                  <div className="rounded-xl bg-gray-100 p-3 transition group-hover:bg-black group-hover:text-white">
                    <Icon size={26} strokeWidth={1.7} />
                  </div>

                  <span className="text-sm text-gray-400">
                    {service.number}
                  </span>
                </div>

                <h3 className="text-xl font-bold">
                  {service.title}
                </h3>

                <p className="mt-3 min-h-20 text-sm leading-6 text-gray-600">
                  {service.description}
                </p>

                <a
                  href="#contact"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold"
                >
                  Book service
                  <ArrowUpRight
                    size={16}
                    className="transition group-hover:translate-x-1"
                  />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
