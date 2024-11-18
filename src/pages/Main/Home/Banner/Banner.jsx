import { BiSearch } from "react-icons/bi";

const Banner = ({ heading, text }) => {
    return (
        <div>
            <div className="relative flex items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-purple-600 overflow-hidden">
                {/* Blurred Circles */}
                <div className="absolute w-72 h-72 bg-blue-400 rounded-full blur-3xl opacity-20 top-10 left-10"></div>
                <div className="absolute w-72 h-72 bg-pink-400 rounded-full blur-3xl opacity-20 bottom-20 right-20"></div>

                {/* Hero Content */}
                <div className="relative z-10 text-center text-white max-w-2xl px-4">
                    <h1 className="text-5xl font-bold mb-4 leading-tight">{heading}</h1>
                    <p className="mb-6 text-lg">{text}</p>

                    {/* Search Bar */}
                    <div className="flex items-center justify-center gap-2 max-w-lg mx-auto bg-white/90 rounded-lg shadow-lg p-2 backdrop-blur-lg">
                        <input
                            type="text"
                            placeholder="What service do you need?"
                            className="flex-grow px-4 py-3 text-gray-700 rounded-l-lg outline-none"
                        />
                        <button className="px-6 py-3 text-white font-semibold bg-gradient-to-r from-teal-400 to-blue-500 rounded-r-lg hover:from-teal-500 hover:to-blue-600 transition">
                            <span className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M3 10a7 7 0 1014 0 7 7 0 00-14 0z" />
                                </svg>
                                Search
                            </span>
                        </button>
                    </div>
                </div>

                {/* Light Particle Effect */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute w-1 h-1 bg-white rounded-full opacity-75 animate-pulse top-16 left-32"></div>
                    <div className="absolute w-2 h-2 bg-white rounded-full opacity-50 animate-ping bottom-32 right-24"></div>
                    <div className="absolute w-3 h-3 bg-white rounded-full opacity-25 animate-ping top-40 right-40"></div>
                </div>
            </div>


        </div>
    );
};

export default Banner;