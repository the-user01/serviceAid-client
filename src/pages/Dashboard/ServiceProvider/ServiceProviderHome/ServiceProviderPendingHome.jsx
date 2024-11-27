import { useNavigate } from 'react-router-dom';
import HelmetHook from '../../../../hooks/HelmetHook';

const ServiceProviderPendingHome = () => {

    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/');
    };


    return (
        <>
            <HelmetHook title="Waaiting Page"></HelmetHook>

            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
                {/* Animation Container */}
                <div className="">
                    <img
                        src="https://i.ibb.co.com/yVgMmkt/photo-1703124687062-f48f0be69ea3.jpg" // Replace this with your cartoon image URL
                        alt="Cartoon Waiting"
                        className="w-96 h-60 rounded-md shadow-lg"
                    />
                </div>

                {/* Text */}
                <h1 className="text-2xl font-bold text-gray-800 mt-6">
                    Your request is pending approval.
                </h1>
                <p className="text-sm text-gray-600 mt-2">
                    An admin will review and approve your request shortly.
                </p>

                {/* Button */}
                <button
                    onClick={handleRedirect}
                    className="mt-8 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition duration-200"
                >
                    Go Back Home
                </button>
            </div>

        </>
    );
};

export default ServiceProviderPendingHome;