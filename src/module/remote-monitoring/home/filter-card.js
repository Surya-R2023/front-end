import { Row, Col } from "antd";
function FilterCard() {
  return (
    <Card bodyStyle={{ padding: "10px" }}>
      <Row align="middle" gutter={10}>
        <Col>
          <Avatar
            shape="square"
            size={30}
            style={{
              backgroundColor: "#f56a00",
              verticalAlign: "middle",
            }}
            icon={<AiOutlineUser />}
          >
            {Number(this.state.status?.total ?? 0)?.toFixed()}
          </Avatar>
        </Col>
        <Col>
          <Text ellipsis={true}>Total Site(s)</Text>
        </Col>
        <Col style={{ marginLeft: "auto" }}>
          {Number(this.state.status?.total ?? 0)?.toFixed()}
        </Col>
      </Row>
      {/* <Card.Meta
      style={{ alignItems: "center", width: "100%" }}
      avatar={
        <Avatar
          shape="square"
          size={30}
          style={{
            backgroundColor: "#f56a00",
            verticalAlign: "middle",
          }}
          icon={<AiOutlineUser />}
        >
          {Number(this.state.status?.total ?? 0)?.toFixed()}
        </Avatar>
      }
      // title={
      //   <Title level={4} style={{ marginBottom: 0 }}>
      //     {Number(this.state.status?.total ?? 0)?.toFixed()}
      //   </Title>
      // }
      description={
        <></>
      }
    ></Card.Meta> */}
    </Card>
  );
}

export default FilterCard;
