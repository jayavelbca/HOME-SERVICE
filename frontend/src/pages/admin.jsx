
import { useEffect, useState ,useRef } from "react";
import { useNavigate } from "react-router-dom";


export default function Admin() {
    const [printingBooking, setPrintingBooking] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const navigate = useNavigate();

  const totalBookings = bookings.length;

  const pendingBookings = bookings.filter(
    (b) => (b.status || "Pending") === "Pending"
  ).length;

  const confirmedBookings = bookings.filter(
    (b) => b.status === "Confirmed"
  ).length;

  const completedBookings = bookings.filter(
    (b) => b.status === "Completed"
  ).length;

  const cancelledBookings = bookings.filter(
    (b) => b.status === "Cancelled"
  ).length;
/////////

const filteredBookings = bookings.filter((booking) => {
  const search = searchTerm.toLowerCase().trim();

  const matchesSearch =
    (booking.name || "").toLowerCase().includes(search) ||
    (booking.phone || "").includes(search) ||
    (booking.service || "").toLowerCase().includes(search);

  const currentStatus = booking.status || "Pending";

  const matchesStatus =
    statusFilter === "All" || currentStatus === statusFilter;

  return matchesSearch && matchesStatus;
});

  useEffect(() => {
    async function fetchBookings() {
      const token = sessionStorage.getItem("adminToken");

      if (!token) {
        navigate("/admin/login", { replace: true });
        return;
      }

      try {
        const response = await fetch(
          "https://home-service-gju5.onrender.com/api/bookings",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 401 || response.status === 403) {
          sessionStorage.removeItem("adminToken");
          navigate("/admin/login", { replace: true });
          return;
        }

        if (!response.ok) {
          throw new Error("Unable to load bookings.");
        }

        const data = await response.json();
        setBookings(data);
      } catch {
        setError("Unable to connect to the server.");
      } finally {
        setLoading(false);
      }
    }

    fetchBookings();
  }, [navigate]);

  async function updateBookingStatus(bookingId, status) {
    const token = sessionStorage.getItem("adminToken");

    if (!token) {
      navigate("/admin/login", { replace: true });
      return;
    }

    setUpdatingId(bookingId);
    setStatusMessage("");
    setError("");

    try {
      const response = await fetch(
        `https://home-service-gju5.onrender.com/api/bookings/${bookingId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();

      if (response.status === 401 || response.status === 403) {
        sessionStorage.removeItem("adminToken");
        navigate("/admin/login", { replace: true });
        return;
      }

      if (!response.ok) {
        throw new Error(data.message || "Status update failed.");
      }

      setBookings((current) =>
        current.map((booking) =>
          booking._id === bookingId ? data.booking : booking
        )
      );

      setStatusMessage("Booking status updated successfully!");
    } catch (err) {
      setError(err.message || "Unable to update booking status.");
    } finally {
      setUpdatingId("");
    }
  }

  function handleLogout() {
    sessionStorage.removeItem("adminToken");
    navigate("/admin/login", { replace: true });
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 md:p-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <p className="mt-2 text-gray-600">
              Home Services Booking Management
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-lg bg-red-600 px-5 py-2 font-medium text-white hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        {/* Dashboard summary cards */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { title: "Total Bookings", count: totalBookings, color: "border-gray-400" },
            { title: "Pending", count: pendingBookings, color: "border-yellow-400" },
            { title: "Confirmed", count: confirmedBookings, color: "border-blue-400" },
            { title: "Completed", count: completedBookings, color: "border-green-400" },
            { title: "Cancelled", count: cancelledBookings, color: "border-red-400" },
          ].map((item) => (
            <div
              key={item.title}
              className={`rounded-xl border-l-4 ${item.color} bg-white p-5 shadow-sm`}
            >
              <p className="text-sm text-gray-500">{item.title}</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {item.count}
              </p>
            </div>
          ))}
        </div>

        {statusMessage && (
          <p className="mt-4 text-sm text-green-700" role="status">
            {statusMessage}
          </p>
        )}

        {loading && (
          <p className="mt-6">Loading bookings...</p>
        )}

        {error && (
          <p className="mt-6 text-red-600">{error}</p>
        )}

        {!loading && !error && bookings.length === 0 && (
          <p className="mt-6 text-gray-600">No bookings found.</p>
        )}
{/* Search and filter */}
<div className="mt-8 flex flex-col gap-4 rounded-xl bg-white p-5 shadow-sm md:flex-row">
  <input
    type="text"
    value={searchTerm}
    onChange={(event) => setSearchTerm(event.target.value)}
    placeholder="Search by customer name, phone or service..."
    className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
  />

  <select
    value={statusFilter}
    onChange={(event) => setStatusFilter(event.target.value)}
    className="rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-blue-500 md:w-56"
  >
    <option value="All">All Statuses</option>
    <option value="Pending">Pending</option>
    <option value="Confirmed">Confirmed</option>
    <option value="Completed">Completed</option>
    <option value="Cancelled">Cancelled</option>
  </select>
</div>

<p className="mt-4 text-sm text-gray-600">
  Showing {filteredBookings.length} of {bookings.length} bookings
</p>
        {/* Booking cards */}
        <div className="mt-6 grid gap-5 md:grid-cols-2">
           {filteredBookings.map((booking) => (
            <div
              key={booking._id}
              className="rounded-xl border bg-white p-6 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h3 className="text-lg font-bold">
                  {booking.name}
                </h3>

                <span
                  className={`rounded-full px-3 py-1 text-sm ${
                    (booking.status || "Pending") === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : booking.status === "Confirmed"
                      ? "bg-blue-100 text-blue-800"
                      : booking.status === "Completed"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                    
                  {booking.status || "Pending"}
                </span>
              </div>

              <div className="mt-4 space-y-2 text-sm text-gray-700">
                <p><strong>Phone:</strong> {booking.phone}</p>
                <p><strong>Service:</strong> {booking.service}</p>
                <p><strong>Date:</strong> {booking.date}</p>
                <p><strong>Address:</strong> {booking.address}</p>
                <p>
                  <strong>Message:</strong>{" "}
                  {booking.message || "No additional details"}
                </p>
                
              </div>
   <button
  onClick={() => {
    setPrintingBooking(booking);
    setTimeout(() => {
      window.print();
    }, 100);
  }}
  className="mt-4 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
>
  Print Booking
</button>



              {/* Status update dropdown */}
              <div className="mt-5 border-t pt-4">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Update Booking Status
                </label>

                <select
                  value={booking.status || "Pending"}
                  onChange={(event) =>
                    updateBookingStatus(
                      booking._id,
                      event.target.value
                    )
                  }
                  disabled={updatingId === booking._id}
                  className={`w-full rounded-lg border px-3 py-2 text-sm outline-none disabled:opacity-50 ${
                    (booking.status || "Pending") === "Pending"
                      ? "border-yellow-300 bg-yellow-50 text-yellow-800"
                      : booking.status === "Confirmed"
                      ? "border-blue-300 bg-blue-50 text-blue-800"
                      : booking.status === "Completed"
                      ? "border-green-300 bg-green-50 text-green-800"
                      : "border-red-300 bg-red-50 text-red-800"
                  }`}
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>

                {updatingId === booking._id && (
                  <p className="mt-2 text-sm text-gray-500">
                    Updating status...
                  </p>
                )}
              </div>
                  {/* Print only selected booking */}
        {printingBooking && (
          <div className="print-only">
            <h1>Home Services - Booking Details</h1>
            <p><strong>Customer:</strong> {printingBooking.name}</p>
            <p><strong>Phone:</strong> {printingBooking.phone}</p>
            <p><strong>Service:</strong> {printingBooking.service}</p>
            <p><strong>Date:</strong> {printingBooking.date}</p>
            <p><strong>Address:</strong> {printingBooking.address}</p>
            <p>
              <strong>Status:</strong>{" "}
              {printingBooking.status || "Pending"}
            </p>
            <p>
              <strong>Message:</strong>{" "}
              {printingBooking.message || "None"}
            </p>
          </div>
        )}
            </div>
          ))}
        </div>
        
      </div>
    </div>
    
  );
}
