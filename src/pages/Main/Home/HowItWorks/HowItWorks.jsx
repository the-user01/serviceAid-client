import { BiSearch } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import { FaRegStar } from "react-icons/fa";

const HowItWorks = () => {
    return (
        <div>
            <section className="bg-base-200 py-16">
                <div className="container mx-auto px-4">
                    <h3 className="text-2xl font-semibold mb-8 text-center">How It Works</h3>
                    <div className="flex flex-wrap justify-center gap-8">
                        <div className="bg-white shadow-md rounded-lg max-w-xs p-6 flex flex-col items-center text-center">
                            <div className="bg-blue-100 rounded-full p-4 mb-4">
                                <BiSearch className="w-8 h-8 text-blue-600" />
                            </div>
                            <h4 className="font-semibold mb-2">Search Service</h4>
                            <p className="text-gray-600">Find the service you need from our wide range of offerings</p>
                        </div>
                        <div className="bg-white shadow-md rounded-lg max-w-xs p-6 flex flex-col items-center text-center">
                            <div className="bg-green-100 rounded-full p-4 mb-4">
                                <FaRegStar className="w-8 h-8 text-green-600" />
                            </div>
                            <h4 className="font-semibold mb-2">Choose Provider</h4>
                            <p className="text-gray-600">Select from our top-rated service providers</p>
                        </div>
                        <div className="bg-white shadow-md rounded-lg max-w-xs p-6 flex flex-col items-center text-center">
                            <div className="bg-yellow-100 rounded-full p-4 mb-4">
                                <BsArrowRight className="w-8 h-8 text-yellow-600" />
                            </div>
                            <h4 className="font-semibold mb-2">Book & Relax</h4>
                            <p className="text-gray-600">Schedule your service and let us take care of the rest</p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default HowItWorks;