import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import useAxios from "../../../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import HelmetHook from "../../../../hooks/HelmetHook";

const AllUsers = () => {

    const axiosInstance = useAxios()

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMessage, setSelectedMessage] = useState(null);


    const { data: users = [], refetch, isPending: loader } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosInstance.get("/users")
            return res.data
        },
    })

    const handleDeleteUser = (user) => {
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
                axiosInstance.delete(`/users/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: `${user.name} has been deleted.`,
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }


    const handleUpdateStatus = (e, user) => {
        e.stopPropagation();

        Swal.fire({
            title: "Are you sure?",
            text: `Do you want to change the status for ${user?.providerName}!`,
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, change status!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosInstance.patch(`/users/approved/${user._id}`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Updated!",
                                text: `Status has been updated.`,
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }


    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredUsers = users.filter(user =>
        user?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase() || '') ||
        user?.email?.toLowerCase()?.includes(searchQuery?.toLowerCase() || '') ||
        user?.role?.toLowerCase()?.includes(searchQuery?.toLowerCase() || '')||
        user?.status?.toLowerCase()?.includes(searchQuery?.toLowerCase() || '')
    );


    return (
        <>
        <HelmetHook title="All Users"></HelmetHook>

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

                    <>
                        <div className="my-8 bg-gray-100">
                            <div className="h-64 lg:h-56 overflow-x-auto overflow-y-scroll">
                                <table className="w-full text-left table-auto bg-white shadow-md rounded-lg">
                                    <thead>
                                        <tr className="bg-blue-500 text-white">
                                            <th className="px-6 py-3 text-sm font-medium">Name</th>
                                            <th className="px-6 py-3 text-sm font-medium">Email</th>
                                            <th className="px-6 py-3 text-sm font-medium">Role</th>
                                            <th className="px-6 py-3 text-sm font-medium">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredUsers.map((user, index) => (
                                            <>
                                                {
                                                    user.status !== "Pending" &&
                                                    <tr
                                                        key={user._id}
                                                        className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                                                            } hover:bg-gray-100 transition-colors`}
                                                    >
                                                        <td className="px-6 py-4 text-gray-700 font-medium">{user.name}</td>
                                                        <td className="px-6 py-4 text-gray-600">{user.email}</td>
                                                        <td
                                                            className={`px-6 py-4 font-semibold ${user.role === 'Admin'
                                                                ? 'text-red-600'
                                                                : user.role === 'Service Provider'
                                                                    ? 'text-green-600'
                                                                    : 'text-blue-600'
                                                                }`}
                                                        >
                                                            {user.role}
                                                        </td>

                                                        {
                                                            user.role !== 'Admin' ?

                                                                <td className="px-6 py-4 font-medium text-red-700 cursor-pointer" >
                                                                    <div
                                                                        onClick={() => handleDeleteUser(user)}
                                                                        className="relative w-8 h-8 bg-red-500 rounded-full text-white flex items-center justify-center 
   overflow-hidden group"
                                                                    >
                                                                        {/* Main Icon */}
                                                                        <span
                                                                            className="block text-sm font-bold transition-transform transform 
       group-hover:scale-0 duration-300 ease-out"
                                                                        >
                                                                            <FaTrash />
                                                                        </span>

                                                                        {/* Shatter Effect */}
                                                                        <div className="absolute inset-0 flex flex-wrap">
                                                                            {[...Array(12)].map((_, i) => (
                                                                                <span
                                                                                    key={i}
                                                                                    className="w-2 h-2 bg-red-400 rounded-full opacity-0 
               group-hover:opacity-100 group-hover:animate-fly-out"
                                                                                    style={{
                                                                                        animationDelay: `${i * 50}ms`,
                                                                                    }}
                                                                                ></span>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                </td> :

                                                                <td className="px-6 py-4 text-gray-700 font-medium"></td>
                                                        }

                                                    </tr>
                                                }
                                            </>

                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>


                        {/* Showing pending Providers */}

                        <div className="bg-white shadow rounded p-4 overflow-x-auto">
                            <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-6">Pending Service Providers</h2>

                            <div className="h-64 lg:h-56 overflow-x-auto overflow-y-scroll">
                                <table className="border border-gray-200 rounded w-full">
                                    <thead className="bg-gray-200">
                                        <tr>
                                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">User Name</th>
                                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Shop Name</th>
                                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Email</th>
                                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Role</th>

                                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Status</th>
                                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {filteredUsers.map((booking) => (
                                             booking.role === "Service Provider" && booking.status === "Pending" &&
                                            <tr 
                                            onClick={()=>setSelectedMessage(booking)}
                                            key={booking._id} className="border-b border-gray-200 cursor-pointer">
                                                <td className="px-4 py-2">{booking.name}</td>
                                                <td className="px-4 py-2">{booking.providerName}</td>
                                                <td className="px-4 py-2">{booking.email}</td>
                                                <td className="px-4 py-2">{booking.role}</td>

                                                <td className="px-4 py-2">
                                                    <span
                                                        className='px-2 flex py-1 rounded text-white bg-yellow-500'
                                                    >
                                                        {booking.status}
                                                    </span>
                                                </td>

                                                <td className="px-4 py-2 space-y-4 lg:space-y-2 lg:space-x-6">
                                                    <button
                                                        className="px-8 py-1 btn btn-sm btn-outline hover:bg-green-600
                                                        rounded-md hover:underline ml-2"
                                                        onClick={(e) => handleUpdateStatus(e, booking)}
                                                    >
                                                        Approve
                                                    </button>
                                                </td>

                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </>
            }


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
                        <h2 className="text-lg font-semibold text-blue-600 mb-4">{selectedMessage.name}</h2>
                        <p>
                            <strong>Email:</strong> {selectedMessage.email}
                        </p>

                        <div className="divider"></div>
                        <p className="mt-2">
                            <strong>Shop Name:</strong> {selectedMessage?.providerName}
                        </p>
                        <p className="mt-2">
                            <strong>Contact:</strong> {selectedMessage?.contactNumber || "No Number Provided"}
                        </p>
                        <p className="mt-4">
                            <strong>Location:</strong> {selectedMessage?.location}
                        </p>
                        <p className="mt-4">
                            <strong>Service Type:</strong> {selectedMessage?.serviceType}
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

export default AllUsers;
