import React from "react";
import { AuthLayout } from "../../components";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();

  const onSubmit = (values) => {
    console.log("Success:", values);
    return navigate("/dashboard");
  };

  return (
    <AuthLayout
      header={
        <div>
          <h1 className="text-4xl font-bold text-center italic text-blue-500">
            Absensi
          </h1>
        </div>
      }
    >
      <section className="mt-8">
        <div className="flex justify-center">
          <Form
            layout="vertical"
            className="max-w-xs w-full text-center bg-white p-6 rounded-lg"
            autoComplete="off"
            onFinish={onSubmit}
          >
            <Form.Item
              label="NIK :"
              rules={[{ required: true, message: "Please input your NIK!" }]}
              name="nik"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password :"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
              name="password"
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button
                className="w-full bg-blue-500"
                type="primary"
                htmlType="submit"
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </section>
    </AuthLayout>
  );
};

export default Auth;
