
const TimeLine = () => {
    return (
        <div>
            <section className="py-16 bg-gray-100">
                <div className="container mx-auto px-4">
                    <h3 className="text-3xl font-semibold mb-12 text-center">Our Journey</h3>
                    <div className="max-w-4xl mx-auto">
                        <div className="relative">
                            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200"></div>
                            <div className="relative z-10">
                                <div className="mb-8 flex items-center">
                                    <div className="flex-shrink-0 bg-blue-600 rounded-full h-8 w-8 flex items-center justify-center">
                                        <span className="text-white font-semibold">1</span>
                                    </div>
                                    <div className="ml-6">
                                        <h4 className="text-lg font-semibold">2020: ServiceAid is Born</h4>
                                        <p className="mt-1">Founded with the vision to revolutionize the service industry.</p>
                                    </div>
                                </div>
                                <div className="mb-8 flex items-center">
                                    <div className="flex-shrink-0 bg-blue-600 rounded-full h-8 w-8 flex items-center justify-center">
                                        <span className="text-white font-semibold">2</span>
                                    </div>
                                    <div className="ml-6">
                                        <h4 className="text-lg font-semibold">2021: Rapid Growth</h4>
                                        <p className="mt-1">Expanded to 10 major cities and onboarded 1000+ service providers.</p>
                                    </div>
                                </div>
                                <div className="mb-8 flex items-center">
                                    <div className="flex-shrink-0 bg-blue-600 rounded-full h-8 w-8 flex items-center justify-center">
                                        <span className="text-white font-semibold">3</span>
                                    </div>
                                    <div className="ml-6">
                                        <h4 className="text-lg font-semibold">2022: Mobile App Launch</h4>
                                        <p className="mt-1">Introduced our mobile app for iOS and Android platforms.</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 bg-blue-600 rounded-full h-8 w-8 flex items-center justify-center">
                                        <span className="text-white font-semibold">4</span>
                                    </div>
                                    <div className="ml-6">
                                        <h4 className="text-lg font-semibold">2023: Going National</h4>
                                        <p className="mt-1">Expanded our services nationwide, serving millions of customers.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default TimeLine;