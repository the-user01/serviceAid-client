import { FaArrowRight } from "react-icons/fa";

const ServiceProviderSec = () => {
    return (
        <div>
            <section className="bg-gray-100 py-16">
                <div className="container mx-auto px-4 text-center">
                    <h3 className="text-3xl font-bold mb-4">Are you a service provider?</h3>
                    <p className="text-xl mb-8">Join our platform and grow your business</p>

                    {/* Button */}
                    <div className="flex items-center justify-center">

                        <button
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
        </div>
    );
};

export default ServiceProviderSec;