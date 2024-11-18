
const ReadytoExperiance = () => {
    return (
        <div>
            <section className="bg-blue-900 text-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h3 className="text-3xl font-bold mb-4">Ready to experience the ServiceAid difference?</h3>
                    <p className="text-xl mb-8">Join thousands of satisfied customers and service providers today.</p>

                    <button className="px-8 py-3 relative bg-white text-black shadow-lg before:absolute 
before:top-0 before:left-0 before:w-0 before:h-0 before:border-l-[4px] before:border-t-[4px] before:border-transparent 
hover:before:w-full hover:before:h-full hover:before:border-error hover:before:transition-all hover:before:duration-500 
after:border-r-[4px] after:border-b-[4px] after:border-transparent hover:after:border-error 
after:absolute after:bottom-0 after:right-0 after:w-0 
after:h-0 hover:after:w-full hover:after:h-full hover:after:transition-all hover:after:duration-500"> Get Started Now
                    </button>
                </div>
            </section>

        </div>
    );
};

export default ReadytoExperiance;