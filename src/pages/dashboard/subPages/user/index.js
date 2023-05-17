import React from "react";
import { useState, useEffect } from "react";
import { Button, Table, message } from "antd";
import { Spiner } from "../../../../components";
import { useSelector } from "react-redux";
import moment from "moment";
import axios from "axios";
const api = process.env.REACT_APP_API_URL;

const User = () => {
  const authData = useSelector((state) => state.auth.value);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      align: "center",
      render: (_, record) => <p>{moment(record.date).format("YYYY-MM-DD")}</p>,
    },
    {
      title: "Submit Attendance",
      dataIndex: "time",
      key: "time",
      align: "center",
      render: (_, record) => (
        <p>{record.time === "00:00:00" ? "-" : record.time}</p>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      align: "center",
    },
  ];

  const submitAttendance = () => {
    setLoading(true);

    axios({
      method: "post",
      url: `${api}/history/attendance`,
      data: {
        userId: authData.id,
      },
      headers: {
        Authorization: `Bearer ${authData.token}`,
      },
    })
      .then((result) => {
        message.success(result.data?.message);
        fetchData();
        setLoading(false);
        return;
      })
      .catch((err) => {
        message.error(err.response?.data.message);
        setLoading(false);
        return;
      });
  };

  const fetchData = () => {
    axios({
      method: "get",
      url: `${api}/history/?id=${authData.id}`,
      headers: {
        Authorization: `Bearer ${authData.token}`,
      },
    })
      .then((result) => {
        setData(
          result.data.data.map((item, index) => {
            return {
              key: index,
              ...item,
            };
          })
        );
        return;
      })
      .catch((err) => {
        message.error(err.response?.dta.message);
        return;
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="px-8">
      {loading ? <Spiner /> : <></>}
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold italic">
          Hello {authData?.name}
        </h1>

        <div>
          <Button
            className="bg-blue-500"
            type="primary"
            size="large"
            onClick={submitAttendance}
          >
            Submit Attendance
          </Button>
        </div>
      </header>

      <section className="mt-10">
        <Table dataSource={data} columns={columns} pagination={false} />
      </section>
    </section>
  );
};

export default User;
