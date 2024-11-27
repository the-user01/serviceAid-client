import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import useAdmin from "../hooks/useAdmin";
import useCustomer from "../hooks/useCustomer";
import useProvider from "../hooks/useProvider";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios";

const Dashboard = () => {

    const { user, logOut } = useAuth()
    const axiosInstance = useAxios()
    const navigate = useNavigate()

    // const isAdmin = false;
    // const isCustomer = true;
    // const isProvider = false;

    const [isAdmin] = useAdmin();
    const [isCustomer] = useCustomer();
    const [isProvider] = useProvider();

    const activeNav = ({ isActive }) => {
        return {
            backgroundColor: isActive ? '#2563EB' : '#FFFFFF',
            fontWeight: isActive ? '600' : 'normal',
            color: isActive ? 'white' : 'black',
            paddingTop: "12px",
            paddingBottom: "12px"
        }
    }

    const inActiveNav = () => {
        return {
            color: "gray",
            pointerEvents: "none",
            opacity: 0.5,
        }
    }

    const handleLogout = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Logout Successful",
                });
                navigate('/');

            })
    }

    const { data: providerInfo } = useQuery({
        queryKey: ['providerInfo', user?.email],
        queryFn: async () => {
            const res = await axiosInstance.get(`/users/serviceProvider/${user?.email}`)
            return res.data
        }
    })


    return (
        <div className="flex flex-col lg:flex-row">
            <div>
                <div className="drawer-open lg:min-h-screen">
                    <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        {/* Page content here */}
                        {/*  <label htmlFor="my-drawer" className="btn btn-primary drawer-button">Open drawer</label> */}
                    </div>
                    <div className="lg:drawer-side">
                        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu bg-white text-base-content lg:min-h-full min-w-full lg:w-80 p-4">

                            <li className="mb-2"><Link to="/" className="btn bg-transparent hover:bg-white">

                                <div className="flex items-center justify-center w-full h-full bg-white">
                                    <svg
                                        className="w-10 h-10" // Adjust size for different screen sizes
                                        viewBox="0 0 200 200"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        {/* Circle background */}
                                        <circle cx="100" cy="100" r="90" fill="#3B82F6" />

                                        {/* Gear icon */}
                                        <path d="M100 70C83.4315 70 70 83.4315 70 100C70 116.569 83.4315 130 100 130C116.569 130 130 116.569 130 100C130 83.4315 116.569 70 100 70ZM100 120C89.0543 120 80 110.946 80 100C80 89.0543 89.0543 80 100 80C110.946 80 120 89.0543 120 100C120 110.946 110.946 120 100 120Z" fill="white" />
                                        <path d="M145 95H140.84C140.397 92.3038 139.563 89.6879 138.36 87.24L141.22 84.38C142.002 83.5979 142.002 82.3421 141.22 81.56L138.44 78.78C137.658 77.9979 136.402 77.9979 135.62 78.78L132.76 81.64C130.312 80.4368 127.696 79.6031 125 79.16V75C125 73.8954 124.105 73 123 73H117C115.895 73 115 73.8954 115 75V79.16C112.304 79.6031 109.688 80.4368 107.24 81.64L104.38 78.78C103.598 77.9979 102.342 77.9979 101.56 78.78L98.78 81.56C97.9979 82.3421 97.9979 83.5979 98.78 84.38L101.64 87.24C100.437 89.6879 99.6031 92.3038 99.16 95H95C93.8954 95 93 95.8954 93 97V103C93 104.105 93.8954 105 95 105H99.16C99.6031 107.696 100.437 110.312 101.64 112.76L98.78 115.62C97.9979 116.402 97.9979 117.658 98.78 118.44L101.56 121.22C102.342 122.002 103.598 122.002 104.38 121.22L107.24 118.36C109.688 119.563 112.304 120.397 115 120.84V125C115 126.105 115.895 127 117 127H123C124.105 127 125 126.105 125 125V120.84C127.696 120.397 130.312 119.563 132.76 118.36L135.62 121.22C136.402 122.002 137.658 122.002 138.44 121.22L141.22 118.44C142.002 117.658 142.002 116.402 141.22 115.62L138.36 112.76C139.563 110.312 140.397 107.696 140.84 105H145C146.105 105 147 104.105 147 103V97C147 95.8954 146.105 95 145 95Z" fill="white" />

                                        {/* Helping hand icon */}
                                        <path d="M70 130C70 130 65 140 60 140C55 140 50 135 50 130C50 125 55 120 60 120C65 120 70 125 70 130Z" fill="white" />
                                        <path d="M90 140C90 140 85 150 80 150C75 150 70 145 70 140C70 135 75 130 80 130C85 130 90 135 90 140Z" fill="white" />
                                        <path d="M110 150C110 150 105 160 100 160C95 160 90 155 90 150C90 145 95 140 100 140C105 140 110 145 110 150Z" fill="white" />
                                        <path d="M50 130C50 130 60 125 70 130C80 135 90 140 100 140C110 140 120 135 130 130" stroke="white" strokeWidth="5" strokeLinecap="round" />
                                    </svg>

                                    <h1 className="text-xl font-bold text-blue-600 ml-4 ">ServiceAid</h1>
                                </div>
                            </Link></li>

                            {/* Admin Content */}
                            {
                                isAdmin &&
                                <>
                                    <li><NavLink to={'/dashboard/admin-home'} style={activeNav}>Admin Home</NavLink></li>
                                    <li><NavLink to={'/dashboard/all-users'} style={activeNav}>Users</NavLink></li>
                                    <li><NavLink to={'/dashboard/all-services'} style={activeNav}>Services</NavLink></li>
                                    <li><NavLink to={'/dashboard/bookings'} style={activeNav}>Bookings</NavLink></li>
                                    <li><NavLink to={'/dashboard/user-messages'} style={activeNav}>Message Box</NavLink></li>
                                </>
                            }

                            {/* User Content */}
                            {
                                isCustomer &&
                                <>
                                    <li><NavLink to={'/dashboard/customer-home'} style={activeNav}>Customer Home</NavLink></li>
                                    <li><NavLink to={'/dashboard/customer-booking'} style={activeNav}>My Bookings</NavLink></li>
                                    <li><NavLink to={'/dashboard/customer-history'} style={activeNav}>Bookings History</NavLink></li>
                                </>
                            }

                            {/* Shop Owner Content */}
                            {
                                isProvider &&
                                <>
                                    {
                                        providerInfo?.status === "Pending" ?
                                            <>
                                                    <li><NavLink to={'/dashboard/provider-pending-home'} style={activeNav}>Provider Home</NavLink></li>
                                                    <li><NavLink to={'/dashboard/add-services'} style={inActiveNav}>Add Services</NavLink></li>
                                                    <li><NavLink to={'/dashboard/provider-services'} style={inActiveNav}>My Services</NavLink></li>
                                                    <li><NavLink to={'/dashboard/booking-status'} style={inActiveNav}>Booking Status</NavLink></li>
                                                </>

                                            :

                                            <>
                                                <li><NavLink to={'/dashboard/provider-home'} style={activeNav}>Provider Home</NavLink></li>
                                                <li><NavLink to={'/dashboard/add-services'} style={activeNav}>Add Services</NavLink></li>
                                                <li><NavLink to={'/dashboard/provider-services'} style={activeNav}>My Services</NavLink></li>
                                                <li><NavLink to={'/dashboard/booking-status'} style={activeNav}>Booking Status</NavLink></li>
                                            </>
                                    }


                                </>



                            }

                            <li className="mt-8 py-2">
                                <button
                                    onClick={handleLogout}
                                    className="relative px-8 py-3 text-white font-semibold bg-gradient-to-r from-red-500 to-red-600 rounded-lg shadow-lg overflow-hidden group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-300"
                                >
                                    <span
                                        className="absolute inset-0 w-full h-full bg-gradient-to-r from-red-700 to-red-500 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-50"
                                    ></span>
                                    <span
                                        className="absolute -left-10 top-1/2 transform -translate-y-1/2 w-20 h-20 bg-white rounded-full opacity-10 blur-md transition-transform duration-300 ease-in-out group-hover:translate-x-72"
                                    ></span>
                                    <span
                                        className="relative flex items-center gap-3 justify-center z-10 transition-transform duration-300 ease-in-out group-hover:scale-110"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth="1.5"
                                            stroke="currentColor"
                                            className="w-6 h-6 animate-pulse"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3H6.75A2.25 2.25 0 004.5 5.25v13.5A2.25 2.25 0 006.75 21h6.75a2.25 2.25 0 002.25-2.25V15M10.5 12h9m0 0l-3-3m3 3l-3 3"
                                            />
                                        </svg>
                                        Logout
                                    </span>
                                </button>
                            </li>



                        </ul>
                    </div>
                </div>
            </div>

            {/* Outlet div */}
            <div className="flex-1 p-6 bg-blue-50 overflow-y-auto min-h-screen">
                <Outlet></Outlet>
            </div>

        </div>
    );
};

export default Dashboard;