import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAxios from '../../hooks/useAxios';
import Swal from 'sweetalert2';

const Register = () => {

    const { createUser, createUserWithNumber, updateUser } = useAuth();
    const axiosInstance = useAxios();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [contactMethod, setContactMethod] = useState("email");



    const handleRegister = (e) => {
        e.preventDefault();

        const form = e.target;

        const name = form.name.value;
        const email = contactMethod == "email" ? form.email.value : form.phone.value;
        const password = form.password.value;
        const role = form.role.value;
        const status = role !== "Customer" ? "Pending" : "Approved"

        if (password.length < 6) {
            toast.error('Password should be atleast 6 characters');
            return;
        }

        if (contactMethod === "email") {
            createUser(email, password)
                .then(() => {
                    updateUser(name)
                        .then(() => {
                            const userInfo = {
                                name,
                                email,
                                role,
                                status
                            }

                            axiosInstance.post('/users', userInfo)
                                .then(res => {
                                    if (res.data.insertedId) {
                                        Swal.fire({
                                            icon: "success",
                                            title: "Success",
                                            text: "Registration Successful",
                                        });
                                        navigate('/')
                                    }
                                })
                        })
                        .catch(error => console.log(error))
                })
                .catch(error => console.log(error))
        }

        else {
            createUserWithNumber(email, password)
                .then(() => {
                    updateUser(name)
                        .then(() => {
                            const userInfo = {
                                name,
                                email,
                                role,
                                status
                            }

                            axiosInstance.post('/users', userInfo)
                                .then(res => {
                                    if (res.data.insertedId) {
                                        Swal.fire({
                                            icon: "success",
                                            title: "Success",
                                            text: "Registration Successful",
                                        });
                                        navigate('/')
                                    }
                                })
                        })
                        .catch(error => console.log(error))
                })
                .catch(error => console.log(error))
        }


        form.reset();
    }

    return (
        <div>
            <main className="flex-grow flex items-center justify-center pt-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Create your account
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Join ServiceAid and start booking services
                        </p>
                    </div>

                    <div className='text-center space-y-4'>
                        <p className="text-sm font-medium text-gray-700 mb-2">Choose your preferred contact method:</p>
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
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={handleRegister}>
                        <div className="rounded-md shadow-sm space-y-4">
                            <div>
                                <label htmlFor="name" className="sr-only">
                                    Full Name
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    required
                                    className="input input-bordered w-full"
                                    placeholder="Full Name"
                                />
                            </div>

                            {contactMethod === "email" && (
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
                                        className="input input-bordered w-full"
                                        placeholder="Email address"
                                    />
                                </div>
                            )}
                            {contactMethod === "phone" && (
                                <div>
                                    <label htmlFor="phone-number" className="sr-only">
                                        Phone Number
                                    </label>
                                    <input
                                        id="phone-number"
                                        name="phone"
                                        type="tel"
                                        autoComplete="tel"
                                        required
                                        className="input input-bordered w-full"
                                        placeholder="Phone Number"
                                    />
                                </div>
                            )}
                            <div className="relative">
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="new-password"
                                    required
                                    className="input input-bordered w-full"
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
                            <div className="form-control">
                                <select
                                    name="role"
                                    defaultValue="default"
                                    className="select select-bordered"
                                >
                                    <option disabled value="default">
                                        Select your role
                                    </option>
                                    <option>Customer</option>
                                    <option>Service Provider</option>
                                    <option>Admin</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <input
                                id="agree-terms"
                                type="checkbox"
                                checked={agreeTerms}
                                onChange={(e) => setAgreeTerms(e.target.checked)}
                                className="checkbox checkbox-primary"
                            />
                            <label
                                htmlFor="agree-terms"
                                className="ml-2 block text-sm text-gray-900"
                            >
                                I agree to the{" "}
                                <a
                                    href="#"
                                    className="font-medium text-blue-600 hover:text-blue-500"
                                >
                                    Terms of Service
                                </a>{" "}
                                and{" "}
                                <a
                                    href="#"
                                    className="font-medium text-blue-600 hover:text-blue-500"
                                >
                                    Privacy Policy
                                </a>
                            </label>
                        </div>
                        <div>
                            <input
                                type="submit"
                                value="Create Account"
                                className="btn btn-primary w-full"
                                disabled={!agreeTerms}
                            />
                        </div>
                    </form>
                </div>
            </main>



            {/* Login Option */}
            <div className="mt-8 text-center mb-8  pt-8 pb-12">
                <p className="text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">Log in here</Link>
                </p>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default Register;