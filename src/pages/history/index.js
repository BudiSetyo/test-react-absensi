import React from "react";
import { DashboardLayout } from "../../components";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { CaretLeftOutlined } from "@ant-design/icons";
import { Table } from "antd";

const History = () => {
  const { nik } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState([
    {
      key: "1",
      date: "1231-02-12",
      time: "09:20",
      description: "Terlambat",
    },
    {
      key: "2",
      date: "1231-02-12",
      time: "09:20",
      description: "Terlambat",
    },
    {
      key: "3",
      date: "1231-02-12",
      time: "09:20",
      description: "Terlambat",
    },
    {
      key: "4",
      date: "1231-02-12",
      time: "09:20",
      description: "Terlambat",
    },
  ]);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Submit Attendance",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
  ];

  return (
    <DashboardLayout>
      <section className="px-8 py-8">
        <header className="flex items-center gap-4">
          <button onClick={() => navigate(-1)}>
            <CaretLeftOutlined className="text-3xl" />
          </button>
          <h1 className="text-2xl">History {nik}</h1>
        </header>

        <section className="mt-10">
          <Table dataSource={data} columns={columns} />
        </section>
      </section>
    </DashboardLayout>
  );
};

export default History;
