import React from "react";
import { LogoutOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/features/auth";

const Navbar = () => {
  const dispatch = useDispatch();

  return (
    <nav className="w-full bg-gray-600 py-2 px-8">
      <div className="w-full flex justify-between items-center">
        <h1 className="text-3xl text-white font-bold italic">Absensi</h1>
        <button onClick={() => dispatch(logout())}>
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
