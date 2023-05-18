import React from "react";
import { Input, Button, Modal, Form, message } from "antd";
import ListUser from "../listUser";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
const api = process.env.REACT_APP_API_URL;

const Admin = () => {
  const navigate = useNavigate();
  const authData = useSelector((state) => state.auth.value);

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(!showModal);

  const handleAddEmploye = (values) => {
    axios({
      method: "post",
      url: `${api}/users`,
      headers: {
        Authorization: `Bearer ${authData.token}`,
      },
      data: {
        nik: values.nik,
        name: values.name,
        password: values.password,
        role: "user",
      },
    })
      .then((result) => {
        console.log(result);
        message.success("Add user success");
        handleShowModal();
        return navigate(0);
      })
      .catch((err) => {
        handleShowModal();
        message.error("Add user failed");
        return;
      });
  };

  return (
    <section>
      <header className="flex md:flex-row flex-col justify-end gap-4 items-center mb-6">
        {/* <Input.Search
          className="md:w-60 w-full"
          size="large"
          placeholder="search..."
        /> */}
        <Button
          className="bg-blue-500 md:w-fit w-full font-semibold rounded-lg"
          type="primary"
          size="large"
          onClick={handleShowModal}
        >
          Employee +
        </Button>
      </header>

      <ListUser />

      <section>
        <Modal
          title="Add Employee"
          open={showModal}
          onCancel={handleShowModal}
          footer={[]}
        >
          <Form
            className="pt-4"
            layout="vertical"
            autoComplete="off"
            onFinish={handleAddEmploye}
          >
            <Form.Item
              label="NIK :"
              name="nik"
              rules={[{ required: true, message: "Please input your NIK!" }]}
            >
              <Input type="number" min={0} />
            </Form.Item>

            <Form.Item
              label="Name :"
              name="name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password :"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item className="flex justify-end">
              <Button
                className="bg-blue-500"
                type="primary"
                size="large"
                htmlType="submit"
              >
                Create
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </section>
    </section>
  );
};

export default Admin;
