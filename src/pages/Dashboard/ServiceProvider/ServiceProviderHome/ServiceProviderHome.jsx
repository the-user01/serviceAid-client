import {
    FaCalendarAlt,
    FaBriefcase,
    FaDollarSign,
    FaStar,
} from "react-icons/fa";
import useAuth from "../../../../hooks/useAuth";
import HelmetHook from "../../../../hooks/HelmetHook";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../../hooks/useAxios";

const ServiceProviderHome = () => {

    const { user } = useAuth();
    const axiosInstance = useAxios()

    const { data: providerInfo } = useQuery({
        queryKey: ['providerInfo', user?.email],
        queryFn: async () => {
            const res = await axiosInstance.get(`/users/serviceProvider/${user?.email}`)
            return res.data
        }
    })


    const { data: bookings = [], refetch, isPending: loader } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const res = await axiosInstance.get(`/bookings/providerName/${providerInfo?.providerName}`)
            return res.data
        },
    })

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
                                <p className="text-2xl font-bold">
                                    ${bookings
                                        .filter(booking => typeof booking.billAmount === 'number' && !isNaN(booking.billAmount))
                                        .reduce((total, booking) => total + booking.billAmount, 0)
                                        .toFixed(2)}
                                </p>
                                <p className="text-sm text-gray-500">+10% from last month</p>
                            </div>

                            <div className="p-4 bg-white rounded-lg shadow">
                                <div className="flex items-center justify-between mb-2">
                                    <h3 className="text-sm font-medium">Completed Jobs</h3>
                                    <FaBriefcase className="text-gray-500" />
                                </div>
                                <p className="text-2xl font-bold">
                                    {bookings.filter(booking => booking.status === "Completed").length}
                                </p>
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
                                <p className="text-2xl font-bold">
                                {bookings.filter(booking => booking.status === "Pending").length}
                                </p>
                                <p className="text-sm text-gray-500">Next 7 days</p>
                            </div>
                        </div>

                        {/* Upcoming Bookings */}
                        <div className="bg-white p-4 rounded-lg shadow mb-6">
                            <h3 className="text-lg font-medium mb-4">Bookings Status</h3>
                            <div className="overflow-y-auto max-h-64">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr>
                                            <th className="py-2 px-4 border-b">Service</th>
                                            <th className="py-2 px-4 border-b">Customer</th>
                                            <th className="py-2 px-4 border-b">Date



                                            </th>
                                            <th className="py-2 px-4 border-b">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bookings.map((booking) => (
                                            <tr key={booking.id}>
                                                <td className="py-2 px-4 border-b">{booking.serviceName}</td>
                                                <td className="py-2 px-4 border-b">{booking.userName}</td>
                                                <td className="py-2 px-4 border-b">{`${booking?.bookingDate || "Not Provided"}`}</td>
                                                <td className="py-2 px-4 border-b">
                                                    <span
                                                        className={`px-2 py-1 text-sm font-medium rounded ${booking.status === "Completed"
                                                            ? "bg-green-200 text-green-800" : booking.status === "In Progress" ? "bg-blue-200 text-blue-800"
                                                                : booking.status === "Pending" ? "bg-yellow-200 text-yellow-800" : "bg-red-200 text-red-800"
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
