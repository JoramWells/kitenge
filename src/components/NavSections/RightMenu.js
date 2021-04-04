/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Menu, Badge, Space } from "antd";
import { NotificationOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

const { SubMenu } = Menu;

function RightMenu(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { loading, userInfo, error } = userSignin;

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
          <Menu.Item key="logout"></Menu.Item>
          <SubMenu title={userInfo.name}>
            <Menu.Item style={{ paddingLeft: "85px", margin: "auto" }}>
              <img
                src={userInfo.avatar}
                alt="dhfdsjfhdkjg"
                style={{ width: "25px", borderRadius: "50px" }}
              />
            </Menu.Item>
            <Menu.Item>{userInfo.email}</Menu.Item>
          </SubMenu>
          <Menu.Item>
            <Badge dot>
              <a href="#" className="head-example">
                cart
              </a>
            </Badge>
          </Menu.Item>
        </Menu>
      </Space>
    );
  }
}

export default RightMenu;
