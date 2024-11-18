import { BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";
import { CgFacebook } from "react-icons/cg";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-white boxShadow rounded-xl w-full p-3 lg:p-4 relative">

            <div
                className="w-full flex items-center justify-center pt-[30px] flex-col gap-[20px] pb-[130px]">

                <div className="flex items-center justify-center w-full h-full bg-white p-8">
                    <svg
                        className="w-10 h-10 lg:w-14 lg:h-14" // Adjust size for different screen sizes
                        viewBox="0 0 200 200"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {/* Circle background */}
                        <circle cx="100" cy="100" r="90" fill="#3B82F6" />

                        {/* Gear icon */}
                        <path d="M100 70C83.4315 70 70 83.4315 70 100C70 116.569 83.4315 130 100 130C116.569 130 130 116.569 130 100C130 83.4315 116.569 70 100 70ZM100 120C89.0543 120 80 110.946 80 100C80 89.0543 89.0543 80 100 80C110.946 80 120 89.0543 120 100C120 110.946 110.946 120 100 120Z" fill="white" />
                        <path d="M145 95H140.84C140.397 92.3038 139.563 89.6879 138.36 87.24L141.22 84.38C142.002 83.5979 142.002 82.3421 141.22 81.56L138.44 78.78C137.658 77.9979 136.402 77.9979 135.62 78.78L132.76 81.64C130.312 80.4368 127.696 79.6031 125 79.16V75C125 73.8954 124.105 73 123 73H117C115.895 73 115 73.8954 115 75V79.16C112.304 79.6031 109.688 80.4368 107.24 81.64L104.38 78.78C103.598 77.9979 102.342 77.9979 101.56 78.78L98.78 81.56C97.9979 82.3421 97.9979 83.5979 98.78 84.38L101.64 87.24C100.437 89.6879 99.6031 92.3038 99.16 95H95C93.8954 95 93 95.8954 93 97V103C93 104.105 93.8954 105 95 105H99.16C99.6031 107.696 100.437 110.312 101.64 112.76L98.78 115.62C97.9979 116.402 97.9979 117.658 98.78 118.44L101.56 121.22C102.342 122.002 103.598 122.002 104.38 121.22L107.24 118.36C109.688 119.563 112.304 120.397 115 120.84V125C115 126.105 115.895 127 117 127H123C124.105 127 125 126.105 125 125V120.84C127.696 120.397 130.312 119.563 132.76 118.36L135.62 121.22C136.402 122.002 137.658 122.002 138.44 121.22L141.22 118.44C142.002 117.658 142.002 116.402 141.22 115.62L138.36 112.76C139.563 110.312 140.397 107.696 140.84 105H145C146.105 105 147 104.105 147 103V97C147 95.8954 146.105 95 145 95Z" fill="white" />

                        {/* Helping hand icon */}
                        <path d="M70 130C70 130 65 140 60 140C55 140 50 135 50 130C50 125 55 120 60 120C65 120 70 125 70 130Z" fill="white" />
                        <path d="M90 140C90 140 85 150 80 150C75 150 70 145 70 140C70 135 75 130 80 130C85 130 90 135 90 140Z" fill="white" />
                        <path d="M110 150C110 150 105 160 100 160C95 160 90 155 90 150C90 145 95 140 100 140C105 140 110 145 110 150Z" fill="white" />
                        <path d="M50 130C50 130 60 125 70 130C80 135 90 140 100 140C110 140 120 135 130 130" stroke="white" strokeWidth="5" strokeLinecap="round" />
                    </svg>

                    <h1 className="text-xl font-bold text-blue-600 ml-4 md:text-2xl lg:text-4xl">ServiceAid</h1>
                </div>

                <p className="text-[0.9rem] text-center sm:text-start text-gray-600">Connecting you with trusted experts, whenever you need a helping hand.
                </p>

                <Link to="/contact" className="py-3 px-6 rounded-full bg-primary text-white">
                    <button>Contact Us</button>
                </Link>

                <div className="flex gap-[15px] text-black mt-4">
                    <a className="text-[1.3rem] p-1.5 cursor-pointer rounded-full bg-white text-text boxShadow">
                        <CgFacebook />
                    </a>
                    <a className="text-[1.2rem] p-1.5 cursor-pointer rounded-full bg-white text-text boxShadow">
                        <BsTwitter />
                    </a>
                    <a className="text-[1.2rem] p-1.5 cursor-pointer rounded-full bg-white text-text boxShadow">
                        <BsInstagram />
                    </a>
                    <a className="text-[1.2rem] p-1.5 cursor-pointer rounded-full bg-white text-text boxShadow">
                        <BsLinkedin />
                    </a>
                </div>
            </div>

            <div
                className="z-30 absolute bottom-3 left-0 right-0 px-3 flex items-center justify-between w-full">
                <p className="text-[0.9rem] text-gray-300">© 2024 All Rights Reserved</p>
            </div>

            <img src="https://i.ibb.co/zNk7XT4/Rectangle-97.png" alt="background/image"
                className="absolute bottom-[20px] sm:bottom-0 left-0 right-0 z-10 rounded-b-xl" />
            <img src="https://i.ibb.co/0mp2FwS/Rectangle-95.png"
                alt="background/image"
                className="absolute bottom-0 left-0 right-0 z-10 rounded-b-xl" />
        </footer>
    );
};

export default Footer;