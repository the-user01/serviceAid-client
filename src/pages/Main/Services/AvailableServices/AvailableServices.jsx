import { useState } from "react";
import { CiFilter, CiStar } from "react-icons/ci";

const AvailableServices = ({ selectedCategory }) => {

    const [searchQuery, setSearchQuery] = useState('')

    const services = [
        { name: 'House Cleaning', category: 'Cleaning', price: '$50', rating: 4.8, image: '/placeholder.svg?height=200&width=300' },
        { name: 'Plumbing Repair', category: 'Home Services', price: '$80', rating: 4.7, image: '/placeholder.svg?height=200&width=300' },
        { name: 'Haircut & Styling', category: 'Beauty & Salon', price: '$40', rating: 4.9, image: '/placeholder.svg?height=200&width=300' },
        { name: 'Refrigerator Repair', category: 'Appliance Repair', price: '$100', rating: 4.6, image: '/placeholder.svg?height=200&width=300' },
        { name: 'Math Tutoring', category: 'Education', price: '$30/hr', rating: 4.8, image: '/placeholder.svg?height=200&width=300' },
        { name: 'Yoga Classes', category: 'Health & Wellness', price: '$20/session', rating: 4.7, image: '/placeholder.svg?height=200&width=300' },
        { name: 'Event Photography', category: 'Events', price: '$200', rating: 4.9, image: '/placeholder.svg?height=200&width=300' },
        { name: 'Carpet Cleaning', category: 'Cleaning', price: '$70', rating: 4.5, image: '/placeholder.svg?height=200&width=300' },
    ]

    const filteredServices = services.filter(service =>
        (selectedCategory === 'All' || service.category === selectedCategory) &&
        service.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    return (
        <div>
            <section className="py-12">
                <div className="container mx-auto px-4">
                    {/* Header Section */}
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-semibold">Available Services</h3>
                        <button className="btn btn-outline flex items-center">
                            <CiFilter className="mr-2 w-4 h-4" />
                            Filter
                        </button>
                    </div>

                    {/* Service Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {filteredServices.map((service, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                                {/* Service Image */}
                                <img
                                    src={service.image}
                                    alt={service.name}
                                    className="w-full h-48 object-cover"
                                />

                                {/* Service Details */}
                                <div className="p-4">
                                    <h4 className="font-semibold text-lg mb-2">{service.name}</h4>
                                    <p className="text-gray-600 mb-2">{service.category}</p>

                                    {/* Price and Rating */}
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-blue-600">{service.price}</span>
                                        <div className="flex items-center">
                                            <CiStar className="w-4 h-4 text-yellow-400 mr-1" />
                                            <span>{service.rating}</span>
                                        </div>
                                    </div>

                                    {/* Book Now Button */}
                                    <button className=" mt-2 px-8 py-3 relative shadow-lg w-full before:absolute 
before:top-0 before:left-0 before:w-0 before:h-0 before:border-l-[4px] before:border-t-[4px] before:border-transparent 
hover:before:w-full hover:before:h-full hover:before:border-primary hover:before:transition-all hover:before:duration-500 
after:border-r-[4px] after:border-b-[4px] after:border-transparent hover:after:border-primary 
after:absolute after:bottom-0 after:right-0 after:w-0 
after:h-0 hover:after:w-full hover:after:h-full hover:after:transition-all hover:after:duration-500"> Book Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
};

export default AvailableServices;