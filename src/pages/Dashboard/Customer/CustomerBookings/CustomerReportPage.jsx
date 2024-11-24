import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import HelmetHook from "../../../../hooks/HelmetHook";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import useAxios from "../../../../hooks/useAxios";

const CustomerReportPage = () => {

    const { id } = useParams()

    const axiosInstance = useAxios()
    const navigate = useNavigate()

    const [reportData, setReportData] = useState({
        subject: "",
        description: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReportData((prev) => ({ ...prev, [name]: value }));
    };

    // const handleFileChange = (e) => {
    //     setReportData((prev) => ({ ...prev, file: e.target.files[0] }));
    // };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!reportData.subject || !reportData.description) {
            toast.error("Please fill in all required fields!")
            return;
        }

        axiosInstance.patch(`/bookings/report/${id}`, reportData)
            .then(() => {
                Swal.fire({
                    icon: "success",
                    title: "Report Submitted",
                    text: "Thank you for submitting your report. We will get back to you soon!",
                });

                // Reset the form
                setReportData({ subject: "", description: ""});
                navigate('/dashboard/customer-booking')
            })


    };

    return (
        <>

            <HelmetHook title="Report"></HelmetHook>


            <div className="max-w-4xl mx-auto my-10 p-6 bg-white shadow-xl rounded-md">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Submit a Report</h1>
                <form onSubmit={handleSubmit}>
                    {/* Subject */}
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

                    {/* File Upload */}
                    {/* <div className="mb-4">
                    <label htmlFor="file" className="block text-sm font-medium text-gray-700">
                        Upload File (Optional)
                    </label>
                    <input
                        type="file"
                        id="file"
                        name="file"
                        onChange={handleFileChange}
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                </div> */}

                    {/* Submit Button */}
                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Submit Report
                        </button>
                    </div>
                </form>
                <ToastContainer autoClose={1200}></ToastContainer>
            </div>
        </>


    );
};

export default CustomerReportPage;
