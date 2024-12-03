import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../../hooks/useAxios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AdminHome = () => {
  const axiosInstance = useAxios();

  const { data: users = [], isPending: loader } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosInstance.get("/users");
      return res.data;
    },
  });

  const { data: messages = [] } = useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const res = await axiosInstance.get("/services");
      return res.data;
    },
  });

  const { data: bookings = [] } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/bookings`);
      return res.data;
    },
  });

  // Process bookings to calculate revenue by service name
  const chartData = bookings
    .filter((booking) => booking.status === "Completed") // Only completed bookings
    .reduce((acc, booking) => {
      const existingService = acc.find(
        (service) => service.name === booking.serviceName
      );
      if (existingService) {
        existingService.billAmount += booking.billAmount;
      } else {
        acc.push({
          name: booking.serviceName,
          billAmount: booking.billAmount,
        });
      }
      return acc;
    }, []);

  return (
    <>
      {loader ? (
        <div className="mt-2 text-center">
          <span className="loading loading-dots loading-lg"></span>
        </div>
      ) : (
        <>
          <main className="p-6 bg-gray-100 min-h-screen">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Dashboard
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {/* Total Users */}
                <div className={`p-6 rounded-lg shadow-md bg-blue-200 text-blue-800`}>
                  <h3 className="text-md font-medium">Total Users</h3>
                  <p className="mt-4 text-4xl font-extrabold">
                    {users.filter(
                      (user) => user.role !== "Admin" && user.status === "Pending"
                    ).length + 1}
                  </p>
                </div>

                {/* Active Services */}
                <div className={`p-6 rounded-lg shadow-md bg-green-200 text-green-800`}>
                  <h3 className="text-md font-medium">Active Services</h3>
                  <p className="mt-4 text-4xl font-extrabold">{messages.length}</p>
                </div>

                {/* Total Bookings */}
                <div className={`p-6 rounded-lg shadow-md bg-yellow-200 text-yellow-800`}>
                  <h3 className="text-md font-medium">Total Bookings</h3>
                  <p className="mt-4 text-4xl font-extrabold">{bookings.length}</p>
                </div>

                {/* Total Revenue */}
                <div className={`p-6 rounded-lg shadow-md bg-red-200 text-red-800`}>
                  <h3 className="text-md font-medium">Total Revenue</h3>
                  <p className="mt-4 text-4xl font-extrabold">
                    $
                    {bookings
                      .filter(
                        (booking) =>
                          typeof booking.billAmount === "number" &&
                          !isNaN(booking.billAmount)
                      )
                      .reduce((total, booking) => total + booking.billAmount, 0)
                      .toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Bar Chart */}
              <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Revenue by Service</h3>
                <div className="w-full h-96">
                  <ResponsiveContainer>
                    <BarChart
                      data={chartData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="billAmount" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </main>
        </>
      )}
    </>
  );
};

export default AdminHome;
