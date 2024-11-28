import React, { useState } from 'react';
import HelmetHook from '../../../../hooks/HelmetHook';
import useAxios from '../../../../hooks/useAxios';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";

const SendMail = () => {

    const axiosInstance = useAxios()

    const [reportData, setReportData] = useState({
        receiverMail: "",
        subject: "",
        description: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReportData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!reportData.subject || !reportData.description) {
            toast.error("Please fill in all required fields!")
            return;
        }

        axiosInstance.post(`/send-email`, reportData)
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Mail Sent Successfully!",
                });

            setReportData({receiverMail: "", subject: "", description: "" });
        })
    };


    return (
        <>
            <HelmetHook title="Send Mail"></HelmetHook>


            <div className="max-w-4xl mx-auto my-10 p-6 bg-white shadow-xl rounded-md">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Send Email</h1>
                <form onSubmit={handleSubmit}>
                    {/* Subject */}
                    <div className="mb-4">
                        <label htmlFor="receiverMail" className="block text-sm font-medium text-gray-700">
                            To <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="receiverMail"
                            name="receiverMail"
                            value={reportData.receiverMail}
                            onChange={handleChange}
                            placeholder="Enter the receivers mail"
                            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                            Subject <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={reportData.subject}
                            onChange={handleChange}
                            placeholder="Enter the subject of your issue"
                            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={reportData.description}
                            onChange={handleChange}
                            rows="6"
                            placeholder="Describe your problem in detail"
                            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Send Mail
                        </button>
                    </div>
                </form>
                <ToastContainer autoClose={1200}></ToastContainer>
            </div>
        </>
    );
};

export default SendMail;