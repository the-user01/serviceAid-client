import { useState } from "react";

const AdminHome = () => {
    const [info, setInfo] = useState([]);

    return (
        <>
            <main className="p-6 bg-gray-100 min-h-screen">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h2>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

                        <div className={`p-6 rounded-lg shadow-md bg-blue-200 text-blue-800`} >
                            <div className="flex items-center justify-between">
                                {/* <div className="text-4xl">{stat.icon}</div> */}
                                <h3 className="text-md font-medium">Total Users</h3>
                            </div>
                            <p className="mt-4 text-4xl font-extrabold">1,234</p>
                        </div>

                        <div className={`p-6 rounded-lg shadow-md bg-green-200 text-green-800`} >
                            <div className="flex items-center justify-between">
                                {/* <div className="text-4xl">{stat.icon}</div> */}
                                <h3 className="text-md font-medium">Active Services</h3>
                            </div>
                            <p className="mt-4 text-4xl font-extrabold">56</p>
                        </div>

                        <div className={`p-6 rounded-lg shadow-md bg-yellow-200 text-yellow-800`} >
                            <div className="flex items-center justify-between">
                                {/* <div className="text-4xl">{stat.icon}</div> */}
                                <h3 className="text-md font-medium">Bookings This Month</h3>
                            </div>
                            <p className="mt-4 text-4xl font-extrabold">290</p>
                        </div>

                        <div className={`p-6 rounded-lg shadow-md bg-red-200 text-red-800`} >
                            <div className="flex items-center justify-between">
                                {/* <div className="text-4xl">{stat.icon}</div> */}
                                <h3 className="text-md font-medium">Revenue This Month</h3>
                            </div>
                            <p className="mt-4 text-4xl font-extrabold">$1234</p>
                        </div>


                    </div>
                </div>
            </main>
        </>
    );
};

export default AdminHome;
