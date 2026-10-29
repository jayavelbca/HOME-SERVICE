
import Navbar from "./components/navbar";
import Services from "./pages/services";
import About from "./pages/about";
import Testimonials from "./pages/testimonials";
import Booking from "./pages/booking";
import Footer from "./pages/footer";
import WhatsAppButton from "./components/whatsappbutton";
import Admin from "./pages/admin";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/adminlogin";

function Home() {
  return (
    <>
      <Navbar />
     
      {/* Hero Section */}
      <main
        id="home"
        className="flex min-h-[80vh] flex-col items-center justify-center bg-gray-50 px-5 text-center"
      >
        <p className="mb-4 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-600">
          Reliable Home Services
        </p>

        <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-6xl">
          Your Home Deserves
          <span className="block text-gray-500">
            The Best Care
          </span>
        </h1>

        <p className="mt-5 max-w-xl text-base leading-7 text-gray-600">
          Professional plumbing, electrical, AC repair and
          cleaning services — all in one place.
        </p>

        <a
          href="#services"
          className="mt-8 rounded-full bg-black px-7 py-4 font-semibold text-white transition hover:bg-gray-800"
        >
          Explore Our Services
        </a>
      </main>

      {/* Services Component */}
      <Services />

      {/* About + Why Choose Us */}
      <About />
   <Testimonials />
   <Booking />
      {/* Contact Section */}
   
      <section
        id="contact"
        className="scroll-mt-24 bg-gray-50 px-5 py-16 text-center"
      >
        <h2 className="text-3xl font-bold text-gray-900">
          Contact Us
        </h2>

        <p className="mt-3 text-gray-600">
          Need help with your home? Contact us today.
        </p>

        <a
          href="tel:+919876543210"
          className="mt-6 inline-block rounded-full bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-800"
        >
          Call Us Now
        </a>
      </section>

      <Footer />
<WhatsAppButton />
    </>
  );

 

}




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}



export default App;
