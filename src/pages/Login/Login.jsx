import { useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import useAxios from "../../hooks/useAxios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const axiosInstance = useAxios()
    const { signIn, signInWithNumber, googleSignIn } = useAuth()

    const [showPassword, setShowPassword] = useState(false);
    const [contactMethod, setContactMethod] = useState("email");

    const location = useLocation();
    const navigate = useNavigate();

    const hanldeLogin = e => {
        e.preventDefault();

        const form = e.target;

        const email = contactMethod == "email" ? form.email.value : form.phone.value;
        const password = form.password.value;



        if (contactMethod === "email") {
            signIn(email, password)

                .then(() => {

                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Login Successful",
                    });
                    navigate(location?.state ? location.state : '/');
                })
                .catch(() => toast.error("Invalid Email or Password"))

        }

        else {
            signInWithNumber(email, password)

                .then(() => {

                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Login Successful",
                    });
                    navigate(location?.state ? location.state : '/');
                })
                .catch(() => toast.error("Invalid Email or Password"))

        }



        form.reset()

    }


    const handleGoogleLogin = () => {
        googleSignIn()
            .then((result) => {

                const userInfo = {
                    name: result.user.displayName,
                    email: result.user.email,
                    role: "Customer",
                    status: "Approved"
                }

                axiosInstance.post('/users', userInfo)
                    .then(() => {
                        Swal.fire({
                            icon: "success",
                            title: "Success",
                            text: "Login Successful",
                        });
                        navigate(location?.state ? location.state : '/');
                    })
            })
            .catch(error => console.log(error))
    }


    return (
        <div>
            <main className="flex-grow flex items-center justify-center pt-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Sign in to your account
                        </h2>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={hanldeLogin}>

                        <div className="rounded-md shadow-sm space-y-4">
                            {/* Radio Buttons for Email or Phone */}
                            <div className="flex space-x-4 justify-center">
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="contactMethod"
                                        value="email"
                                        checked={contactMethod === "email"}
                                        onChange={() => setContactMethod("email")}
                                        className="radio radio-primary"
                                    />
                                    <span>Email</span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="contactMethod"
                                        value="phone"
                                        checked={contactMethod === "phone"}
                                        onChange={() => setContactMethod("phone")}
                                        className="radio radio-primary"
                                    />
                                    <span>Phone</span>
                                </label>
                            </div>
                            {/* Conditionally Render Input based on contact method */}
                            <div>
                                {contactMethod === "email" ? (
                                    <div>
                                        <label htmlFor="email-address" className="sr-only">
                                            Email address
                                        </label>
                                        <input
                                            id="email-address"
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            required
                                            className="input input-bordered w-full rounded-t-md"
                                            placeholder="Email address"
                                        />
                                    </div>
                                ) : (
                                    <div>
                                        <label htmlFor="phone-number" className="sr-only">
                                            Phone number
                                        </label>
                                        <input
                                            id="phone-number"
                                            name="phone"
                                            type="tel"
                                            autoComplete="tel"
                                            required
                                            className="input input-bordered w-full rounded-t-md"
                                            placeholder="Phone number"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="relative">
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    required
                                    className="input input-bordered w-full rounded-b-md"
                                    placeholder="Password"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <FaEyeSlash className="h-5 w-5 text-gray-400" />
                                    ) : (
                                        <FaEye className="h-5 w-5 text-gray-400" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    type="checkbox"
                                    className="checkbox checkbox-primary"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="btn btn-primary w-full">
                                Sign in
                            </button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or continue with</span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <button
                                onClick={handleGoogleLogin}
                                className="btn w-full flex items-center justify-center relative overflow-hidden group border border-gray-300 bg-white shadow-md hover:shadow-lg rounded-lg transition-transform transform hover:scale-105 focus:outline-none"
                            >
                                {/* Background Animation */}
                                <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-red-500 to-yellow-500 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></span>

                                {/* Google Icon */}
                                <div className="relative flex items-center justify-center w-10 h-10 bg-white rounded-full border border-gray-200 shadow-sm group-hover:animate-spin-slow">
                                    <FaGoogle className="w-5 h-5 text-gray-600 group-hover:text-blue-500 transition-colors duration-300" />
                                </div>

                                {/* Button Text */}
                                <span className="ml-3 text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-300">
                                    Continue with Google
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <div className="mt-8 pt-8 pb-12 text-center">
                <p className="text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">Register here</Link>
                </p>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default Login;