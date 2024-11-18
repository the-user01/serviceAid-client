import { CiMail } from "react-icons/ci";
import { FiPhone } from "react-icons/fi";
import { GoClock } from "react-icons/go";
import { IoLocationOutline } from "react-icons/io5";

const ContactOption = () => {
    return (
        <div>
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div>
                            <h3 className="text-2xl font-semibold mb-6">Send Us a Message</h3>
                            <form className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        required
                                        className="input input-bordered w-full"
                                        placeholder="Your Name"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        className="input input-bordered w-full"
                                        placeholder="your@email.com"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                                    <textarea
                                        id="message"
                                        required
                                        className="textarea textarea-bordered w-full"
                                        placeholder="How can we help you?"
                                        rows={4}
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary w-full">Send Message</button>
                            </form>
                        </div>

                        {/* Contact Information */}
                        <div>
                            <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <FiPhone className="w-6 h-6 text-blue-600 mr-4 mt-1" />
                                    <div>
                                        <h4 className="font-semibold">Phone</h4>
                                        <p>+1 (555) 123-4567</p>
                                        <p className="text-sm text-gray-600">Mon-Fri, 9am-6pm EST</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <CiMail className="w-6 h-6 text-blue-600 mr-4 mt-1" />
                                    <div>
                                        <h4 className="font-semibold">Email</h4>
                                        <p>support@serviceaid.com</p>
                                        <p className="text-sm text-gray-600">We aim to respond within 24 hours</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <IoLocationOutline className="w-6 h-6 text-blue-600 mr-4 mt-1" />
                                    <div>
                                        <h4 className="font-semibold">Office</h4>
                                        <p>123 Service Street, Suite 100</p>
                                        <p>New York, NY 10001</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <GoClock className="w-6 h-6 text-blue-600 mr-4 mt-1" />
                                    <div>
                                        <h4 className="font-semibold">Business Hours</h4>
                                        <p>Monday - Friday: 9am - 6pm</p>
                                        <p>Saturday: 10am - 4pm</p>
                                        <p>Sunday: Closed</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map */}
            <section className="py-16 bg-gray-100">
                <div className="container mx-auto px-4">
                    <h3 className="text-2xl font-semibold mb-6 text-center">Our Location</h3>
                    <div className="aspect-w-16 aspect-h-9">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.00425878459418!3d40.74076294379132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c1654f3%3A0xc80f9cfce5383d5d!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1621436689012!5m2!1sen!2sus"
                            width="100%"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            title="ServiceAid Office Location"
                        ></iframe>
                    </div>
                </div>
            </section>
        </div>

    );
};

export default ContactOption;