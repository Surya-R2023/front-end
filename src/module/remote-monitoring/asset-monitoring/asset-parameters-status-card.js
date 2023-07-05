import React, { Component } from "react";
import Card from "antd/lib/card/Card";
class StatusCard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card
        size="small"
        style={{
          height: 120,
          backgroundColor: "#F62217",
        }}
      ></Card>
    );
  }
}

export default StatusCard;
