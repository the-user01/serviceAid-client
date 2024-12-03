import { useState } from "react";
import { FaStar } from "react-icons/fa";
import useAuth from "../../../../hooks/useAuth";
import HelmetHook from "../../../../hooks/HelmetHook";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../../hooks/useAxios";

const CustomerHome = () => {

    const { user } = useAuth()
    const axiosInstance = useAxios()

    const { data: bookings = [], isPending: loader } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const res = await axiosInstance.get(`/bookings/email/${user?.email}`)
            return res.data
        },
    })

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


    return (
        <>
            <HelmetHook title="User Dashboard"></HelmetHook>

            {
                loader ?
                    <div className="mt-2 text-center">
                        <span className="loading loading-dots loading-lg"></span>
                    </div> :

                    <>
                        <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
                            <div>
                                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Welcome, {user?.displayName}!</h2>

                                {/* Upcoming Bookings */}
                                <div className="bg-white p-4 shadow rounded-lg">
                                    <h3 className="font-semibold text-lg shadow-xl px-6 py-2 w-1/5 mb-8">Booking Status</h3>
                                    {upcomingBookings.length ? (
                                        <ul className="mt-4 space-y-4">
                                            {bookings.map((booking) => (
                                                <li
                                                    key={booking._id}
                                                    className="flex justify-between items-center pb-2 border-b-2"
                                                >
                                                    <div>
                                                        <p className="font-medium">{booking.serviceName}</p>
                                                        <p className="text-sm text-gray-500">
                                                            {booking.providerName}, {booking?.bookingDate || "Date not provided"}
                                                        </p>
                                                    </div>
                                                    <span className={`${booking?.status === "Completed"
                                                        ? "bg-green-100 text-green-700" : booking.status === "In Progress" ? "bg-blue-100 text-blue-700"
                                                            : booking.status === "Pending" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"
                                                        } px-2 py-1 rounded-lg text-sm`}>
                                                        {booking.status}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>No upcoming bookings</p>
                                    )}
                                </div>
                            </div>
                        </main>
                    </>
            }

        </>
    );
};

export default CustomerHome;