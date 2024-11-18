import { useState } from "react";
import { FaStar } from "react-icons/fa";

const CustomerHome = () => {

    const [activeTab, setActiveTab] = useState("dashboard");
    const [upcomingBookings, setUpcomingBookings] = useState([
        { id: 1, service: "Home Cleaning", provider: "Clean Co.", date: "2023-06-20", time: "14:00", status: "Confirmed" },
        { id: 2, service: "Plumbing Repair", provider: "Fix It Plumbing", date: "2023-06-22", time: "10:00", status: "Pending" },
    ]);
    const [serviceHistory, setServiceHistory] = useState([
        { id: 1, service: "Electrical Work", provider: "Spark Electric", date: "2023-06-10", status: "Completed", rating: 5 },
        { id: 2, service: "Lawn Mowing", provider: "Green Thumb", date: "2023-06-05", status: "Completed", rating: 4 },
        { id: 3, service: "Home Cleaning", provider: "Clean Co.", date: "2023-05-28", status: "Completed", rating: 5 },
    ]);

    const handleCancelBooking = (id) => {
        setUpcomingBookings(upcomingBookings.filter((booking) => booking.id !== id));
    };

    const handleRateService = (id, rating) => {
        setServiceHistory(
            serviceHistory.map((service) =>
                service.id === id ? { ...service, rating } : service
            )
        );
    };

    return (
        <>
            <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
                {activeTab === 'dashboard' && (
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Welcome, John!</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Upcoming Bookings */}
                            <div className="bg-white p-4 shadow rounded-lg">
                                <h3 className="font-semibold text-lg">Upcoming Bookings</h3>
                                {upcomingBookings.length ? (
                                    <ul className="mt-4 space-y-4">
                                        {upcomingBookings.map((booking) => (
                                            <li
                                                key={booking.id}
                                                className="flex justify-between items-center"
                                            >
                                                <div>
                                                    <p className="font-medium">{booking.service}</p>
                                                    <p className="text-sm text-gray-500">
                                                        {booking.provider}, {booking.date} at {booking.time}
                                                    </p>
                                                </div>
                                                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-lg text-sm">
                                                    {booking.status}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>No upcoming bookings</p>
                                )}
                            </div>

                            {/* Recent Services */}
                            <div className="bg-white p-4 shadow rounded-lg">
                                <h3 className="font-semibold text-lg">Recent Services</h3>
                                <div className="mt-4">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr>
                                                <th className="px-4 py-2">Service</th>
                                                <th className="px-4 py-2">Rating</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {serviceHistory.slice(0, 3).map((service) => (
                                                <tr key={service.id}>
                                                    <td className="px-4 py-2">{service.service}</td>
                                                    <td className="px-4 py-2">
                                                        {[1, 2, 3, 4, 5].map((star) => (
                                                            <FaStar
                                                                key={star}
                                                                className={`inline-block w-4 h-4 ${star <= service.rating
                                                                        ? 'text-yellow-400'
                                                                        : 'text-gray-300'
                                                                    }`}
                                                            />
                                                        ))}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                )}


            </main>
        </>
    );
};

export default CustomerHome;