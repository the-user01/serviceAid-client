import { useState } from "react";
import AvailableServices from "../AvailableServices/AvailableServices";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ServiceCategories = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  // Number of items per page
  const itemsPerPage = 8;

  // Mock total services count (adjust based on fetched data)
  const totalServicesCount = 40; // Example total
  const totalPages = Math.ceil(totalServicesCount / itemsPerPage);

  const categories = [
    "All",
    "Home Services",
    "Beauty & Salon",
    "Appliance Repair",
    "Cleaning",
    "Education",
    "Health & Wellness",
    "Events",
  ];

  // Pagination Handlers
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`mx-1 px-4 py-2 rounded-full transform transition-all duration-300 ${
            currentPage === i
              ? "bg-[#3B9DF8] text-white scale-110 shadow-md"
              : "bg-transparent text-blue-600 hover:bg-blue-100"
          }`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div>
      {/* Categories Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-semibold mb-6">Service Categories</h3>
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedCategory === category
                    ? "bg-primary text-white"
                    : "border border-primary text-primary hover:bg-primary hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Available Services Section */}
      <AvailableServices
        selectedCategory={selectedCategory}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage} // Pass itemsPerPage
      />

      {/* Pagination Section */}
      <div className="flex items-center justify-center mt-8 mb-8 space-x-2">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="mx-1 px-3.5 py-3.5 rounded-full bg-white text-blue-600 hover:bg-blue-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          <FaChevronLeft />
        </button>
        {renderPageNumbers()}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="mx-1 px-3.5 py-3.5 rounded-full bg-white text-blue-600 hover:bg-blue-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default ServiceCategories;
