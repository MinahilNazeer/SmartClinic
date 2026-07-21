import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../services/api";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    patient: "",
    doctor: "",
    appointmentDate: "",
    status: "Scheduled",
    notes: "",
  });

  useEffect(() => {
    fetchPatients();
    fetchDoctors();
    fetchAppointments();
  }, []);

  const fetchPatients = async () => {
    try {
      const res = await api.get("/patients");
      setPatients(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDoctors = async () => {
    try {
      const res = await api.get("/doctors");
      setDoctors(res.data);
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


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const resetForm = () => {
    setFormData({
      patient: "",
      doctor: "",
      appointmentDate: "",
      status: "Scheduled",
      notes: "",
    });

    setEditingId(null);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if (editingId) {

        // Update appointment
        await api.put(
          `/appointments/${editingId}`,
          formData
        );

      } else {

        // Create appointment
        await api.post(
          "/appointments",
          formData
        );

      }


      resetForm();
      fetchAppointments();

    } catch (error) {
      console.log(error.response?.data);

      alert(
        error.response?.data?.message ||
        "Operation failed"
      );
    }
  };


  const editAppointment = (appointment) => {

    setEditingId(appointment._id);

    setFormData({
      patient: appointment.patient._id,
      doctor: appointment.doctor._id,
      appointmentDate:
        new Date(appointment.appointmentDate)
          .toISOString()
          .slice(0,16),
      status: appointment.status,
      notes: appointment.notes || "",
    });

  };


  const deleteAppointment = async (id) => {

    if (!window.confirm("Cancel this appointment?"))
      return;


    try {

      await api.delete(
        `/appointments/${id}`
      );

      fetchAppointments();

    } catch (error) {
      console.log(error.response?.data);
    }
  };


  return (
    <DashboardLayout>

      <h1 className="text-3xl font-bold mb-6">
        Appointments
      </h1>


      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow mb-8 grid grid-cols-2 gap-4"
      >

        <select
          name="patient"
          value={formData.patient}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >

          <option value="">
            Select Patient
          </option>

          {patients.map((patient)=>(
            <option
              key={patient._id}
              value={patient._id}
            >
              {patient.name}
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

          <option value="">
            Select Doctor
          </option>

          {doctors.map((doctor)=>(
            <option
              key={doctor._id}
              value={doctor._id}
            >
              {doctor.name}
            </option>
          ))}

        </select>



        <input
          type="datetime-local"
          name="appointmentDate"
          value={formData.appointmentDate}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />



        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border p-2 rounded"
        >

          <option value="Scheduled">
            Scheduled
          </option>

          <option value="Completed">
            Completed
          </option>

          <option value="Cancelled">
            Cancelled
          </option>

        </select>



        <textarea
          name="notes"
          placeholder="Notes"
          value={formData.notes}
          onChange={handleChange}
          className="border p-2 rounded col-span-2"
          rows="3"
        />



        <button
          type="submit"
          className="bg-emerald-900 text-white p-2 rounded-xl col-span-2 hover:bg-emerald-950"
        >

          {editingId
            ? "Update Appointment"
            : "Book Appointment"}

        </button>


        {editingId && (

          <button
            type="button"
            onClick={resetForm}
            className="bg-gray-500 text-white p-2 rounded col-span-2"
          >
            Cancel Edit
          </button>

        )}

      </form>



      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-emerald-900 text-white">

            <tr>
              <th className="p-3">
                Patient
              </th>

              <th>
                Doctor
              </th>

              <th>
                Date
              </th>

              <th>
                Status
              </th>

              <th>
                Notes
              </th>

              <th>
                Action
              </th>

            </tr>

          </thead>



          <tbody>

          {appointments.map((appointment)=>(

            <tr
              key={appointment._id}
              className="border-b text-center"
            >

              <td className="p-3">
                {appointment.patient?.name}
              </td>


              <td>
                {appointment.doctor?.name}
              </td>


              <td>
                {new Date(
                  appointment.appointmentDate
                ).toLocaleString()}
              </td>


              <td>
                {appointment.status}
              </td>


              <td>
                {appointment.notes}
              </td>



              <td className="space-x-2">


                <button
                  onClick={()=>editAppointment(appointment)}
                  className="bg-emerald-900 text-white px-3 py-1 rounded hover:bg-emerald-950"
                >
                  Edit
                </button>



                <button
                  onClick={()=>
                    deleteAppointment(
                      appointment._id
                    )
                  }
                  className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>


              </td>


            </tr>

          ))}



          {appointments.length===0 && (

            <tr>

              <td
                colSpan="6"
                className="text-center p-6 text-gray-500"
              >
                No appointments found.
              </td>

            </tr>

          )}


          </tbody>


        </table>

      </div>


    </DashboardLayout>
  );
}

export default Appointments;