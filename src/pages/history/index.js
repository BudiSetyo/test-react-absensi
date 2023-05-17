import React, { useEffect } from "react";
import { DashboardLayout } from "../../components";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { CaretLeftOutlined } from "@ant-design/icons";
import { Table, Button, message, Modal, Form, Input } from "antd";
import moment from "moment";
import axios from "axios";
const api = process.env.REACT_APP_API_URL;

const History = () => {
  const { nik } = useParams();
  const navigate = useNavigate();
  const authData = useSelector((state) => state.auth.value);

  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState({});
  const [data, setData] = useState([]);

  const handleShowModal = () => setShowModal(!showModal);

  const finishChangePassword = (values) => {
    const { password, rePassword } = values;

    if (password !== rePassword) {
      return message.error("Password doesn't match!");
    }

    axios({
      method: "patch",
      url: `${api}/users/password/?id=${userData.id}`,
      headers: {
        Authorization: `Bearer ${authData.token}`,
      },
      data: {
        password: password,
      },
    })
      .then((result) => {
        message.success("Change password success");
        setShowModal(false);
        return;
      })
      .catch((err) => {
        message.error(err.response?.data.message);
        setShowModal(false);
        return;
      });
  };

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
    axios({
      method: "get",
      url: `${api}/history/?id=${userData.id}`,
      headers: {
        Authorization: `Bearer ${authData.token}`,
      },
    })
      .then((result) => {
        const newData = result.data.data.map((item, index) => {
          return {
            key: index,
            ...item,
          };
        });
        setData(newData);
        return;
      })
      .catch((err) => {
        message.error(err.response?.data.message);
        return;
      });
  };

  const fetchUser = () => {
    axios({
      method: "get",
      url: `${api}/users/detail/?nik=${nik}`,
      headers: {
        Authorization: `Bearer ${authData.token}`,
      },
    })
      .then((result) => {
        const user = result.data?.data[0];
        setUserData(user);
        return;
      })
      .catch((err) => {
        message.error(err.response?.data.message);
        return;
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    fetchData();
  }, [userData]);

  return (
    <DashboardLayout>
      <section className="px-8 py-8">
        <header className="flex justify-between">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)}>
              <CaretLeftOutlined className="text-3xl" />
            </button>
            <h1 className="text-2xl">History {userData?.name}</h1>
          </div>

          <Button
            onClick={handleShowModal}
            className="bg-blue-500"
            type="primary"
            size="large"
          >
            Change password
          </Button>
        </header>

        <section className="mt-10">
          <Table dataSource={data} columns={columns} pagination={false} />
        </section>
      </section>

      <section>
        <Modal
          title={`Change password ${userData.name}`}
          open={showModal}
          onCancel={handleShowModal}
          footer={[]}
        >
          <div className="mt-4">
            <Form
              layout="vertical"
              autoComplete="off"
              onFinish={finishChangePassword}
            >
              <Form.Item
                label="New password :"
                rules={[
                  {
                    required: true,
                    message: "Please input your new password!",
                  },
                ]}
                name="password"
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="Retype password :"
                rules={[
                  {
                    required: true,
                    message: "Please retype your new password!",
                  },
                ]}
                name="rePassword"
              >
                <Input.Password />
              </Form.Item>

              <Form.Item className="flex justify-end">
                <Button
                  key="submit-button"
                  className="bg-blue-500"
                  type="primary"
                  htmlType="submit"
                  size="large"
                >
                  Confirm
                </Button>
                ,
              </Form.Item>
            </Form>
          </div>
        </Modal>
      </section>
    </DashboardLayout>
  );
};

export default History;
