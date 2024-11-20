import { Link, NavLink, useLocation } from "react-router-dom";
import HelmetHook from "../../hooks/HelmetHook";
import useAuth from "../../hooks/useAuth";
import image from "../../assets/user.png"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Heading = () => {

    const isAdmin = false;
    const isCustomer = true;
    const isProvider = false;

    const { loader, user, logOut } = useAuth();

    const handleLogout = async () => {
        try {
            await logOut();
            toast.success("Successfully Logout");
        } catch (error) {
            console.error("Logout error:", error);
            toast.error("Logout failed");
        }
    };

    const activeNav = ({ isActive }) => {
        return {
            backgroundColor: isActive ? '#2563EB' : '#FFFFFF',
            fontWeight: isActive ? '600' : 'normal',
            color: isActive ? 'white' : 'black'
        }
    }

    const navLinks = <>
        <li><NavLink to="/" style={activeNav}>Home</NavLink></li>
        <li><NavLink to="services" style={activeNav}>Services</NavLink></li>
        <li><NavLink to="about" style={activeNav}>About</NavLink></li>
        <li><NavLink to="contact" style={activeNav}>Contact</NavLink></li>

        {
            loader ?
                <div className="mt-2 text-center">
                    <span className="loading loading-spinner loading-sm"></span>
                </div> :
                <>
                    {
                        user ?
                            <div className="dropdown dropdown-bottom dropdown-end">
                                <li tabIndex={0}><img src={image} className="w-14" /></li>
                                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                    <li className="p-2 font-semibold">{user.displayName}</li>

                                    {
                                        isAdmin &&
                                        <li><NavLink to={'/dashboard/admin-home'}>Dashboard</NavLink></li>

                                    }

                                    {
                                        isCustomer &&
                                        <li><NavLink to={'/dashboard/customer-home'}>Dashboard</NavLink></li>

                                    }

                                    {
                                        isProvider &&
                                        <li><NavLink to={'/dashboard/provider-home'}>Dashboard</NavLink></li>

                                    }


                                    <li><button onClick={handleLogout}>Logout</button></li>
                                </ul>
                            </div>

                            :
                            <li><NavLink to="login" style={activeNav}>Login</NavLink></li>

                    }
                </>
        }
    </>

    const location = useLocation();
    const currentPath = location.pathname;

    const pageTitles = {
        '/': 'Home',
        '/services': 'Services',
        '/about': 'About',
        '/contact': 'Contact',
        '/login': 'Login',
        '/register': 'Register',
    };

    const pageTitle = pageTitles[currentPath] || 'Page Not Found';

    return (
        <div>
            <HelmetHook title={pageTitle}></HelmetHook>

            {/* Navbar */}
            <div className="">
                <div className="navbar bg-base-100 ">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h8m-8 6h16" />
                                </svg>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                {navLinks}
                            </ul>
                        </div>
                        <Link to="/" className="btn bg-white hover:bg-white hover:border hover:border-blue-600">

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
                        </Link>
                    </div>
                    <div className="navbar-end hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            {navLinks}
                        </ul>
                    </div>
                </div>
            </div>
            <ToastContainer autoClose={1200}></ToastContainer>
        </div>
    );
};

export default Heading;