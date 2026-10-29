
export default function Footer() {
  return (
    <footer className="bg-gray-950 px-5 py-10 text-gray-300">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Home<span className="text-blue-500">Care.</span>
          </h2>
          <p className="mt-3 text-sm leading-6 text-gray-400">
            Reliable home services for a comfortable and
            well-maintained home.
          </p>
        </div>

        <div>
          <h3 className="mb-3 font-semibold text-white">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#home" className="hover:text-blue-400">Home</a></li>
            <li><a href="#services" className="hover:text-blue-400">Services</a></li>
            <li><a href="#about" className="hover:text-blue-400">About Us</a></li>
            <li><a href="#testimonials" className="hover:text-blue-400">Reviews</a></li>
            <li><a href="#booking" className="hover:text-blue-400">Book a Service</a></li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 font-semibold text-white">
            Contact
          </h3>
          <p className="text-sm leading-6 text-gray-400">
            Need help with your home?
          </p>
          <a
            href="#booking"
            className="mt-3 inline-block text-sm text-blue-400 hover:text-blue-300"
          >
            Request a Booking →
          </a>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-7xl border-t border-gray-800 pt-5 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} HomeCare. All rights reserved.
      </div>
    </footer>
  );
}
