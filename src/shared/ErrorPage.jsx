import React from 'react';
import HelmetHook from '../hooks/HelmetHook';
import { useState, useEffect } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { Link } from 'react-router-dom';

const ErrorPage = () => {

    const [gearRotation, setGearRotation] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setGearRotation((prevRotation) => prevRotation + 1);
        }, 10);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <HelmetHook title="Error"></HelmetHook>
            
            <div>
                <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-md w-full space-y-8">
                        <div className="text-center">
                            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Oops! Page Not Found</h2>
                            <p className="mt-2 text-sm text-gray-600">
                                The page you're looking for doesn't exist or has been moved.
                            </p>
                        </div>

                        <div className="flex justify-center">
                            <div className="relative w-64 h-64">
                                {/* Dynamic Gears Illustration */}
                                <svg
                                    className="w-full h-full text-blue-600"
                                    viewBox="0 0 100 100"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    {/* Large Gear */}
                                    <g style={{ transform: `rotate(${gearRotation}deg)`, transformOrigin: "center" }}>
                                        <circle cx="50" cy="50" r="40" />
                                        <path d="M50 10 L50 0 M50 90 L50 100 M10 50 L0 50 M90 50 L100 50" />
                                        <path d="M22 22 L15 15 M78 22 L85 15 M22 78 L15 85 M78 78 L85 85" />
                                    </g>
                                    {/* Small Gear */}
                                    <g style={{ transform: `rotate(${-gearRotation * 2}deg)`, transformOrigin: "75px 75px" }}>
                                        <circle cx="75" cy="75" r="20" />
                                        <path d="M75 55 L75 50 M75 95 L75 100 M55 75 L50 75 M95 75 L100 75" />
                                        <path d="M61 61 L57 57 M89 61 L93 57 M61 89 L57 93 M89 89 L93 93" />
                                    </g>
                                    {/* Question Mark */}
                                    <text x="42" y="62" fontSize="30" fill="currentColor">?</text>
                                </svg>
                                {/* Animated Wrench */}
                                <svg
                                    className="absolute top-0 left-0 w-full h-full text-blue-600 animate-bounce"
                                    viewBox="0 0 100 100"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M30 70 L45 85 L70 60 L80 70 L70 80 L80 90 L70 80 L60 90" />
                                </svg>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                            <Link to="/"  className="btn btn-primary ">
                                <button
                                   className='flex items-center justify-center'
                                    onClick={() => (window.location.href = "/")}
                                >
                                    <AiOutlineHome className="w-4 h-4 mr-2" />
                                    Home Page
                                </button>
                            </Link>
                        </div>
                    </div>
                </main>
            </div>

        </>
    );
};

export default ErrorPage;