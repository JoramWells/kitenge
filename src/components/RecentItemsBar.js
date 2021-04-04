import React from "react";
import { Row, Col } from "antd";

export default function RecentItemsBar(props) {
  return (
    <Row
      style={{ backgroundColor: "#d9d9d9", margin: "2rem" }}
      justify="space-around"
      align="middle"
    >
      <Col
        style={{
          padding: "4px",
          borderRadius: "2px",
        }}
      >
        <h2>{props.title}</h2>
      </Col>
    </Row>
  );
}
