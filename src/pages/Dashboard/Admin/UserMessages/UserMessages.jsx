import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import useAxios from '../../../../hooks/useAxios';
import Swal from 'sweetalert2';

const UserMessages = () => {

    const axiosInstance = useAxios();
    const { data: messages = [], refetch } = useQuery({
        queryKey: ["messages"],
        queryFn: async () => {
            const res = await axiosInstance.get('/messages')
            return res.data
        }
    })

    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('date');
    const [selectedMessage, setSelectedMessage] = useState(null);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredMessages = messages.filter(message =>
        message.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        message.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        message.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedMessages = [...filteredMessages].sort((a, b) => {
        if (sortBy === 'date') {
            return new Date(b.date) - new Date(a.date);
        } else if (sortBy === 'name') {
            return a.name.localeCompare(b.name);
        }
        return 0;
    });


    const handleDelete = (e, id) => {
       
        e.stopPropagation();

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosInstance.delete(`/messages/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: `The has been deleted.`,
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }

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
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-semibold text-gray-900">Message Inbox</h2>
                                <div>
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="px-4 py-2 border rounded-md"
                                    >
                                        <option value="date">Sort by Date</option>
                                        <option value="name">Sort by Name</option>
                                    </select>
                                </div>
                            </div>
                            <div className="bg-white shadow rounded-md overflow-hidden">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-gray-200">
                                        <tr>
                                            <th className="p-4">Sender</th>
                                            <th className="p-4">Email</th>
                                            <th className="p-4">Date</th>
                                            <th className="p-4">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sortedMessages.map((message) => (
                                            <tr
                                                key={message._id}
                                                className="border-t cursor-pointer transition duration-300 ease-in-out hover:bg-gray-100 hover:shadow-lg"
                                                onClick={() => setSelectedMessage(message)}
                                            >
                                                <td className="p-4">{message.name}</td>
                                                <td className="p-4">{message.email}</td>
                                                <td className="p-4">{message.date}</td>
                                                <td className="p-4 space-x-2">

                                                    <div
                                                        onClick={(e) => handleDelete(e, message._id)}
                                                        className="relative w-8 h-8 bg-red-500 rounded-full cursor-pointer text-white flex items-center justify-center overflow-hidden group"
                                                    >
                                                        {/* Main Icon */}
                                                        <span
                                                            className="block text-sm font-bold transition-transform transform group-hover:scale-0 duration-300 ease-out"
                                                        >
                                                            <FaTrash />
                                                        </span>

                                                        {/* Shatter Effect */}
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


            {/* Modal */}
            {selectedMessage && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
                        <button
                            className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
                            onClick={() => setSelectedMessage(null)}
                        >
                            ✖
                        </button>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4">
                            Message from <span className='text-blue-600'>{selectedMessage.name}</span>
                        </h2>
                        <p>
                            <strong>Email:</strong> {selectedMessage.email}
                        </p>
                        <p className="mt-2">
                            <strong>Date:</strong> {selectedMessage.date}
                        </p>
                        <p className="mt-4">
                            <strong>Message:</strong> {selectedMessage.message}
                        </p>
                        <button
                            onClick={() => setSelectedMessage(null)}
                            className="mt-6 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

        </>
    );
};

export default UserMessages;