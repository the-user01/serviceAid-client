const Mission = () => {
    return (
        <div>
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center">
                        <h3 className="text-3xl font-semibold mb-6">Our Mission</h3>
                        <p className="text-xl mb-12">To simplify the process of finding and booking reliable services, empowering both customers and service providers to create better communities.</p>
                        <div className="grid md:grid-cols-3 gap-8">
                            <div>
                                <h4 className="text-xl font-semibold mb-2">Trust</h4>
                                <p>We build trust through transparency and our commitment to quality service.</p>
                            </div>
                            <div>
                                <h4 className="text-xl font-semibold mb-2">Innovation</h4>
                                <p>We continuously innovate to improve the service experience for all our users.</p>
                            </div>
                            <div>
                                <h4 className="text-xl font-semibold mb-2">Community</h4>
                                <p>We foster a sense of community among our users and service providers.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Mission;