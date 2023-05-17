import React from "react";
import { useState, useEffect } from "react";
import { Button, Skeleton, Table, message } from "antd";
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

  const fetchData = () => {
    setLoading(true);

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
        setLoading(false);
        return;
      })
      .catch((err) => {
        message.error(err.response?.dta.message);
        setLoading(false);
        return;
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="px-8">
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold italic">
          Hello {authData?.name}
        </h1>

        <div>
          <Button className="bg-blue-500" type="primary" size="large">
            Submit Attendance
          </Button>
        </div>
      </header>

      <section className="mt-10">
        <Skeleton
          paragraph={{
            rows: 10,
          }}
          loading={loading}
        >
          <Table dataSource={data} columns={columns} pagination={false} />
        </Skeleton>
      </section>
    </section>
  );
};

export default User;
