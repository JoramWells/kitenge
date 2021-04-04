import React from "react";
import { Menu } from "antd";
const { SubMenu } = Menu;

function LeftMenu() {
  return (
    <Menu mode="horizontal">
      <Menu.Item>
        <a href="/">Home</a>
      </Menu.Item>
      <SubMenu title="Shop by Category">
        <Menu.ItemGroup title="Clothing">
          <Menu.Item>Earings</Menu.Item>
          <Menu.Item>Shoes</Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>
      <Menu.Item>Shops</Menu.Item>
      <Menu.Item>
        <a href="/product/add">Add</a>
      </Menu.Item>
    </Menu>
  );
}

export default LeftMenu;
