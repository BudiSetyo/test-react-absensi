import React from "react";
import { Modal, Table, Form, Input, Button } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ListUser = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nik: "",
    name: "",
    password: "",
  });

  const handleFormData = (e) => {
    const { value, name } = e.target;

    setFormData({ ...formData, [name]: [value] });
  };

  const [showModal, setShowModal] = useState({
    edit: {
      status: false,
      data: {},
    },
    delete: {
      status: false,
      data: {},
    },
  });

  const handleShowModal = {
    edit: (data) => {
      setShowModal({
        ...showModal,
        edit: { status: !showModal.edit.status, data: data },
      });
      setFormData({
        ...formData,
        nik: data.nik,
        name: data.name,
        password: data.password,
      });
    },
    delete: (data) =>
      setShowModal({
        ...showModal,
        delete: { status: !showModal.delete.status, data: data },
      }),
  };

  const dataSource = [
    {
      key: "1",
      nik: "9812738",
      name: "Mike",
      role: "user",
      password: "heheboy",
    },
    {
      key: "2",
      nik: "989738",
      name: "Wintang",
      role: "user",
      password: "heheboy",
    },
    {
      key: "3",
      nik: "909738",
      name: "Azis",
      role: "admin",
      password: "heheboy",
    },
    {
      key: "4",
      nik: "909778",
      name: "Andy",
      role: "admin",
      password: "heheboy",
    },
  ];

  const columns = [
    {
      title: "NIK",
      dataIndex: "nik",
      key: "nik",
      align: "center",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (_, record) => (
        <button
          className={`py-1 px-2 ${
            record.role === "user" ? "bg-blue-500" : "bg-green-500"
          } w-16 text-white font-semibold rounded-lg`}
        >
          {record.role}
        </button>
      ),
      align: "center",
    },
    {
      title: "Detail",
      render: (_, record) => (
        <button onClick={() => navigate(`/history/${record.nik}`)}>
          <HistoryOutlined className="text-2xl" />
        </button>
      ),
      align: "center",
    },
    {
      title: "Edit",
      render: (_, record) => (
        <button onClick={() => handleShowModal.edit(record)}>
          <EditOutlined className="text-2xl text-blue-500" />
        </button>
      ),
      align: "center",
    },
    {
      title: "Delete",
      render: (_, record) => (
        <button onClick={() => handleShowModal.delete(record)}>
          <DeleteOutlined className="text-2xl text-red-500" />
        </button>
      ),
      align: "center",
    },
    {
      render: (_, record) => (
        <Button className="bg-blue-500 font-semi-bold" type="primary">
          Close Attendance
        </Button>
      ),
    },
  ];

  return (
    <section>
      <Table dataSource={dataSource} columns={columns} pagination={false} />

      <section>
        <Modal
          title="Edit"
          open={showModal.edit.status}
          onCancel={handleShowModal.edit}
          footer={[
            <Button
              key="confirm"
              type="primary"
              className="bg-blue-500"
              htmlType="submit"
            >
              Confirm
            </Button>,
          ]}
        >
          <Form layout="vertical" autoComplete="off">
            <Form.Item label="Nik :">
              <Input
                name="nik"
                onChange={handleFormData}
                value={formData.nik}
              />
            </Form.Item>

            <Form.Item label="Name :">
              <Input
                name="name"
                onChange={handleFormData}
                value={formData.name}
              />
            </Form.Item>

            <Form.Item label="Password :">
              <Input.Password
                name="password"
                onChange={handleFormData}
                value={formData.password}
              />
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          title={`Delete ${showModal.delete.data?.name}`}
          open={showModal.delete.status}
          onCancel={handleShowModal.delete}
          footer={[
            <Button key="delete" className="bg-red-500" type="primary" danger>
              Delete
            </Button>,
          ]}
        >
          Are you sure to delete {showModal.delete.data?.name}
        </Modal>
      </section>
    </section>
  );
};

export default ListUser;
