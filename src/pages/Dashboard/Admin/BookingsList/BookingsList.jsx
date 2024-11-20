import { useState } from "react";
import { FaTrash } from 'react-icons/fa';

const BookingsList = () => {

    const [bookings, setBookings] = useState([
        { id: 1, service: 'Home Cleaning', customer: 'Alice Brown', date: '2023-06-15', status: 'Completed' },
        { id: 2, service: 'Plumbing Repair', customer: 'Charlie Davis', date: '2023-06-16', status: 'Pending' },
        { id: 3, service: 'Electrical Work', customer: 'Eva Green', date: '2023-06-17', status: 'In Progress' },
        { id: 4, service: 'Home Painting', customer: 'James D', date: '2023-06-17', status: 'Canceled' },
    ])

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMessage, setSelectedMessage] = useState(null);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredMessages = bookings.filter(message =>
        message?.service?.toLowerCase()?.includes(searchQuery?.toLowerCase() || '') ||
        message?.customer?.toLowerCase()?.includes(searchQuery?.toLowerCase() || '') ||
        message?.status?.toLowerCase()?.includes(searchQuery?.toLowerCase() || '')
    );


    return (
        <>
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

                    {/* Main content area */}
                    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                        <div className="container mx-auto px-6 py-8">
                            <div className="mb-6">
                                <h2 className="text-2xl font-semibold text-gray-900">Services</h2>

                            </div>
                            <div className="bg-white shadow rounded-md overflow-hidden">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-gray-200">
                                        <tr>
                                            <th className="p-4">Service Name</th>
                                            <th className="p-4">Customer</th>
                                            <th className="p-4">Date</th>
                                            <th className="p-4">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredMessages.map((message) => (
                                            <tr
                                                key={message._id}
                                                className="border-t cursor-pointer transition duration-300 ease-in-out hover:bg-gray-100 hover:shadow-lg"
                                                onClick={() => setSelectedMessage(message)}
                                            >
                                                <td className="p-4">{message.service}</td>
                                                <td className="p-4">{message.customer}</td>
                                                <td className="p-4">{message.date}</td>
                                                <td className="p-4">{message.status}</td>

                                                {/* <td className="p-4 space-x-2">

                                                    <div

                                                        className="relative w-8 h-8 bg-red-500 rounded-full cursor-pointer text-white flex items-center justify-center overflow-hidden group"
                                                    >
                                                        <span
                                                            className="block text-sm font-bold transition-transform transform group-hover:scale-0 duration-300 ease-out"
                                                        >
                                                            <FaTrash />
                                                        </span>

                                                        <div className="absolute inset-0 flex flex-wrap">
                                                            {[...Array(12)].map((_, i) => (
                                                                <span
                                                                    key={i}
                                                                    className="w-2 h-2 bg-red-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-fly-out"
                                                                    style={{
                                                                        animationDelay: `${i * 50}ms`,
                                                                    }}
                                                                ></span>
                                                            ))}
                                                        </div>
                                                    </div>

                                                </td> */}
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

export default BookingsList;