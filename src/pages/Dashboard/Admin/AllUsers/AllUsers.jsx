import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import useAxios from "../../../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const AllUsers = () => {

    const axiosInstance = useAxios()


    const { data: users = [], refetch } = useQuery({
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





    return (
        <>
            <div className="p-6 bg-gray-100 min-h-screen">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">All Users</h2>
                <div className="overflow-x-auto">
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
                            {users.map((user, index) => (
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
                                                onClick={()=>handleDeleteUser(user)}
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
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default AllUsers;
