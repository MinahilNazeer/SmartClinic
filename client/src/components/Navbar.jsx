import { useNavigate } from "react-router-dom";

function Navbar({ setIsOpen }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="bg-white shadow px-4 md:px-8 py-4 flex justify-between items-center">

      <div className="flex items-center gap-4">

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden text-3xl font-bold"
        >
          ☰
        </button>

        <h2 className="text-2xl font-bold">
          Welcome
        </h2>

      </div>

      <button
        onClick={handleLogout}
        className="bg-emerald-900 text-white px-4 py-2 rounded hover:bg-emerald-950"
      >
        Logout
      </button>

    </div>
  );
}

export default Navbar;