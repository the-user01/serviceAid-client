import { useQuery } from "@tanstack/react-query";
import HelmetHook from "../../../../hooks/HelmetHook";
import useAuth from "../../../../hooks/useAuth";
import useAxios from "../../../../hooks/useAxios";
import { CiStar } from "react-icons/ci";
import { Link } from "react-router-dom";

const ServiceProviderServices = () => {

    const { user } = useAuth()
    const axiosInstance = useAxios();

    const { data: services = [], refetch, isPending: loader } = useQuery({
        queryKey: ['services', user?.email],
        queryFn: async () => {
            const res = await axiosInstance.get(`/services/email/${user?.email}`)
            return res.data
        },
    })


    return (
        <>
            <HelmetHook title="My Services"></HelmetHook>

            <div>
                <section className="py-12">
                    <div className="container mx-auto px-4">

                        {/* Service Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {services.map((service) => (
                                <div key={service._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                                    {/* Service Image */}
                                    <img
                                        src={service.image}
                                        alt={service.serviceName}
                                        className="w-full h-48 object-cover"
                                    />

                                    {/* Service Details */}
                                    <div className="p-4">
                                        <h4 className="font-semibold text-lg mb-2">{service.serviceName}</h4>
                                        <p className="text-gray-600 mb-2">{service.category}</p>

                                        {/* Price and Rating */}
                                        <div className="flex justify-between items-center">
                                            <span className="font-bold text-blue-600">${service.price}/{service.unit} </span>
                                            <div className="flex items-center">
                                                <CiStar className="w-4 h-4 text-yellow-400 mr-1" />
                                                <span>{service.rating}</span>
                                            </div>
                                        </div>

                                        {/* Book Now Button */}
                                        <Link to={`/details/${service._id}`}>
                                            <button className=" mt-2 px-8 py-3 relative shadow-lg w-full before:absolute 
before:top-0 before:left-0 before:w-0 before:h-0 before:border-l-[4px] before:border-t-[4px] before:border-transparent 
hover:before:w-full hover:before:h-full hover:before:border-primary hover:before:transition-all hover:before:duration-500 
after:border-r-[4px] after:border-b-[4px] after:border-transparent hover:after:border-primary 
after:absolute after:bottom-0 after:right-0 after:w-0 
after:h-0 hover:after:w-full hover:after:h-full hover:after:transition-all hover:after:duration-500"> View Details
                                            </button>
                                        </Link>

                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

            </div>
        </>
    );
};

export default ServiceProviderServices;