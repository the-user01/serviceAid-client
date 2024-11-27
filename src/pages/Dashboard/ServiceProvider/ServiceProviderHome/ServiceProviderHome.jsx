import { useState } from "react";
import {
    FaCalendarAlt,
    FaBriefcase,
    FaDollarSign,
    FaBell,
    FaStar,
} from "react-icons/fa";
import useAuth from "../../../../hooks/useAuth";
import HelmetHook from "../../../../hooks/HelmetHook";

const ServiceProviderHome = () => {

    const { user } = useAuth();



    const [upcomingBookings, setUpcomingBookings] = useState([
        { id: 1, service: "Home Cleaning", customer: "Alice Johnson", date: "2023-06-20", time: "14:00", status: "Confirmed" },
        { id: 2, service: "Home Cleaning", customer: "Bob Smith", date: "2023-06-22", time: "10:00", status: "Pending" },
        { id: 3, service: "Home Cleaning", customer: "Charlie Brown", date: "2023-06-25", time: "09:00", status: "Confirmed" },
    ]);

    const [recentReviews, setRecentReviews] = useState([
        { id: 1, customer: "David Lee", service: "Home Cleaning", date: "2023-06-18", rating: 5, comment: "Excellent service! Very thorough and professional." },
        { id: 2, customer: "Eva Green", service: "Home Cleaning", date: "2023-06-15", rating: 4, comment: "Good job overall. Could improve on time management." },
        { id: 3, customer: "Frank White", service: "Home Cleaning", date: "2023-06-12", rating: 5, comment: "Outstanding work! Will definitely book again." },
    ]);

    return (
        <>
        <HelmetHook title="Provider Dashboard "></HelmetHook>


            <div className="flex h-screen bg-gray-100">
                <div className="flex-1 flex flex-col overflow-hidden">

                    <main className="flex-1 p-6 bg-gray-100">
                        <h2 className="text-2xl font-semibold mb-6">Welcome back, {user?.displayName}!</h2>

                        {/* Cards Section */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                            <div className="p-4 bg-white rounded-lg shadow">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-sm font-medium">Total Earnings</h3>
                                    <FaDollarSign className="text-gray-500" />
                                </div>
                                <p className="text-2xl font-bold">$1,234</p>
                                <p className="text-sm text-gray-500">+10% from last month</p>
                            </div>

                            <div className="p-4 bg-white rounded-lg shadow">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-sm font-medium">Completed Jobs</h3>
                                    <FaBriefcase className="text-gray-500" />
                                </div>
                                <p className="text-2xl font-bold">28</p>
                                <p className="text-sm text-gray-500">+5 from last month</p>
                            </div>

                            <div className="p-4 bg-white rounded-lg shadow">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-sm font-medium">Average Rating</h3>
                                    <FaStar className="text-yellow-500" />
                                </div>
                                <p className="text-2xl font-bold">4.8</p>
                                <p className="text-sm text-gray-500">+0.2 from last month</p>
                            </div>

                            <div className="p-4 bg-white rounded-lg shadow">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-sm font-medium">Upcoming Jobs</h3>
                                    <FaCalendarAlt className="text-gray-500" />
                                </div>
                                <p className="text-2xl font-bold">5</p>
                                <p className="text-sm text-gray-500">Next 7 days</p>
                            </div>
                        </div>

                        {/* Upcoming Bookings */}
                        <div className="bg-white p-4 rounded-lg shadow mb-6">
                            <h3 className="text-lg font-medium mb-4">Upcoming Bookings</h3>
                            <div className="overflow-y-auto max-h-64">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr>
                                            <th className="py-2 px-4 border-b">Service</th>
                                            <th className="py-2 px-4 border-b">Customer</th>
                                            <th className="py-2 px-4 border-b">Date & Time</th>
                                            <th className="py-2 px-4 border-b">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {upcomingBookings.map((booking) => (
                                            <tr key={booking.id}>
                                                <td className="py-2 px-4 border-b">{booking.service}</td>
                                                <td className="py-2 px-4 border-b">{booking.customer}</td>
                                                <td className="py-2 px-4 border-b">{`${booking.date} ${booking.time}`}</td>
                                                <td className="py-2 px-4 border-b">
                                                    <span
                                                        className={`px-2 py-1 text-sm font-medium rounded ${booking.status === "Confirmed"
                                                                ? "bg-green-200 text-green-800"
                                                                : "bg-yellow-200 text-yellow-800"
                                                            }`}
                                                    >
                                                        {booking.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </main>
                </div>
            </div>

        </>


    );
};

export default ServiceProviderHome;
