import { useState } from "react";
import HelmetHook from "../../../../hooks/HelmetHook";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxios from "../../../../hooks/useAxios";

const CustomerHistory = () => {

    const { user } = useAuth()
    const axiosInstance = useAxios()

    const { data: bookings = [], refetch, isPending: loader } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const res = await axiosInstance.get(`/bookings/${user?.email}`)
            return res.data
        },
    })

    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredBookings = bookings.filter(booking =>
        booking?.serviceName?.toLowerCase()?.includes(searchQuery?.toLowerCase() || '') ||
        booking?.providerName?.toLowerCase()?.includes(searchQuery?.toLowerCase() || '') ||
        booking?.bokingDay?.toLowerCase()?.includes(searchQuery?.toLowerCase() || '') ||
        booking?.status?.toLowerCase()?.includes(searchQuery?.toLowerCase() || '')
    );

    return (
        <>
            <HelmetHook title="Booking History"></HelmetHook>

            {/* Header */}
            <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
                <div className="flex items-center space-x-4">
                    <input
                        type="text"
                        placeholder="Search booking informations..."
                        className="w-64 px-4 py-2 border rounded-md"
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                </div>
            </header>

            {
                loader ?
                    <div className="mt-2 text-center">
                        <span className="loading loading-dots loading-lg"></span>
                    </div> :

                    <div>
                        <main className="flex-1 overflow-y-auto bg-gray-100 p-6 ">
                                <h2 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-6">Booking History</h2>

                            <div className="bg-white shadow rounded p-4 overflow-x-auto ">

                                <div className="h-96 overflow-y-scroll">
                                    <table className="min-w-full border border-gray-200 rounded  overflow-x-auto">
                                        <thead className="bg-gray-200">
                                            <tr>
                                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Service</th>
                                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Provider</th>
                                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Day</th>

                                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Status</th>
                                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Actions</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {filteredBookings.map((booking) => (
                                                booking.status == "Completed" &&
                                                <tr key={booking._id} className="border-b border-gray-200">
                                                    <td className="px-4 py-2">{booking.serviceName}</td>
                                                    <td className="px-4 py-2">{booking.providerName}</td>
                                                    <td className="px-4 py-2">{booking.bokingDay}</td>

                                                    <td className="px-4 py-2">
                                                        <span
                                                            className='px-2 flex py-1 rounded text-white bg-green-600'
                                                        >
                                                            {booking.status}
                                                        </span>
                                                    </td>

                                                    <td className="px-4 py-2 space-y-4 lg:space-y-2 lg:space-x-6">
                                                        {
                                                            booking.status == 'Completed' &&
                                                            <button
                                                                className="px-2.5 py-1 btn btn-sm btn-outline hover:bg-green-700
                                                    rounded-md hover:underline ml-2"
                                                            // onClick={() => handleCancel(booking)}
                                                            >
                                                                Show Billing
                                                            </button>
                                                        }
                                                    </td>

                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                        </main>
                    </div>
            }

        </>
    );
};

export default CustomerHistory;