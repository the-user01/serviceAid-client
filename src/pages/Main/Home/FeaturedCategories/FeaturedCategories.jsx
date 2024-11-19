import { useQuery } from "@tanstack/react-query";
import { BiChevronDown } from "react-icons/bi";
import useAxios from "../../../../hooks/useAxios";
import { Link } from "react-router-dom";

const FeaturedCategories = () => {

    const axiosInstance = useAxios();

    const getRandomServices = (services, count) => {
        const shuffled = [...services].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    };

    const { data: services = [] } = useQuery({
        queryKey: ['services'],
        queryFn: async () => {
            const res = await axiosInstance.get('/services');
            return res.data;
        },
    });

    // Get 4 random services
    const randomServices = getRandomServices(services, 4);


    return (
        <div>
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h3 className="text-2xl font-semibold mb-8">Featured Categories</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {randomServices.map((category) => (
                            <div key={category._id} className="bg-base-100 shadow-md rounded-lg overflow-hidden">
                                <img src={category.image} alt={category.category} className="w-full h-40 object-cover" />
                                <div className="p-4">
                                    <h4 className="font-semibold">{category.category}</h4>
                                    <Link to='/services' href="#" className="text-primary flex items-center mt-2">
                                        View Services
                                        <BiChevronDown className="ml-1 w-4 h-4" />
                                    </Link>
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