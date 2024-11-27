import { useQuery } from "@tanstack/react-query";
import HelmetHook from "../../../../hooks/HelmetHook";
import useAuth from "../../../../hooks/useAuth";
import useAxios from "../../../../hooks/useAxios";
import Swal from "sweetalert2";
import { useState } from "react";
import { Link } from "react-router-dom";

const ProviderBookingStatus = () => {


    const { user } = useAuth()
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

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [completedBookings, setCompletedBookings] = useState(null);

    const [getInfo, setGetInfo] = useState({
        totalUnit: null,
        notes: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setGetInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredBookings = bookings.filter(booking =>
        booking?.serviceName?.toLowerCase()?.includes(searchQuery?.toLowerCase() || '') ||
        booking?.userName?.toLowerCase()?.includes(searchQuery?.toLowerCase() || '') ||
        booking?.bokingDay?.toLowerCase()?.includes(searchQuery?.toLowerCase() || '') ||
        booking?.status?.toLowerCase()?.includes(searchQuery?.toLowerCase() || '')
    );


    const handleAccept = (e, booking) => {
        e.stopPropagation();

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, accpet it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosInstance.patch(`/bookings/accept/${booking._id}`)
                    .then(() => {
                        refetch();
                        Swal.fire({
                            title: "Accepted!",
                            text: `${booking.serviceName} has been Accepted. Contact with the customer soon.`,
                            icon: "success"

                        })
                    })
            }
        });
    };

    const handleCancel = (e, booking) => {
        e.stopPropagation();

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

    const handleCompleted = (e, booking) => {
        e.stopPropagation();

        setCompletedBookings(booking)
    }

    let totalAmopunt = parseInt(completedBookings?.price) * getInfo.totalUnit

    const handleBillSubmit = (e) => {
        e.preventDefault();

        const billInfo = {
            billAmount: totalAmopunt,
            additionalNotes: getInfo.notes,
        }

        axiosInstance.patch(`/bookings/completed/${completedBookings._id}`, billInfo)
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Bill Submitted",
                    text: "Thank you for submitting your bill!",
                });
                setGetInfo({
                    totalUnit: null,
                    notes: " "
                })
                setCompletedBookings(null)

            })
    }



    refetch();

    return (
        <>
            <HelmetHook title="Booking Status"></HelmetHook>

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
                                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Ordered By</th>
                                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Day</th>

                                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Status</th>
                                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Actions</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {filteredBookings.map((booking) => (
                                                booking.status === "Pending" &&
                                                <tr
                                                    onClick={() => setSelectedMessage(booking)}
                                                    key={booking._id} className="border-b border-gray-200 cursor-pointer">
                                                    <td className="px-4 py-2">{booking.serviceName}</td>
                                                    <td className="px-4 py-2">{booking.userName}</td>
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
                                                            className=" btn btn-sm btn-outline hover:bg-green-600
                                                        rounded-md hover:underline ml-2"
                                                            onClick={(e) => handleAccept(e, booking)}
                                                        >
                                                            Accept
                                                        </button>

                                                        <button
                                                            className=" btn btn-sm btn-outline hover:bg-red-600
                                                        rounded-md hover:underline ml-2"
                                                            onClick={(e) => handleCancel(e, booking)}
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
                                <h2 className="text-base lg:text-lg font-semibold text-gray-900 mb-6">Completed & Ongoing Bookings</h2>

                                <div className="h-64 lg:h-56 overflow-x-auto overflow-y-scroll  w-full">
                                    <table className="w-full border border-gray-200 rounded  overflow-x-auto">
                                        <thead className="bg-gray-200">
                                            <tr>
                                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Service</th>
                                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Ordered By</th>
                                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Day</th>

                                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Status</th>
                                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Actions</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {filteredBookings.map((booking) => (
                                                booking.status !== "Pending" && booking.status !== "Canceled" &&
                                                <tr
                                                    onClick={() => setSelectedMessage(booking)}
                                                    key={booking._id} className="border-b border-gray-200 cursor-pointer">
                                                    <td className="px-4 py-2">{booking.serviceName}</td>
                                                    <td className="px-4 py-2">{booking.userName}</td>
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
                                                            booking.status == 'In Progress' &&
                                                            <button
                                                                className="px-2.5 py-1 btn btn-sm btn-outline hover:bg-green-700
                                                        rounded-md hover:underline ml-2"
                                                                onClick={(e) => handleCompleted(e, booking)}
                                                            >
                                                                Completed
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
                                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Ordered by</th>
                                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Day</th>

                                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Status</th>
                                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredBookings.map((booking) => (
                                                booking.status === "Canceled" &&
                                                <tr
                                                    onClick={() => setSelectedMessage(booking)}
                                                    key={booking._id} className="border-b border-gray-200 cursor-pointer">
                                                    <td className="px-4 py-2">{booking.serviceName}</td>
                                                    <td className="px-4 py-2">{booking.userName}</td>
                                                    <td className="px-4 py-2">{booking.bokingDay}</td>

                                                    <td className="px-4 py-2">
                                                        <span
                                                            className={`px-2 flex py-1 rounded text-white bg-red-600`}
                                                        >
                                                            {booking.status}
                                                        </span>
                                                    </td>

                                                    <td className="px-4 py-2 space-y-4 lg:space-y-2 lg:space-x-6">

                                                        <Link to={`/customer-report-page/${booking._id}`}>
                                                            <button
                                                                className="px-8 py-1 btn btn-sm btn-outline hover:bg-red-600
                                                        rounded-md hover:underline ml-2">
                                                                Report
                                                            </button>
                                                        </Link>

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


            {/* Bookings Info Modal */}
            {selectedMessage && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative overflow-y-scroll">
                        <button
                            className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
                            onClick={() => setSelectedMessage(null)}
                        >
                            ✖
                        </button>
                        <h2 className="text-xl font-semibold text-blue-800 mb-4">{selectedMessage.serviceName}</h2>
                        <p>
                            <strong>Provider Name:</strong> {selectedMessage.providerName}
                        </p>

                        <div className="divider"></div>
                        <p className="font-bold text-center text-blue-700">Order Summery:</p>

                        <p className="mt-4">
                            <strong>Ordered By:</strong> {selectedMessage.userName}
                        </p>
                        <p className="mt-4">
                            <strong>Email:</strong> {selectedMessage.userEmail}
                        </p>
                        <p className="mt-4">
                            <strong>Contact Number:</strong> {selectedMessage.contactNumber}
                        </p>

                        <div className="divider w-1/2 mx-auto"></div>

                        <p className="mt-4">
                            <strong>Booking Day:</strong> {selectedMessage.bokingDay}
                        </p>
                        <p className="mt-4">
                            <strong>Price: </strong>
                            ${selectedMessage.price} / {selectedMessage.unit}
                        </p>
                        <p className="mt-4">
                            <strong>Status: </strong>
                            <span
                                className={`text-sm p-1 rounded-md ${selectedMessage.status === 'Pending'
                                    ? 'bg-yellow-500 text-white'
                                    : selectedMessage.status === 'In Progress'
                                        ? 'bg-blue-500 text-white'
                                        : selectedMessage.status === 'Canceled'
                                            ? 'bg-red-500 text-white'
                                            : 'text-black'
                                    }`}
                            >
                                {selectedMessage.status}
                            </span>
                        </p>



                        <button
                            onClick={() => setSelectedMessage(null)}
                            className="mt-8 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}


            {/* Check Completed Modal */}
            {completedBookings && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg max-w-lg w-full h-screen p-6 relative  overflow-y-scroll">
                        <button
                            className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
                            onClick={() => {
                                setCompletedBookings(null)
                                setGetInfo({
                                    totalUnit: null,
                                    notes: ""
                                })
                            }}
                        >
                            ✖
                        </button>
                        <h2 className="text-xl font-semibold text-blue-800 mb-4">{completedBookings.serviceName}</h2>
                        <p>
                            <strong>Provider Name:</strong> {completedBookings.providerName}
                        </p>

                        <div className="divider"></div>
                        <p className="font-bold text-center text-blue-700">Order Summery:</p>

                        <p className="mt-4">
                            <strong>Ordered By:</strong> {completedBookings.userName}
                        </p>
                        <p className="mt-4">
                            <strong>Email:</strong> {completedBookings.userEmail}
                        </p>
                        <p className="mt-4">
                            <strong>Contact Number:</strong> {completedBookings.contactNumber}
                        </p>

                        <div className="divider w-1/2 mx-auto"></div>
                        <div>
                            <p className="font-bold text-center text-blue-700">Billing Form:</p>

                            <form
                                className="mt-6"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    // Logic to handle form submission
                                    console.log('Billing form submitted');
                                }}
                            >
                                {/* Total Amount */}
                                <div className="mb-4">
                                    <label htmlFor="totalUnit" className="block font-medium text-gray-700">
                                        Total {completedBookings.unit}
                                    </label>
                                    <input
                                        type="number"
                                        id="totalUnit"
                                        name="totalUnit"
                                        value={getInfo.totalUnit}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                                        placeholder={`Enter total ${completedBookings.unit}`}
                                        required
                                    />
                                </div>

                                {/* Payment Method */}
                                <div className="mb-4">
                                    <p className="block font-medium text-gray-700">
                                        Total Amount:
                                        <span className="ml-2 bg-red-600 px-4 py-1 rounded-md text-white text-sm">${totalAmopunt}</span>
                                    </p>

                                </div>

                                {/* Additional Notes */}
                                <div className="mt-4 mb-4">
                                    <label htmlFor="notes" className="block font-medium text-gray-700">
                                        Additional Notes (Optional)
                                    </label>
                                    <textarea
                                        id="notes"
                                        name="notes"
                                        value={getInfo.notes}
                                        onChange={handleChange}
                                        rows="3"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                                        placeholder="Add any additional details..."
                                    ></textarea>
                                </div>

                                {/* Submit Button */}
                                <button
                                    onClick={handleBillSubmit}
                                    type="submit"
                                    className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                                >
                                    Submit Billing
                                </button>
                            </form>

                        </div>




                        <button
                            onClick={() => {
                                setCompletedBookings(null)
                                setGetInfo({
                                    totalUnit: null,
                                    notes: ""
                                })
                            }}
                            className="mt-8 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}


        </>
    );
};

export default ProviderBookingStatus;