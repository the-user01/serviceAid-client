import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import useAxios from "../../../../hooks/useAxios";
import { useState } from 'react'
import {AiOutlineLeft } from 'react-icons/ai'
import HelmetHook from "../../../../hooks/HelmetHook";


const ServiceDetails = () => {

    const [selectedDate, setSelectedDate] = useState(null)

    const axiosInstance = useAxios();
    const { id } = useParams();

    const { data: service } = useQuery({
        queryKey: ["service", id],
        queryFn: async () => {
            const res = await axiosInstance.get(`/services/${id}`)
            return res.data
        },
    })


    return (
        <>
        <HelmetHook title={`${service?.serviceName}`}></HelmetHook>
            <div className="container mx-auto px-4 py-8">

                {/* Back Button */}
                <Link to="/services">
                    <button
                        className="relative mb-6 inline-flex items-center justify-center px-3.5 py-2 overflow-hidden font-medium text-primary transition duration-300 ease-out border-2 border-primary rounded-md shadow-md group">

                        <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 translate-x-full bg-primary group-hover:translate-x-0 ease">
                          <AiOutlineLeft className="w-6 h-6"></AiOutlineLeft>
                        </span>
                        
                        <span
                            className="absolute flex items-center justify-center w-full h-full text-primary transition-all duration-300 transform group-hover:translate-x-full ease">Back to Services</span>
                        <span className="relative invisible">Back to Services</span>
                    </button>
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Service Details Section */}
                    <div className="lg:col-span-2">
                        <div className="border rounded-lg shadow-lg p-4">
                            <h2 className="text-xl font-bold mb-2">{service?.serviceName}</h2>
                            <p className="text-gray-600 mb-4">Provided by <span className="font-semibold text-blue-600">{service?.providerName}</span></p>
                            <img
                                src={service?.image}
                                alt={service?.serviceName}
                                className="w-full h-80 object-cover rounded-md mb-4"
                            />
                            <p className="text-gray-600 mb-4">{service?.description}</p>
                            <div className="flex items-center space-x-4 text-gray-700 text-sm">

                                <div className="text-lg font-bold text-blue-600">
                                    ${service?.price}/{service?.unit}
                                </div>

                                {/* <div className="flex items-center">
                                    <AiFillStar className="mr-1 text-yellow-500" />
                                    {service.rating} ({service.reviewCount} reviews)
                                </div> */}

                            </div>
                        </div>

                        {/* Reviews Section */}
                        {/* <div className="border rounded-lg shadow-lg p-4 mt-6">
                            <h3 className="text-lg font-bold mb-4">Customer Reviews</h3>
                            <div className="space-y-4">
                                {service.reviews.map((review) => (
                                    <div key={review.id} className="border-b pb-4">
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium">{review.user}</span>
                                            <div className="flex items-center">
                                                {Array.from({ length: review.rating }).map((_, index) => (
                                                    <AiFillStar key={index} className="text-yellow-500" />
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-gray-600">{review.comment}</p>
                                        <p className="text-sm text-gray-400">{review.date}</p>
                                    </div>
                                ))}
                            </div>
                        </div> */}

                    </div>

                    {/* Booking Section */}
                    <div>
                        <div className="border rounded-lg shadow-lg p-4">
                            <h3 className="text-lg font-bold mb-4">Book This Service</h3>

                            <div className="mb-4">
                                <h4 className="font-semibold mb-2">Select a Date</h4>
                                <div className="grid grid-cols-3 gap-2">
                                    {service?.availability?.days.map((day) => (
                                        <button
                                            key={day}
                                            onClick={() => setSelectedDate(day)}
                                            className={`px-4 py-2 border rounded-md ${selectedDate === day
                                                ? "bg-blue-500 text-white"
                                                : "bg-gray-100 hover:bg-gray-200"
                                                }`}
                                        >
                                            {day}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-4">
                                <h3 className="font-semibold mb-2">Available Hours</h3>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="px-4 py-2 bg-blue-500 text-white rounded-md text-center font-semibold">
                                        {service?.availability?.hours}
                                    </div>
                                </div>
                            </div>

                            <button className=" mt-2 px-8 py-3 relative shadow-xl w-full before:absolute 
before:top-0 before:left-0 before:w-0 before:h-0 before:border-l-[4px] before:border-t-[4px] before:border-transparent 
hover:before:w-full hover:before:h-full hover:before:border-primary hover:before:transition-all hover:before:duration-700 
after:border-r-[4px] after:border-b-[4px] after:border-transparent hover:after:border-primary 
after:absolute after:bottom-0 after:right-0 after:w-0 
after:h-0 hover:after:w-full hover:after:h-full hover:after:transition-all hover:after:duration-500"> Book Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ServiceDetails;