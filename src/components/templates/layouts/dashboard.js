import React from "react";
import { Navbar } from "../../organisms";

const DashboardLayout = ({ children }) => {
  return (
    <div className="w-full min-h-screen bg-gray-200">
      <main className="container mx-auto bg-white max-w-5xl shadow">
        <section>
          <Navbar />

          {children}

          <div className="">
            <footer className="px-8 py-2 bg-gray-600 mt-20 flex justify-center">
              <h1 className="text-xl text-white italic font-semibold">
                Absensi
              </h1>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DashboardLayout;
