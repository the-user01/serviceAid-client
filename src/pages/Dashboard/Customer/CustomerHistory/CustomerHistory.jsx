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
            const res = await axiosInstance.get(`/bookings/email/${user?.email}`)
            return res.data
        },
    })

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMessage, setSelectedMessage] = useState(null);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredBookings = bookings.filter(booking =>
        booking?.serviceName?.toLowerCase()?.includes(searchQuery?.toLowerCase() || '') ||
        booking?.providerName?.toLowerCase()?.includes(searchQuery?.toLowerCase() || '') ||
        booking?.bokingDay?.toLowerCase()?.includes(searchQuery?.toLowerCase() || '') ||
        booking?.status?.toLowerCase()?.includes(searchQuery?.toLowerCase() || '')
    );

    const handleShowBill = (booking) => {
        setSelectedMessage(booking)
    }

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
                                                                onClick={() => handleShowBill(booking)}
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


            {/* Bookings Info Modal */}
            {/* {selectedMessage && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative overflow-y-scroll">
                        <button
                            className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
                            onClick={() => setSelectedMessage(null)}
                        >
                            ✖
                        </button>
                        <h2 className="text-xl font-semibold text-blue-800 mb-4">{selectedMessage.providerName}</h2>
                        <p>
                            <strong>Invoice</strong> 
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
            )} */}


            {
                selectedMessage && (
                    <div id="printable-modal" className=" fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl shadow-lg max-w-lg w-full p-6 relative">
                            {/* Close Button */}
                            <button
                                className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition"
                                onClick={() => setSelectedMessage(null)}
                            >
                                ✖
                            </button>

                            {/* Header Section */}
                            <div className="text-center mb-6">
                                <h2 className="text-2xl font-semibold text-blue-700">
                                    {selectedMessage.providerName}
                                </h2>
                                <p className="text-gray-500">Invoice</p>
                            </div>

                            {/* Order Summary Section */}
                            <div className="bg-blue-50 rounded-lg p-4 mb-4 space-y-2">
                                <p>
                                    <strong>Ordered By:</strong>{" "}
                                    <span className="text-gray-700">
                                        {selectedMessage.userName}
                                    </span>
                                </p>
                                <p>
                                    <strong>Email:</strong>{" "}
                                    <span className="text-gray-700">
                                        {selectedMessage.userEmail}
                                    </span>
                                </p>
                                <p>
                                    <strong>Contact Number:</strong>{" "}
                                    <span className="text-gray-700">
                                        {selectedMessage.contactNumber}
                                    </span>
                                </p>
                            </div>

                            {/* Booking Details Section */}
                            <div className="bg-gray-50 rounded-lg p-4 mb-4 space-y-3">
                                <p>
                                    <strong>Booked Day:</strong>{" "}
                                    <span className="text-gray-700">
                                        {selectedMessage.bokingDay}
                                    </span>
                                </p>
                                <p>
                                    <strong>Total Amount:</strong>{" "}
                                    <span className="text-gray-700">
                                        ${selectedMessage?.billAmount}
                                    </span>
                                </p>
                                <p>
                                    <strong>Message:</strong>{" "}
                                    <span className="text-gray-700">
                                        {selectedMessage?.additionalNotes}
                                    </span>
                                </p>
                                <p>
                                    <strong>Status:</strong>{" "}
                                    <span
                                        className="text-sm font-semibold py-1 px-2 rounded-md bg-green-100 text-green-700"
                                    >
                                        {selectedMessage.status}
                                    </span>
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-between mt-6">

                                <button
                                    onClick={() => {
                                        const modalContent = document.getElementById("printable-modal");
                                        const originalContent = document.body.innerHTML;


                                        document.body.innerHTML = modalContent.outerHTML;

                                        window.print();

                                        document.body.innerHTML = originalContent;

                                        window.location.reload();
                                    }}
                                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
                                >
                                    Print Invoice
                                </button>


                                <button
                                    onClick={() => setSelectedMessage(null)} // Close Modal
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }


        </>
    );
};

export default CustomerHistory;