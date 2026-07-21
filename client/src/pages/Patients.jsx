import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../services/api";

function Patients() {
  const [patients, setPatients] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    disease: "",
    address: "",
  });

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const res = await api.get("/patients");
      setPatients(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      age: "",
      gender: "",
      phone: "",
      disease: "",
      address: "",
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
        await api.put(`/patients/${editingId}`, formData);
        alert("Patient updated successfully");
      } else {
        await api.post("/patients", formData);
        alert("Patient added successfully");
      }

      resetForm();
      fetchPatients();

    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  const editPatient = (patient) => {
    setEditingId(patient._id);

    setFormData({
      name: patient.name,
      age: patient.age,
      gender: patient.gender,
      phone: patient.phone,
      disease: patient.disease,
      address: patient.address,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const deletePatient = async (id) => {
    if (!window.confirm("Delete this patient?")) return;

    try {
      await api.delete(`/patients/${id}`);
      fetchPatients();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Patients</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow mb-8 grid grid-cols-2 gap-4"
      >
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <input
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          name="disease"
          placeholder="Disease"
          value={formData.disease}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <input
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <div className="col-span-2 flex gap-3">
          <button
            type="submit"
            className="bg-emerald-900 text-white rounded px-6 py-2 hover:bg-emerald-950"
          >
            {editingId ? "Update Patient" : "Add Patient"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-500 text-white rounded px-6 py-2 "
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
              <th>Age</th>
              <th>Gender</th>
              <th>Disease</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {patients.map((patient) => (
              <tr
                key={patient._id}
                className="border-b text-center"
              >
                <td className="p-3">{patient.name}</td>
                <td>{patient.age}</td>
                <td>{patient.gender}</td>
                <td>{patient.disease}</td>
                <td>{patient.phone}</td>

                <td className="space-x-2">
                  <button
                    onClick={() => editPatient(patient)}
                    className="bg-emerald-900 text-white px-3 py-1 rounded hover:bg-emerald-950"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deletePatient(patient._id)}
                    className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {patients.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  className="text-center p-6 text-gray-500"
                >
                  No patients found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}

export default Patients;