import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../services/api";

function Bills() {
  const [bills, setBills] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const [formData, setFormData] = useState({
    patient: "",
    doctor: "",
    appointment: "",
    consultationFee: "",
    medicineFee: "",
    totalAmount: "",
    paymentStatus: "Pending",
  });

  useEffect(() => {
    fetchBills();
    fetchPatients();
    fetchDoctors();
    fetchAppointments();
  }, []);

  const fetchBills = async () => {
    try {
      const res = await api.get("/bills");
      setBills(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPatients = async () => {
    const res = await api.get("/patients");
    setPatients(res.data);
  };

  const fetchDoctors = async () => {
    const res = await api.get("/doctors");
    setDoctors(res.data);
  };

  const fetchAppointments = async () => {
    const res = await api.get("/appointments");
    setAppointments(res.data);
  };

  const handleChange = (e) => {
    const updated = {
      ...formData,
      [e.target.name]: e.target.value,
    };

    const consultation = Number(updated.consultationFee || 0);
    const medicine = Number(updated.medicineFee || 0);

    updated.totalAmount = consultation + medicine;

    setFormData(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/bills", formData);

      setFormData({
        patient: "",
        doctor: "",
        appointment: "",
        consultationFee: "",
        medicineFee: "",
        totalAmount: "",
        paymentStatus: "Pending",
      });

      fetchBills();
    } catch (err) {
      console.log(err.response?.data);
    }
  };

  const deleteBill = async (id) => {
    if (!window.confirm("Delete bill?")) return;

    await api.delete(`/bills/${id}`);
    fetchBills();
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Billing</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow grid grid-cols-2 gap-4 mb-8"
      >
        <select
          name="patient"
          value={formData.patient}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="">Select Patient</option>

          {patients.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}
        </select>

        <select
          name="doctor"
          value={formData.doctor}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="">Select Doctor</option>

          {doctors.map((d) => (
            <option key={d._id} value={d._id}>
              {d.name}
            </option>
          ))}
        </select>

        <select
          name="appointment"
          value={formData.appointment}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="">Select Appointment</option>

          {appointments.map((a) => (
            <option key={a._id} value={a._id}>
              {a.patient?.name} - {a.doctor?.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="consultationFee"
          placeholder="Consultation Fee"
          value={formData.consultationFee}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          type="number"
          name="medicineFee"
          placeholder="Medicine Fee"
          value={formData.medicineFee}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        
        <select
          name="paymentStatus"
          value={formData.paymentStatus}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option>Pending</option>
          <option>Paid</option>
        </select>

        <button className="bg-emerald-900 text-white rounded-xl p-2 col-span-2 hover:bg-emerald-950">
          Generate Bill
        </button>
      </form>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-emerald-900 text-white">
            <tr>
              <th className="p-3">Patient</th>
              <th>Doctor</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {bills.map((bill) => (
              <tr key={bill._id} className="border-b text-center">
                <td className="p-3">{bill.patient?.name}</td>
                <td>{bill.doctor?.name}</td>
                <td>Rs. {bill.totalAmount}</td>
                <td>{bill.paymentStatus}</td>

                <td>
                  <button
                    onClick={() => deleteBill(bill._id)}
                    className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {bills.length === 0 && (
              <tr>
                <td
                  colSpan="5"
                  className="text-center p-6 text-gray-500"
                >
                  No Bills Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}

export default Bills;