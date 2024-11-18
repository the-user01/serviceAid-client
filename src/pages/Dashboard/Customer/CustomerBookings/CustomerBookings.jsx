import { useState } from "react";

const CustomerBookings = () => {

    const [bookings, setBookings] = useState([
        { id: 1, service: 'Home Cleaning', provider: 'Clean Co.', date: '2023-06-20', time: '14:00', status: 'Confirmed' },
        { id: 2, service: 'Plumbing Repair', provider: 'Fix It Plumbing', date: '2023-06-22', time: '10:00', status: 'Pending' },
        { id: 3, service: 'Lawn Mowing', provider: 'Green Thumb', date: '2023-06-25', time: '09:00', status: 'Confirmed' },
        { id: 4, service: 'Electrical Work', provider: 'Spark Electric', date: '2023-06-28', time: '11:00', status: 'Confirmed' },
        { id: 5, service: 'Pest Control', provider: 'Bug Busters', date: '2023-07-01', time: '15:00', status: 'Pending' },
    ]);

    const [selectedBooking, setSelectedBooking] = useState(null);
    const [isRescheduleDialogOpen, setIsRescheduleDialogOpen] = useState(false);
    const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);

    const handleReschedule = (booking) => {
        setSelectedBooking(booking);
        setIsRescheduleDialogOpen(true);
    };

    const handleCancel = (booking) => {
        setSelectedBooking(booking);
        setIsCancelDialogOpen(true);
    };

    const confirmReschedule = () => {
        // Implement reschedule logic here
        setIsRescheduleDialogOpen(false);
    };

    const confirmCancel = () => {
        setBookings(bookings.filter((booking) => booking.id !== selectedBooking.id));
        setIsCancelDialogOpen(false);
    };

    return (
        <>
            <main className="flex-1 overflow-y-auto bg-gray-100 p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">My Bookings</h2>
                <div className="bg-white shadow rounded p-4">
                    <table className="min-w-full border border-gray-200 rounded">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Service</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Provider</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Date</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Time</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Status</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking) => (
                                <tr key={booking.id} className="border-b border-gray-200">
                                    <td className="px-4 py-2">{booking.service}</td>
                                    <td className="px-4 py-2">{booking.provider}</td>
                                    <td className="px-4 py-2">{booking.date}</td>
                                    <td className="px-4 py-2">{booking.time}</td>
                                    <td className="px-4 py-2">
                                        <span
                                            className={`px-2 py-1 rounded text-white ${booking.status === 'Confirmed' ? 'bg-green-500' : 'bg-yellow-500'
                                                }`}
                                        >
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2">
                                        <button
                                            className="px-2 py-1 text-blue-500 hover:underline"
                                            onClick={() => handleReschedule(booking)}
                                        >
                                            Reschedule
                                        </button>
                                        <button
                                            className="px-2 py-1 text-red-500 hover:underline ml-2"
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
            </main>

            {/* Reschedule Modal */ }
    {
        isRescheduleDialogOpen && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded shadow-lg w-96">
                    <h3 className="text-lg font-bold mb-4">Reschedule Booking</h3>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Date</label>
                        <input
                            type="date"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700">Time</label>
                        <input
                            type="time"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                        />
                    </div>
                    <div className="mt-4 flex justify-end">
                        <button
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                            onClick={() => setIsRescheduleDialogOpen(false)}
                        >
                            Cancel
                        </button>
                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ml-2"
                            onClick={confirmReschedule}
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    {/* Cancel Modal */ }
    {
        isCancelDialogOpen && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded shadow-lg w-96">
                    <h3 className="text-lg font-bold mb-4">Cancel Booking</h3>
                    <p className="mb-4">
                        Are you sure you want to cancel your booking for{' '}
                        <strong>{selectedBooking?.service}</strong> scheduled on{' '}
                        <strong>{selectedBooking?.date}</strong> at <strong>{selectedBooking?.time}</strong>?
                    </p>
                    <div className="flex justify-end">
                        <button
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                            onClick={() => setIsCancelDialogOpen(false)}
                        >
                            No, Keep Booking
                        </button>
                        <button
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 ml-2"
                            onClick={confirmCancel}
                        >
                            Yes, Cancel Booking
                        </button>
                    </div>
                </div>
            </div>
        )
    }
        </>
    );
};

export default CustomerBookings;