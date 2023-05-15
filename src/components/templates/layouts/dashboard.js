import React from "react";
import { Navbar } from "../../organisms";

const DashboardLayout = ({ children }) => {
  return (
    <div className="w-full h-screen bg-gray-200">
      <main className="container mx-auto bg-white max-w-5xl">
        <section>
          <Navbar />
          {children}
        </section>
      </main>
    </div>
  );
};

export default DashboardLayout;
