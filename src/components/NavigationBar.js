import React, { useState } from "react";
import LeftMenu from "./NavSections/LeftMenu";
import RightMenu from "./NavSections/RightMenu";
import { Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";

function NavigationBar() {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <div
      style={{
        zIndex: 1,
        width: "100%",
        position: "sticky",
        top: "0px",
        display: "block",
      }}
    >
      <nav className="menu">
        <div className="menu__container">
          <div className="menu_left">
            <LeftMenu mode="horizontal" />
          </div>

          <div className="menu_rigth">
            <RightMenu mode="horizontal" />
          </div>
          <Button
            size="large"
            type="secondary"
            className="menu__mobile-button"
            onClick={showDrawer}
          >
            <MenuOutlined style={{ fontSize: "1.5rem" }} />
          </Button>
          <Drawer
            title="Basic Drawer"
            placement="right"
            className="menu_drawer"
            closable={false}
            onClose={onClose}
            visible={visible}
          >
            <LeftMenu mode="inline" />
            <RightMenu mode="inline" />
          </Drawer>
        </div>
      </nav>
    </div>
  );
}

export default NavigationBar;
