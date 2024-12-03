import { useState } from "react";
import { format } from "date-fns";
import { RxCross1 } from "react-icons/rx";

const AdminCalender = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const years = Array.from({ length: 2050 - 2023 + 1 }, (_, i) => 2023 + i);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const sampleEvents = {
    "2024-11-25": ["Plumbing Repair", "Washing Machine Repair", "Tutoring Services", "Haircut & Styling"],
    "2024-12-19": ["Tutoring Services", "Facial Treatment", "Hitter Machine Repair"],
    "2024-12-01": ["Haircut & Styling", "Carpet Cleaning"],
    "2024-12-20": ["Refrigerator Repair", "Yoga Classes"],
    "2024-12-22": ["Window Cleaning", "Carpet Cleaning", "Online Course"],
  };

  const renderCalendar = (year, monthIndex) => {
    const firstDay = new Date(year, monthIndex, 1);
    const lastDay = new Date(year, monthIndex + 1, 0);
    const daysInMonth = Array.from(
      { length: lastDay.getDate() },
      (_, i) => i + 1
    );

    const paddingDays = Array.from(
      { length: firstDay.getDay() },
      () => ""
    );

    const allDays = [...paddingDays, ...daysInMonth];

    return (
      <div key={monthIndex} className="mb-8">
        <h3 className="text-lg font-semibold mb-4">{months[monthIndex]}</h3>
        <div className="grid grid-cols-7 gap-2 text-center">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="font-medium">{day}</div>
          ))}
          {allDays.map((day, index) => {
            const date = day
              ? format(new Date(year, monthIndex, day), "yyyy-MM-dd")
              : null;

            const hasEvents = sampleEvents[date];

            return (
              <div
                key={index}
                className={`h-12 w-12 flex flex-col items-center justify-center rounded-md cursor-pointer ${
                  day
                    ? "bg-gray-100 hover:bg-blue-500 hover:text-white"
                    : "invisible"
                }`}
                onClick={() => {
                  if (day) {
                    setSelectedDate(date);
                    setModalOpen(true);
                  }
                }}
              >
                <p>{day}</p>
                {hasEvents && <div className="w-2 h-2 mt-1 bg-red-500 rounded-full"></div>}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Calendar</h1>
        <select
          className="border border-gray-300 rounded-lg px-6 py-2 cursor-pointer"
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
        >
          {years.map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {months.map((_, index) => renderCalendar(selectedYear, index))}
      </div>

      {/* Modal */}
      {modalOpen && selectedDate && (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
        >
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
              onClick={() => setModalOpen(false)}
            >
              <RxCross1 size={24} />
            </button>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Bookings for {format(new Date(selectedDate), "EEEE, MMMM d")}
            </h2>
            <div className="space-y-4">
              {sampleEvents[selectedDate] ? (
                sampleEvents[selectedDate].map((event, index) => (
                  <div key={index} className="p-4 border rounded-md bg-gray-100">
                    <h3 className="font-bold">{event}</h3>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No events for this day.</p>
              )}
            </div>
            <button
              onClick={() => setModalOpen(false)}
              className="mt-6 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCalender;
