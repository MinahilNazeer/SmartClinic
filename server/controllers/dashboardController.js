const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");
const Bill = require("../models/Bill");

const getDashboardStats = async (req, res) => {
  try {
    const totalPatients = await Patient.countDocuments();
    const totalDoctors = await Doctor.countDocuments();
    const totalAppointments = await Appointment.countDocuments();

    const paidBills = await Bill.find({
      paymentStatus: "Paid",
    });

    const totalRevenue = paidBills.reduce(
      (sum, bill) => sum + bill.totalAmount,
      0
    );

    const recentPatients = await Patient.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      totalPatients,
      totalDoctors,
      totalAppointments,
      totalRevenue,
      recentPatients,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};