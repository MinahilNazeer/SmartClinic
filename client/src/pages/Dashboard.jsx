import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../services/api";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {
  const [stats, setStats] = useState({
    totalPatients: 0,
    totalDoctors: 0,
    totalAppointments: 0,
    totalRevenue: 0,
  });

  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchDashboard();
    fetchPatients();
    fetchAppointments();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/dashboard");
      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPatients = async () => {
    try {
      const res = await api.get("/patients");
      setPatients(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAppointments = async () => {
    try {
      const res = await api.get("/appointments");
      setAppointments(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const appointmentStats = [
    {
      name: "Scheduled",
      value: appointments.filter(
        (a) => a.status === "Scheduled"
      ).length,
    },
    {
      name: "Completed",
      value: appointments.filter(
        (a) => a.status === "Completed"
      ).length,
    },
    {
      name: "Cancelled",
      value: appointments.filter(
        (a) => a.status === "Cancelled"
      ).length,
    },
  ];

  const COLORS = ["#3B82F6", "#22C55E", "#EF4444"];

  return (
    <DashboardLayout>
      <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">
        Dashboard
      </h1>

      {/* Statistics Cards */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white shadow rounded-xl p-4 md:p-6 h-full">
          <h3 className="text-gray-500">Patients</h3>
          <p className="text-2xl md:text-3xl font-bold mt-2">
            {stats.totalPatients}
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-4 md:p-6 h-full">
          <h3 className="text-gray-500">Doctors</h3>
          <p className="text-2xl md:text-3xl font-bold mt-2">
            {stats.totalDoctors}
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-4 md:p-6 h-full">
          <h3 className="text-gray-500">Appointments</h3>
          <p className="text-2xl md:text-3xl font-bold mt-2">
            {stats.totalAppointments}
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-4 md:p-6 h-full">
          <h3 className="text-gray-500">Revenue</h3>
          <p className="text-2xl md:text-3xl font-bold mt-2 wrap-break-words">
            Rs. {stats.totalRevenue}
          </p>
        </div>
      </div>

      {/* Chart & Recent Patients */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">
        <div className="bg-white shadow rounded-xl p-4 md:p-6">
          <h2 className="text-xl font-bold mb-4">
            Appointment Statistics
          </h2>

          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={appointmentStats}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label
                >
                  {appointmentStats.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white shadow rounded-xl p-4 md:p-6">
          <h2 className="text-xl font-bold mb-4">
            Recent Patients
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm md:text-base">
              <thead className="bg-emerald-900 text-white">
                <tr>
                  <th className="p-3">Name</th>
                  
                  <th>Phone</th>
                </tr>
              </thead>

              <tbody>
                {patients
                  .slice(-5)
                  .reverse()
                  .map((patient) => (
                    <tr
                      key={patient._id}
                      className="border-b text-center"
                    >
                      <td className="p-3">{patient.name}</td>

                      <td>{patient.phone}</td>
                    </tr>
                  ))}

                {patients.length === 0 && (
                  <tr>
                    <td
                      colSpan="3"
                      className="p-5 text-center text-gray-500"
                    >
                      No patients found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;