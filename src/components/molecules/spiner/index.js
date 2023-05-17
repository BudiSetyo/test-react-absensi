import React from "react";
import { Spin } from "antd";

const Spiner = () => {
  return (
    <div
      className="inset-0 flex items-center justify-center absolute"
      style={{ zIndex: "999", backgroundColor: "rgba(0,0,0,0.6)" }}
    >
      <div className="flex flex-col items-center justify-center">
        <Spin size="large" />
        <h1 className="text-xl mt-2 font-semibold text-blue-500">Loading...</h1>
      </div>
    </div>
  );
};

export default Spiner;
