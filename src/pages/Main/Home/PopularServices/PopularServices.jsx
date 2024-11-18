const PopularServices = () => {

    const popularServices = [
        { name: 'Home Cleaning', icon: '🧹', color: 'bg-blue-100' },
        { name: 'Appliance Repair', icon: '🔧', color: 'bg-green-100' },
        { name: 'Plumbing', icon: '🚰', color: 'bg-yellow-100' },
        { name: 'Electrician', icon: '⚡', color: 'bg-red-100' },
        { name: 'Painting', icon: '🎨', color: 'bg-purple-100' },
        { name: 'Moving', icon: '📦', color: 'bg-orange-100' },
    ]
    
    return (
        <div>
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h3 className="text-2xl font-semibold mb-8">Popular Services</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {popularServices.map((service, index) => (
                            <div key={index} className={`${service.color} p-4 rounded-lg text-center`}>
                                <div className="text-4xl mb-2">{service.icon}</div>
                                <h4 className="font-medium">{service.name}</h4>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default PopularServices;