import React from "react";
import { AuthLayout, Spiner } from "../../components";
import { Button, Form, Input, message } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/features/auth";
import axios from "axios";
const api = process.env.REACT_APP_API_URL;

const Auth = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const onSubmit = (values) => {
    setLoading(true);

    axios({
      method: "post",
      url: `${api}/auth`,
      data: {
        nik: values.nik,
        password: values.password,
      },
    })
      .then((result) => {
        const data = result.data.data;

        dispatch(
          login({
            id: data.id,
            name: data.name,
            nik: data.nik,
            role: data.role,
            isLogin: true,
            token: data.token,
          })
        );

        message.success("Login Success");
        setLoading(false);
        return;
      })
      .catch((err) => {
        message.error(err.response?.data.message);
        setLoading(false);
        return;
      });
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
      {loading ? <Spiner /> : <></>}

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
              <Input type="number" />
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
