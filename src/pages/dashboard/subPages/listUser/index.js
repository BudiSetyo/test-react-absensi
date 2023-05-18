import React from "react";
import { Modal, Table, Form, Input, Button, message } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const api = process.env.REACT_APP_API_URL;

const ListUser = () => {
  const navigate = useNavigate();
  const authData = useSelector((state) => state.auth.value);

  const [listData, setListData] = useState([]);
  const [formData, setFormData] = useState({
    nik: "",
    name: "",
  });

  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setListData([]);
    }
  };

  const handleFormData = (e) => {
    const { value, name } = e.target;

    setFormData({ ...formData, [name]: value });
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
    role: {
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
      });
    },
    delete: (data) =>
      setShowModal({
        ...showModal,
        delete: { status: !showModal.delete.status, data: data },
      }),
    role: (data) =>
      setShowModal({
        ...showModal,
        role: { status: !showModal.role.status, data: data },
      }),
  };

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
        <div className="relative">
          <button
            className={`py-1 px-2 ${
              record.role === "user" ? "bg-blue-500" : "bg-green-500"
            } w-16 text-white font-semibold rounded-lg`}
            onClick={() => handleShowModal.role(record)}
          >
            {record.role}
          </button>

          <button
            className={`py-1 px-2 ${
              record.role !== "user" ? "bg-blue-500" : "bg-green-500"
            } w-16 text-white font-semibold rounded-lg shadow-lg absolute top-8 ${
              showModal.role.status && record.id === showModal.role.data.id
                ? ""
                : "hidden"
            }`}
            style={{ zIndex: "999" }}
            onClick={handleEditRole}
          >
            {record.role === "user" ? "admin" : "user"}
          </button>
        </div>
      ),
      align: "center",
    },
    {
      title: "Detail",
      render: (_, record) => (
        <button
          onClick={() => navigate(`/history/${record.nik}`)}
          disabled={record.role === "admin" ? true : false}
        >
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
        <button
          onClick={() => handleShowModal.delete(record)}
          disabled={record.role === "admin" ? true : false}
        >
          <DeleteOutlined className="text-2xl text-red-500" />
        </button>
      ),
      align: "center",
    },
    {
      render: (_, record) => (
        <Button
          onClick={() => {
            axios({
              method: "post",
              url: `${api}/history/attendance-close`,
              headers: {
                Authorization: `Bearer ${authData.token}`,
              },
              data: {
                userId: record.id,
              },
            })
              .then((result) => {
                message.success(result.data?.message);
                return;
              })
              .catch((err) => {
                message.error(err.response?.data.message);
                return;
              });
          }}
          className="bg-blue-500 font-semi-bold"
          type="primary"
          disabled={record.role === "admin" ? true : false}
        >
          Close Attendance
        </Button>
      ),
    },
  ];

  const handleEditRole = () => {
    axios({
      method: "patch",
      url: `${api}/users/?userId=${showModal.role.data.id}`,
      headers: {
        Authorization: `Bearer ${authData.token}`,
      },
      data: {
        role: showModal.role.data.role === "user" ? "admin" : "user",
      },
    })
      .then(() => {
        message.success("Update role user success");
        setShowModal({
          ...showModal,
          role: {
            status: false,
            data: {},
          },
        });
        fetchListData();
        return;
      })
      .catch((err) => {
        console.log(err);
        message.error(err.response?.data.message);
        return;
      });
  };

  const handleEditUser = () => {
    axios({
      method: "patch",
      url: `${api}/users/?userId=${showModal.edit.data.id}`,
      headers: {
        Authorization: `Bearer ${authData.token}`,
      },
      data: formData,
    })
      .then(() => {
        message.success("Edit user success");
        setShowModal({
          ...showModal,
          edit: {
            status: false,
            data: {},
          },
        });
        fetchListData();
        return;
      })
      .catch((err) => {
        message.error(err.response?.data.message);
        return;
      });
  };

  const handleDeleteUser = () => {
    axios({
      method: "delete",
      url: `${api}/users/?userId=${showModal.delete.data.id}`,
      headers: {
        Authorization: `Bearer ${authData.token}`,
      },
    })
      .then(() => {
        message.success("Delete user success");
        setShowModal({
          ...showModal,
          delete: {
            status: false,
            data: {},
          },
        });
        fetchListData();
        return;
      })
      .catch((err) => {
        message.error(err.response?.data.message);
        return;
      });
  };

  const fetchListData = () => {
    axios({
      method: "get",
      url: `${api}/users`,
      headers: {
        Authorization: `Bearer ${authData.token}`,
      },
    })
      .then((result) => {
        setListData(
          result.data.data.map((item) => {
            return {
              key: item.id,
              ...item,
            };
          })
        );
        return;
      })
      .catch((err) => {
        message.error(err.response?.data.message);
        return;
      });
  };

  useEffect(() => {
    fetchListData();
  }, []);

  return (
    <section>
      <Table
        dataSource={listData}
        columns={columns}
        pagination={tableParams.pagination}
        onChange={handleTableChange}
      />

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
              onClick={handleEditUser}
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
                type="number"
                min={0}
              />
            </Form.Item>

            <Form.Item label="Name :">
              <Input
                name="name"
                onChange={handleFormData}
                value={formData.name}
              />
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          title={`Delete ${showModal.delete.data?.name}`}
          open={showModal.delete.status}
          onCancel={handleShowModal.delete}
          footer={[
            <Button
              onClick={handleDeleteUser}
              key="delete"
              className="bg-red-500"
              type="primary"
              danger
            >
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
