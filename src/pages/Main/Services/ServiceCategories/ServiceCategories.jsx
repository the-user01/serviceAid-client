import { useState } from "react";
import AvailableServices from "../AvailableServices/AvailableServices";

const ServiceCategories = () => {

    const [selectedCategory, setSelectedCategory] = useState('All')

    const categories = [
        'All',
        'Home Services',
        'Beauty & Salon',
        'Appliance Repair',
        'Cleaning',
        'Education',
        'Health & Wellness',
        'Events',
    ]


    return (
        <div>
            <section className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <h3 className="text-2xl font-semibold mb-6">Service Categories</h3>
                    <div className="flex flex-wrap gap-4">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-lg transition-colors ${selectedCategory === category
                                    ? "bg-primary text-white"
                                    : "border border-primary text-primary hover:bg-primary hover:text-white"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <AvailableServices selectedCategory={selectedCategory}></AvailableServices>

        </div>
    );
};

export default ServiceCategories;