import React from "react";
import { LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <nav className="w-full bg-gray-600 py-2 px-8">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-3xl text-white font-bold italic">Absensi</h1>
        <button onClick={handleLogout}>
          <LogoutOutlined
            className="text-red-500"
            style={{ fontSize: "30px", fontWeight: "bold" }}
          />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
