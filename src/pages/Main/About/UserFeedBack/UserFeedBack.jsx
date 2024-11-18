import { FaStar } from "react-icons/fa";

const UserFeedBack = () => {

    const testimonials = [
        { name: 'Alex Thompson', role: 'Homeowner', content: 'ServiceAid has been a lifesaver! I found reliable plumbers and electricians quickly and easily.', rating: 5 },
        { name: 'Emily Chen', role: 'Small Business Owner', content: 'As a busy entrepreneur, ServiceAid helps me manage all my business maintenance needs efficiently.', rating: 5 },
        { name: 'Michael Rodriguez', role: 'Service Provider', content: 'Joining ServiceAid has helped me grow my business and connect with new clients. Highly recommended!', rating: 4 },
    ]

    return (
        <div>
            <section className="py-16 bg-gray-100">
                <div className="container mx-auto px-4">
                    <h3 className="text-3xl font-semibold mb-12 text-center">What Our Users Say</h3>
                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                                <p className="mb-4">{testimonial.content}</p>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h4 className="font-semibold">{testimonial.name}</h4>
                                        <p className="text-gray-600 text-sm">{testimonial.role}</p>
                                    </div>
                                    <div className="flex">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <FaStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default UserFeedBack;