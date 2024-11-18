
const AboutBanner = ({ heading, text }) => {
    return (
        <div>
            {/* <section className="bg-blue-600 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-4">{heading}</h2>
                    <p className="text-xl mb-8">{text}</p>
                </div>
            </section> */}

            <div className="relative flex items-center justify-center h-80 bg-gradient-to-r from-blue-500 to-indigo-600 overflow-hidden">
                {/* Animated Background Circles */}
                <div className="absolute w-64 h-64 bg-white opacity-20 rounded-full blur-lg top-10 left-10 animate-move1"></div>
                <div className="absolute w-40 h-40 bg-white opacity-20 rounded-full blur-lg bottom-10 right-20 animate-move2"></div>
                <div className="absolute w-48 h-48 bg-white opacity-10 rounded-full blur-lg top-16 right-32 animate-move3"></div>

                {/* Content */}
                <div className="relative z-10 text-center text-white px-4">
                    <h1 className="text-4xl font-bold mb-2">{heading}</h1>
                    <p className="text-lg">{text}</p>
                </div>

                {/* CSS Animations */}
                <style jsx>{`
    @keyframes move1 {
      0%, 100% { transform: translate(0, 0); }
      50% { transform: translate(20px, -20px); }
    }
    @keyframes move2 {
      0%, 100% { transform: translate(0, 0); }
      50% { transform: translate(-15px, 15px); }
    }
    @keyframes move3 {
      0%, 100% { transform: translate(0, 0); }
      50% { transform: translate(10px, -10px); }
    }
    .animate-move1 {
      animation: move1 6s ease-in-out infinite;
    }
    .animate-move2 {
      animation: move2 8s ease-in-out infinite;
    }
    .animate-move3 {
      animation: move3 10s ease-in-out infinite;
    }
  `}</style>
            </div>


        </div>
    );
};

export default AboutBanner;