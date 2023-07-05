import { Card, Typography } from "antd";
import React from "react";

const { Title, Text } = Typography;
const { Meta } = Card;
class HomeCard extends React.Component {
  state = {};
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Card1 {...this.props} />
      // <Card className="tile1" bodyStyle={{ padding: "10px" }}>
      //   <Row align="middle" justify="space-between">
      //     <Col>
      //       <Text level={1} className="tile-heading">
      //         {this.props.title}
      //       </Text>
      //       <Title level={2} className="tile-value">
      //         {this.props.value ? this.props.value : `-`}
      //       </Title>
      //     </Col>
      //     {/* <Col>
      //       <Avatar
      //         shape="square"
      //         // icon={<ExpandAltOutlined />}
      //         size={50}
      //       ></Avatar>
      //     </Col> */}
      //   </Row>
      // </Card>
    );
  }
}

const Card1 = (props) => {
  return (
    <Card hoverable style={{ position: "relative" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          position: "absolute",
          fontSize: "6em",
          top: 0,
          right: "10px",
          color: props.color,
          height: "100%",
          transform: "rotate(-15deg)",
          opacity: 0.08,
        }}
      >
        {props.icon}
      </div>

      <Meta
        // avatar={
        //   <Avatar style={{ background: "red" }} size={20} shape="square" />
        // }
        title={
          <Title level={4} style={{ margin: 0 }}>
            {props.value}
          </Title>
        }
        description={<Text>{props.title}</Text>}
      />
    </Card>
  );
};

export default HomeCard;
