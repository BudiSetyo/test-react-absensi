import React from "react";
import { LogoutOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { logout } from "../../../redux/features/auth";
// import { message } from "antd";
import axios from "axios";
const api = process.env.REACT_APP_API_URL;

const Navbar = () => {
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.auth.value);

  const checkToken = () => {
    axios({
      method: "get",
      url: `${api}/auth`,
      headers: {
        Authorization: `Bearer ${authData.token}`,
      },
    })
      .then((_) => {
        return;
      })
      .catch((err) => {
        if (err.response?.data.message === "You have to login!") {
          return dispatch(logout());
        }

        return;
      });
  };

  useEffect(() => {
    checkToken();
  }, []);

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
