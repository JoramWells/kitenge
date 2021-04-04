import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../../_actions/userActions";
import {
  Form,
  Checkbox,
  Input,
  Button,
  Card,
  Typography,
  Row,
  Col,
  Spin,
} from "antd";

function Copyright() {
  return (
    <Text style={{ textAlign: "center" }}>
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Text>
  );
}

const { Title, Text } = Typography;

export default function SignIn(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userSignin = useSelector((state) => state.userSignin);
  const { loading, userInfo, error } = userSignin;

  const dispatch = useDispatch();

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
    props.history.push("/");
  };
  useEffect(() => {
    if (userInfo) {
      props.history.push("/register");
      console.log(userInfo);
    }
    return () => {};
  }, [userInfo]);

  return (
    <>
      <Row
        justify="space-around"
        align="middle"
        style={{
          marginTop: "40px",
        }}
      >
        <Col span={10}>
          <Card>
            <Title level={3} style={{ textAlign: "center" }}>
              Sign in
            </Title>
            <Form layout="vertical" name="basic" noValidate>
              {loading && (
                <Row justify="space-around" align="middle">
                  <Spin />
                </Row>
              )}
              {error && <div>{error}</div>}
              <Form.Item
                required
                id="email"
                label="Email Address"
                name="email"
                rules={[{ required: true, message: "Enter email" }]}
                onChange={(e) => setEmail(e.target.value)}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                type="password"
                id="password"
                rules={[{ required: true, message: "Enter password" }]}
                onChange={(e) => setPassword(e.target.value)}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                {...tailLayout}
                name="remember"
                valuePropName="checked"
              >
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={submitHandler}
                >
                  Login
                </Button>
              </Form.Item>

              <Row>
                <Col span={12}>
                  <Link
                    to="/register"
                    variant="body1"
                    style={{ color: "#3b3c36" }}
                  >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>
      <Row style={{ margin: "50px" }} justify="space-around" align="middle">
        <Copyright />
      </Row>
    </>
  );
}
