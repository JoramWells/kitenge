import React from "react";
import { Row, Col, Typography, Space, Form, Input, Button } from "antd";
import mpesa from "./img/mpesa.png";
import {
  PhoneOutlined,
  TwitterOutlined,
  FacebookOutlined,
  InstagramOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

export default function Footer() {
  return (
    <>
      <Col
        style={{ height: "200px", padding: "2rem", backgroundColor: "#F5F5F5" }}
      >
        <h2>Subcribe to our newsletter</h2>
        <Form>
          <Form.Item>
            <Input />
          </Form.Item>
        </Form>
        <Form.Item>
          <Button type="primary">Submit</Button>
        </Form.Item>
      </Col>
      <Row
        md={8}
        sm={8}
        justify="center"
        align="middle"
        style={{
          height: "250px",
          padding: "20px",
          backgroundColor: "rgb(40,44,53)",
          color: "white",
        }}
      >
        <Col span={6}>
          <Title level={4} style={{ color: "white" }}>
            Social media
          </Title>
          <br />
          <Space>
            <TwitterOutlined style={{ fontSize: "2rem", color: "#4da6ff" }} />{" "}
            <FacebookOutlined style={{ fontSize: "2rem", color: "#3366ff" }} />{" "}
            <InstagramOutlined style={{ fontSize: "2rem", color: "#ff8533" }} />{" "}
          </Space>
        </Col>
        <Col span={6}>
          <Title level={4} style={{ color: "white" }}>
            Buy
          </Title>
          <Text style={{ color: "white" }}>Shop products</Text>
          <br />
          <Text style={{ color: "white" }}>Shipping</Text>
          <br />
          <Text style={{ color: "white" }}>Track your order</Text>
          <br />
          <Text style={{ color: "white" }}>Buyers FAQs</Text>
          <br />
          <Text style={{ color: "white" }}>Contact us</Text>
        </Col>
        <Col span={6}>
          <Title level={4} style={{ color: "white" }}>
            Sell
          </Title>
          <Text style={{ color: "white" }}>Quickstart guide</Text>
          <br />
          <Text style={{ color: "white" }}>Sell anything</Text>
          <br />
          <Text style={{ color: "white" }}>Products</Text>
          <br />
          <Text style={{ color: "white" }}>Start selling</Text>
          <br />
          <Text style={{ color: "white" }}>Login</Text>
        </Col>
        <Col span={6}>
          <Title level={4} style={{ color: "white" }}>
            Payments
          </Title>
          <img src={mpesa} alt="dkjskaljdklas" width="200px" />
        </Col>
      </Row>
      <div
        style={{
          backgroundColor: "rgb(22,22,29)",
          padding: "1rem",
          textAlign: "center",
          color: "white",
        }}
      >
        @2021-Copyright | Annies` Online Mall | Privary Policy | Terms &
        Conditions
      </div>
    </>
  );
}
