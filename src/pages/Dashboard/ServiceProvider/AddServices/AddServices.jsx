import React, { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

const AddServices = () => {

  const [newService, setNewService] = useState({
    serviceName: "",
    description: "",
    category: "",
    price: "",
    unit: "per hour",
    availability: {
      days: [],
      hours: "",
    },
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService((prev) => ({ ...prev, [name]: value }));
  };

  const handleDayChange = (day) => {
    setNewService((prev) => ({
      ...prev,
      availability: {
        ...prev.availability,
        days: prev.availability.days.includes(day)
          ? prev.availability.days.filter((d) => d !== day)
          : [...prev.availability.days, day],
      },
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewService((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newId =
      services.length > 0 ? Math.max(...services.map((s) => s.id)) + 1 : 1;
    setServices([
      ...services,
      {
        ...newService,
        id: newId,
        providerName: "John Doe",
        providerEmail: "john@example.com",
      },
    ]);
    setNewService({
      serviceName: "",
      description: "",
      category: "",
      price: "",
      unit: "per hour",
      availability: {
        days: [],
        hours: "",
      },
      image: null,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Manage Services</h1>

      {/* Add Service Form */}
      <div className="w-full max-w-3xl bg-white shadow-md rounded-md p-6 mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Add New Service
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="serviceName" className="block text-sm font-medium">
              Service Name
            </label>
            <input
              id="serviceName"
              name="serviceName"
              value={newService.serviceName}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={newService.category}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select a category</option>
              <option value="Home Services">Home Services</option>
              <option value="Beauty & Salon">Beauty & Salon</option>
              <option value="Appliance Repair">Appliance Repair</option>
              <option value="Cleaning">Cleaning</option>
              <option value="Education">Education</option>
              <option value="Health & Wellness">Health & Wellness</option>
              <option value="Events">Events</option>
            </select>
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={newService.description}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="price" className="block text-sm font-medium">
                Price
              </label>
              <input
                id="price"
                name="price"
                type="number"
                value={newService.price}
                onChange={handleInputChange}
                required
                className="w-full p-2 border rounded-md"
              />
            </div>
            <div>
              <label htmlFor="unit" className="block text-sm font-medium">
                Unit
              </label>
              <select
                id="unit"
                name="unit"
                value={newService.unit}
                onChange={handleInputChange}
                required
                className="w-full p-2 border rounded-md"
              >
                <option value="per hour">Per Hour</option>
                <option value="per day">Per Day</option>
                <option value="per service">Per Service</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium">Availability</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ].map((day) => (
                <div key={day} className="flex items-center">
                  <input
                    type="checkbox"
                    id={day}
                    checked={newService.availability.days.includes(day)}
                    onChange={() => handleDayChange(day)}
                    className="mr-2"
                  />
                  <label htmlFor={day} className="text-sm">
                    {day}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="hours" className="block text-sm font-medium">
              Working Hours
            </label>
            <input
              id="hours"
              name="hours"
              value={newService.availability.hours}
              onChange={(e) =>
                setNewService((prev) => ({
                  ...prev,
                  availability: { ...prev.availability, hours: e.target.value },
                }))
              }
              placeholder="e.g. 9:00 AM - 5:00 PM"
              required
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium">
              Service Image
            </label>
            <input
              id="image"
              type="file"
              onChange={handleImageUpload}
              accept="image/*"
              className="w-full p-2 border rounded-md"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Add Service
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddServices;
