import React from "react";
import { Input, Button, Modal, Form } from "antd";
import { useState } from "react";
import ListUser from "../listUser";

const Admin = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(!showModal);

  const handleAddEmploye = (values) => {
    console.log(values);
    window.location.reload();
  };

  return (
    <section>
      <header className="flex md:flex-row flex-col justify-between gap-4 items-center mb-6">
        <Input.Search
          className="md:w-60 w-full"
          size="large"
          placeholder="search..."
        />
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
              <Input />
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
