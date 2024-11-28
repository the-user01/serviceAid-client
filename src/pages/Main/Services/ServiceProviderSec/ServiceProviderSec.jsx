import { useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxios from "../../../../hooks/useAxios";
import Swal from "sweetalert2";


const ServiceProviderSec = () => {

    const { user } = useAuth();
    const axiosInstance = useAxios();

    const [provider, setProvider] = useState(false)
    const [providerInfo, setProviderInfo] = useState({
        providerName: "",
        contactNumber: null,
        location: "",
        serviceType: "",
    });

    const handleProviderInfoChange = (e) => {
        const { name, value } = e.target;
        setProviderInfo((prev) => ({ ...prev, [name]: value }));
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        axiosInstance.patch(`/users/update/${user?.email}`, providerInfo)
            .then(res => {
                if (res.data.insertedId) {
                    Swal.fire({
                        icon: "success",
                        title: "Success",
                        text: "Profile Updated Successfully!",
                    });

                    setProviderInfo({
                        providerName: "",
                        contactNumber: null,
                        location: "",
                        serviceType: "",
                    })

                    setProvider(false)
                }
            })

    }


    return (
        <div>
            <section className="bg-gray-100 py-16">
                <div className="container mx-auto px-4 text-center">
                    <h3 className="text-3xl font-bold mb-4">Are you a service provider?</h3>
                    <p className="text-xl mb-8">Join our platform and grow your business</p>

                    {/* Button */}
                    <div className="flex items-center justify-center">
                        <button
                            onClick={() => setProvider(true)}
                            className="relative inline-flex items-center justify-center px-6 py-2.5 overflow-hidden font-medium text-primary transition duration-300 ease-out border-2 border-primary rounded-full shadow-md group">
                            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-primary group-hover:translate-x-0 ease">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path
                                    stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </span>
                            <span
                                className="absolute flex items-center justify-center w-full h-full text-primary transition-all duration-300 transform group-hover:translate-x-full ease">Become a Provider</span>
                            <span className="relative invisible">Become a Provider</span>
                        </button>
                    </div>
                </div>
            </section>


            {/* Modal */}
            {provider && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className=" bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
                        <button
                            className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
                            onClick={() => setProvider(false)}
                        >
                            ✖
                        </button>

                        <div className="mt-8">
                            <form onSubmit={handleSubmit} className="space-y-5">

                                <div>
                                    <label htmlFor="providerName" className="sr-only">
                                        Provider Company Name
                                    </label>
                                    <input
                                        id="providerName"
                                        name="providerName"
                                        type="text"
                                        required
                                        value={providerInfo.providerName}
                                        onChange={handleProviderInfoChange}
                                        className="input input-bordered w-full"
                                        placeholder="Provider Company Name"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="contactNumber" className="sr-only">
                                        Contact Number
                                    </label>
                                    <input
                                        id="contactNumber"
                                        name="contactNumber"
                                        type="number"
                                        required
                                        value={providerInfo.contactNumber}
                                        onChange={handleProviderInfoChange}
                                        className="input input-bordered w-full"
                                        placeholder="Contact Number"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="location" className="sr-only">
                                        Location
                                    </label>
                                    <input
                                        id="location"
                                        name="location"
                                        type="text"
                                        required
                                        value={providerInfo.location}
                                        onChange={handleProviderInfoChange}
                                        className="input input-bordered w-full"
                                        placeholder="Location"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="serviceType" className="sr-only">
                                        Type of Service
                                    </label>
                                    <select
                                        id="serviceType"
                                        name="serviceType"
                                        required
                                        value={providerInfo.serviceType}
                                        onChange={handleProviderInfoChange}
                                        className="select select-bordered w-full"
                                    >
                                        <option disabled value="">
                                            Select Service Type
                                        </option>
                                        <option>Home Services</option>
                                        <option>Beauty & Salon</option>
                                        <option>Appliance Repair</option>
                                        <option>Cleaning</option>
                                        <option>Education</option>
                                        <option>Health & Wellness</option>
                                        <option>Events</option>
                                    </select>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="btn btn-primary w-full"
                                    >
                                        Submit Information
                                    </button>
                                </div>

                            </form>

                        </div>

                        <button
                            onClick={() => setProvider(false)}
                            className="mt-6 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ServiceProviderSec;