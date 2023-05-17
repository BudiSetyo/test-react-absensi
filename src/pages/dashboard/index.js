import React from "react";
import { DashboardLayout } from "../../components";
import { Admin, User } from "./subPages";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const authData = useSelector((state) => state.auth.value);

  return (
    <DashboardLayout>
      <section className="px-8 py-4">
        {authData.role === "admin" ? <Admin /> : <User />}
      </section>
    </DashboardLayout>
  );
};

export default Dashboard;
