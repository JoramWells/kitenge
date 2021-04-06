/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Menu, Space, Badge, Modal, Col, Row, Typography, Image } from "antd";
import Cookie from "js-cookie";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const { Text, Title } = Typography;
const { SubMenu } = Menu;
const cartItems = Cookie.getJSON("cartItems");
console.log(cartItems);
const renderItems = cartItems.map((product) => {
  return (
    <Row justify="space-around" align="middle">
      <Col>
        <Image
          src={product.image}
          alt="kldjfkldsjfl"
          style={{ width: "50px" }}
        />
      </Col>
      <Col>
        <Title level={3}>{product.qty}</Title>
      </Col>
      <Col key={product.product}>
        <Text>{product.price}</Text>
      </Col>
    </Row>
  );
});

function RightMenu() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const [visible, setVisible] = useState(false);
  const showModal = () => {
    setVisible(true);
  };
  const handleOk = () => {
    setVisible(false);
  };
  const handleCancel = () => {
    setVisible(false);
  };

  if (!userInfo) {
    return (
      <Menu mode="horizontal">
        <Menu.Item key="mail">
          <a href="/login">Signin</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">Signup</a>
        </Menu.Item>
      </Menu>
    );
  } else {
    return (
      <Space>
        <Menu mode="horizontal">
          <Menu.Item>
            <Badge count={cartItems.length}>
              <ShoppingCartOutlined
                onClick={showModal}
                style={{ fontSize: "2rem", fontWeight: "bold" }}
              />
            </Badge>
          </Menu.Item>
          <SubMenu title={<UserOutlined style={{ fontSize: "2rem" }} />}>
            <Menu.Item style={{ paddingLeft: "85px", margin: "auto" }}>
              <img
                src={userInfo.avatar}
                alt="dhfdsjfhdkjg"
                style={{ width: "25px", borderRadius: "50px" }}
              />
            </Menu.Item>
            <Menu.Item>{userInfo.email}</Menu.Item>
          </SubMenu>
        </Menu>
        <Modal
          title="Basic Modal"
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          {renderItems}
        </Modal>
      </Space>
    );
  }
}

export default RightMenu;
