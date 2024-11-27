import { useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../../hooks/useAxios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import HelmetHook from "../../../../hooks/HelmetHook";

const CustomerBookings = () => {

    const { user } = useAuth()
    const axiosInstance = useAxios()

    const { data: bookings = [], refetch, isPending: loader } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const res = await axiosInstance.get(`/bookings/email/${user?.email}`)
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


    const handleCancel = (booking) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, cancel it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosInstance.patch(`/bookings/canceled/${booking._id}`)
                    .then(() => {
                        refetch();
                        Swal.fire({
                            title: "Canceled!",
                            text: `${booking.serviceName} has been Canceled.`,
                            icon: "success"

                        })
                    })
            }
        });
    };


    return (
        <>
            <HelmetHook title="My Bookings"></HelmetHook>

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
                        <main className="flex-1 overflow-x-auto overflow-y-auto bg-gray-100 p-6">

                            {/* Showing pending bookings */}

                            <div className="bg-white shadow rounded p-4 overflow-x-auto">
                                <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-6">Pending Bookings</h2>

                                <div className="h-64 lg:h-56 overflow-x-auto overflow-y-scroll">
                                    <table className="border border-gray-200 rounded w-full">
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
                                                booking.status === "Pending" &&
                                                <tr key={booking._id} className="border-b border-gray-200">
                                                    <td className="px-4 py-2">{booking.serviceName}</td>
                                                    <td className="px-4 py-2">{booking.providerName}</td>
                                                    <td className="px-4 py-2">{booking.bokingDay}</td>

                                                    <td className="px-4 py-2">
                                                        <span
                                                            className='px-2 flex py-1 rounded text-white bg-yellow-500'
                                                        >
                                                            {booking.status}
                                                        </span>
                                                    </td>

                                                    <td className="px-4 py-2 space-y-4 lg:space-y-2 lg:space-x-6">
                                                        <button
                                                            className="px-8 py-1 btn btn-sm btn-outline hover:bg-red-600
                                                        rounded-md hover:underline ml-2"
                                                            onClick={() => handleCancel(booking)}
                                                        >
                                                            Cancel
                                                        </button>
                                                    </td>

                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>



                            {/* Showing Completed and Processing bookings */}

                            <div className="bg-white shadow rounded p-4 overflow-x-auto mt-8">
                                <h2 className="text-base lg:text-lg font-semibold text-gray-900 mb-6">Ongoing Bookings</h2>

                                <div className="h-64 lg:h-56 overflow-x-auto overflow-y-scroll  w-full">
                                    <table className="w-full border border-gray-200 rounded  overflow-x-auto">
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
                                                booking.status === "In Progress" &&
                                                <tr key={booking._id} className="border-b border-gray-200">
                                                    <td className="px-4 py-2">{booking.serviceName}</td>
                                                    <td className="px-4 py-2">{booking.providerName}</td>
                                                    <td className="px-4 py-2">{booking.bokingDay}</td>

                                                    <td className="px-4 py-2">
                                                        <span
                                                            className={`px-2 flex py-1 rounded text-white ${booking.status === 'Completed' ? 'bg-green-600' : 'bg-blue-600'
                                                                }`}
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



                            {/* Canceled Bookings Part */}

                            <div className="bg-white shadow rounded p-4 overflow-x-auto mt-8">
                                <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-6">Canceled Bookings</h2>

                                <div className="h-64 lg:h-56 overflow-y-scroll ">
                                    <table className="min-w-full border border-gray-200 rounded overflow-x-auto">
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
                                                booking.status === "Canceled" &&
                                                <tr key={booking._id} className="border-b border-gray-200">
                                                    <td className="px-4 py-2">{booking.serviceName}</td>
                                                    <td className="px-4 py-2">{booking.providerName}</td>
                                                    <td className="px-4 py-2">{booking.bokingDay}</td>

                                                    <td className="px-4 py-2">
                                                        <span
                                                            className={`px-2 flex py-1 rounded text-white bg-red-600`}
                                                        >
                                                            {booking.status}
                                                        </span>
                                                    </td>

                                                    <td className="px-4 py-2 space-y-4 lg:space-y-2 lg:space-x-6">
                                                        {
                                                            booking.report ?

                                                                <button
                                                                    disabled
                                                                    className="px-8 py-1 btn btn-sm btn-outline text-white bg-gray-600
                                                        rounded-md ml-2 ">
                                                                    Reported
                                                                </button>

                                                                :

                                                                <Link to={`/customer-report-page/${booking._id}`}>
                                                                    <button
                                                                        className="px-8 py-1 btn btn-sm btn-outline hover:bg-red-600
                                                    rounded-md hover:underline ml-2">
                                                                        Report
                                                                    </button>
                                                                </Link>
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

export default CustomerBookings;