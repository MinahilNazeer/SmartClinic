import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../services/api";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    fee: "",
    phone: "",
    availability: "Available",
  });

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await api.get("/doctors");
      setDoctors(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      specialization: "",
      fee: "",
      phone: "",
      availability: "Available",
    });

    setEditingId(null);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.put(`/doctors/${editingId}`, formData);
        alert("Doctor updated successfully");
      } else {
        await api.post("/doctors", formData);
        alert("Doctor added successfully");
      }

      resetForm();
      fetchDoctors();
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  const editDoctor = (doctor) => {
    setEditingId(doctor._id);

    setFormData({
      name: doctor.name,
      specialization: doctor.specialization,
      fee: doctor.fee,
      phone: doctor.phone,
      availability: doctor.availability,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const deleteDoctor = async (id) => {
    if (!window.confirm("Delete this doctor?")) return;

    try {
      await api.delete(`/doctors/${id}`);
      fetchDoctors();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Doctors</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow mb-8 grid grid-cols-2 gap-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Doctor Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          type="text"
          name="specialization"
          placeholder="Specialization"
          value={formData.specialization}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          type="number"
          name="fee"
          placeholder="Consultation Fee"
          value={formData.fee}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <select
          name="availability"
          value={formData.availability}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="Available">Available</option>
          <option value="Busy">Busy</option>
          <option value="On Leave">On Leave</option>
        </select>

        <div className="col-span-2 flex gap-3">
          <button
            type="submit"
            className="bg-emerald-900 text-white rounded px-6 py-2 hover:bg-emerald-950"
          >
            {editingId ? "Update Doctor" : "Add Doctor"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-500 text-white rounded px-6 py-2"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-emerald-900 text-white">
            <tr>
              <th className="p-3">Name</th>
              <th>Specialization</th>
              <th>Fee</th>
              <th>Phone</th>
              <th>Availability</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {doctors.map((doctor) => (
              <tr
                key={doctor._id}
                className="border-b text-center"
              >
                <td className="p-3">{doctor.name}</td>
                <td>{doctor.specialization}</td>
                <td>Rs. {doctor.fee}</td>
                <td>{doctor.phone}</td>
                <td>{doctor.availability}</td>

                <td className="space-x-2">
                  <button
                    onClick={() => editDoctor(doctor)}
                    className="bg-emerald-900 text-white px-3 py-1 rounded hover:bg-emerald-950"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteDoctor(doctor._id)}
                    className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {doctors.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="text-center p-6 text-gray-500"
                >
                  No doctors found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}

export default Doctors;