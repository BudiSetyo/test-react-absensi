import React from "react";
import { DashboardLayout } from "../../components";
import { Admin, User } from "./subPages";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <section className="px-8 py-4">
        <Admin />
      </section>
    </DashboardLayout>
  );
};

export default Dashboard;
