import { BiChevronDown } from "react-icons/bi";

const FeaturedCategories = () => {
    const categories = [
        { name: 'Home Services', image: '/placeholder.svg?height=100&width=100' },
        { name: 'Beauty & Salon', image: '/placeholder.svg?height=100&width=100' },
        { name: 'Appliance Repair', image: '/placeholder.svg?height=100&width=100' },
        { name: 'Cleaning', image: '/placeholder.svg?height=100&width=100' },
    ]

    return (
        <div>
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h3 className="text-2xl font-semibold mb-8">Featured Categories</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {categories.map((category, index) => (
                            <div key={index} className="bg-base-100 shadow-md rounded-lg overflow-hidden">
                                <img src={category.image} alt={category.name} className="w-full h-40 object-cover" />
                                <div className="p-4">
                                    <h4 className="font-semibold">{category.name}</h4>
                                    <a href="#" className="text-primary flex items-center mt-2">
                                        View Services
                                        <BiChevronDown className="ml-1 w-4 h-4" />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </div>
    );
};

export default FeaturedCategories;