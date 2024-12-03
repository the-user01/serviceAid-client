import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxios from "../../../../hooks/useAxios";
import { useState } from "react";
import { FaTrash, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ServicesList = () => {
    const axiosInstance = useAxios();
    const itemsPerPage = 5; // Number of items per page

    const { data: messages = [], refetch, isPending: loader } = useQuery({
        queryKey: ["messages"],
        queryFn: async () => {
            const res = await axiosInstance.get('/services');
            return res.data;
        }
    });

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const normalizedMessages = messages.map(message => ({
        ...message,
        price: message.price?.toString(),
    }));

    const filteredMessages = normalizedMessages.filter(message =>
        message?.serviceName?.toLowerCase()?.includes(searchQuery?.toLowerCase() || '') ||
        message?.category?.toLowerCase()?.includes(searchQuery?.toLowerCase() || '') ||
        message?.price?.includes(searchQuery || '')
    );

    // Pagination logic
    const totalPages = Math.ceil(filteredMessages.length / itemsPerPage);
    const currentMessages = filteredMessages.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => handlePageClick(i)}
                    className={`mx-1 px-4 py-2 rounded-full transform transition-all duration-300 ${currentPage === i
                        ? "bg-[#3B9DF8] text-white scale-110 shadow-md"
                        : "bg-transparent text-blue-600 hover:bg-blue-100"
                        }`}
                >
                    {i}
                </button>
            );
        }
        return pageNumbers;
    };

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
                axiosInstance.delete(`/services/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: `The service has been deleted.`,
                                icon: "success"
                            });
                        }
                    });
            }
        });
    };

    return (
        <>
            {loader ? (
                <div className="mt-2 text-center">
                    <span className="loading loading-dots loading-lg"></span>
                </div>
            ) : (
                <div>
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

                    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                        <div className="container mx-auto px-6 py-8">
                            <div className="mb-6">
                                <h2 className="text-2xl font-semibold text-gray-900">Services</h2>
                            </div>
                            <div className="bg-white shadow rounded-md overflow-hidden">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-gray-200">
                                        <tr>
                                            <th className="p-4">Name</th>
                                            <th className="p-4">Price</th>
                                            <th className="p-4">Category</th>
                                            <th className="p-4">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentMessages.map((message) => (
                                            <tr
                                                key={message._id}
                                                className="border-t cursor-pointer transition duration-300 ease-in-out hover:bg-gray-100 hover:shadow-lg"
                                                onClick={() => setSelectedMessage(message)}
                                            >
                                                <td className="p-4">{message.serviceName}</td>
                                                <td className="p-4">${message.price}/{message.unit}</td>
                                                <td className="p-4">{message.category}</td>

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

                    {/* Pagination */}
                    <div className="flex items-center justify-center mt-8 space-x-2">
                        <button
                            onClick={handlePrevious}
                            disabled={currentPage === 1}
                            className="mx-1 px-3.5 py-3.5 rounded-full bg-white text-blue-600 hover:bg-blue-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            <FaChevronLeft />
                        </button>
                        {renderPageNumbers()}
                        <button
                            onClick={handleNext}
                            disabled={currentPage === totalPages}
                            className="mx-1 px-3.5 py-3.5 rounded-full bg-white text-blue-600 hover:bg-blue-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            <FaChevronRight />
                        </button>
                    </div>
                </div>
            )}

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
                            <span className='text-blue-600'>{selectedMessage.serviceName}</span>
                        </h2>

                        <div className="space-y-4">

                            <p>
                                <span className="font-semibold">Service Provider:</span> {selectedMessage.providerName}
                            </p>
                            <p>
                                <span className="font-semibold">Provider Email:</span> {selectedMessage.providerEmail}
                            </p>
                            <p>
                                <span className="font-semibold">Description:</span> {selectedMessage.description}
                            </p>

                            <div className="mb-2">
                                <p className="font-semibold mb-2">Avilability:</p>

                                <p className="space-x-2">
                                    {selectedMessage?.availability?.days.map((day, idx) => (
                                        <span key={idx} className="shadow-md px-2 py-1 rounded-md"> {day}</span>
                                    )
                                    )}
                                </p>
                            </div>

                            <p>
                                <span className="font-semibold">Service Hours:</span> {selectedMessage?.availability?.hours}
                            </p>

                        </div>



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

export default ServicesList;
