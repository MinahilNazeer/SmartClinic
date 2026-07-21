import { Link } from "react-router-dom";

function Sidebar({ isOpen, setIsOpen }) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <div
        className={`
          fixed md:static top-0 left-0 z-50
          w-64 min-h-screen bg-emerald-950 text-white p-6
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <h1 className="text-2xl font-bold mb-10">
          Smart Clinic
        </h1>

        <nav className="space-y-4">
          <Link
            to="/dashboard"
            onClick={() => setIsOpen(false)}
            className="block hover:bg-emerald-900 rounded-lg p-2"
          >
            Dashboard
          </Link>

          <Link
            to="/patients"
            onClick={() => setIsOpen(false)}
            className="block hover:bg-emerald-900 rounded-lg p-2"
          >
            Patients
          </Link>

          <Link
            to="/doctors"
            onClick={() => setIsOpen(false)}
            className="block hover:bg-emerald-900 rounded-lg p-2"
          >
            Doctors
          </Link>

          <Link
            to="/appointments"
            onClick={() => setIsOpen(false)}
            className="block hover:bg-emerald-900 rounded-lg p-2"
          >
            Appointments
          </Link>

          <Link
            to="/bills"
            onClick={() => setIsOpen(false)}
            className="block hover:bg-emerald-900 rounded-lg p-2"
          >
            Billing
          </Link>
        </nav>
      </div>
    </>
  );
}

export default Sidebar;