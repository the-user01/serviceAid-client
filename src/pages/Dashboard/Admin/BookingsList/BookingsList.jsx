import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAxios from "../../../../hooks/useAxios";
import HelmetHook from "../../../../hooks/HelmetHook";

const BookingsList = () => {

    const axiosInstance = useAxios();

    const { data: bookings = [], refetch, isPending: loader } = useQuery({
        queryKey: ['bookings'],
        queryFn: async () => {
            const res = await axiosInstance.get(`/bookings`)
            return res.data
        },
    })

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMessage, setSelectedMessage] = useState(null);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredMessages = bookings.filter(message =>
        message?.serviceName?.toLowerCase()?.includes(searchQuery?.toLowerCase() || '') ||
        message?.userName?.toLowerCase()?.includes(searchQuery?.toLowerCase() || '') ||
        message?.bokingDay?.toLowerCase()?.includes(searchQuery?.toLowerCase() || '') ||
        message?.status?.toLowerCase()?.includes(searchQuery?.toLowerCase() || '')
    );


    return (
        <>
        <HelmetHook title="Bookings Lists"></HelmetHook>

            <div>

                <div>
                    {/* Header */}
                    <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
                        <div className="flex items-center space-x-4">
                            <input
                                type="text"
                                placeholder="Search messages..."
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

                            < main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                                <div className="container mx-auto px-6 py-8">
                                    <div className="mb-6">
                                        <h2 className="text-2xl font-semibold text-gray-900">Bookings</h2>
                                    </div>

                                    <div className="bg-white shadow p-4 rounded-md overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead className="bg-gray-200">
                                                <tr>
                                                    <th className="p-4">Service Name</th>
                                                    <th className="p-4">Customer</th>
                                                    <th className="p-4">Booking Day</th>
                                                    <th className="p-4">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredMessages.map((message) => (
                                                    message.status !== "Canceled"&&
                                                    <tr
                                                        key={message._id}
                                                        onClick={() => setSelectedMessage(message)}
                                                        className="border-t cursor-pointer transition duration-300 ease-in-out hover:bg-gray-100 hover:shadow-lg"
                                                    >
                                                        <td className="p-4">{message.serviceName}</td>
                                                        <td className="p-4">{message.userName}</td>
                                                        <td className="p-4">{message.bokingDay}</td>
                                                        <td className="px-4 py-2">
                                                            <span
                                                                className={`px-2 py-1 lg:py-2 block lg:text-center rounded text-white ${message.status === 'Completed' ? 'bg-green-600' :
                                                                    message.status === 'In Progress' ? 'bg-blue-600' :
                                                                        'bg-yellow-500'
                                                                    }`}
                                                            >
                                                                {message.status}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    


                                    {/* Canceled Bookings */}

                                    <div className="bg-white shadow p-4 rounded-md overflow-x-auto mt-8">
                                        <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-6">Canceled Bookings</h2>

                                        <table className="w-full text-left border-collapse">
                                            <thead className="bg-gray-200">
                                                <tr>
                                                    <th className="p-4">Service Name</th>
                                                    <th className="p-4">Customer</th>
                                                    <th className="p-4">Booking Day</th>
                                                    <th className="p-4">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {filteredMessages.map((message) => (
                                                     message.status === "Canceled"&&
                                                    <tr
                                                        key={message._id}
                                                        onClick={() => setSelectedMessage(message)}
                                                        className="border-t cursor-pointer transition duration-300 ease-in-out hover:bg-gray-100 hover:shadow-lg"
                                                    >
                                                        <td className="p-4">{message.serviceName}</td>
                                                        <td className="p-4">{message.userName}</td>
                                                        <td className="p-4">{message.bokingDay}</td>
                                                        <td className="px-4 py-2">
                                                            <span
                                                                className='px-2 py-1 lg:py-2 block lg:text-center rounded text-white bg-red-600'
                                                            >
                                                                {message.status}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </main>
                    }


                </div>
            </div >
        </>
    );
};

export default BookingsList;