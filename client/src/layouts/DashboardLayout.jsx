import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function DashboardLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      <Sidebar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />

      <div className="flex-1 bg-linear-to-r from-stone-100 via-emerald-50 to-teal-90 min-h-screen">
        <Navbar
          setIsOpen={setIsOpen}
        />

        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;