import { useState } from "react";
import { Col, Row, Button, Layout } from "antd";
import { BiFilter } from "react-icons/bi";

const { Sider, Content, Header } = Layout;
function Page(props) {
  const [open, setOpen] = useState(false);
  const toggleFilter = () => {
    setOpen((value) => !value);
  };

  return (
    <Layout>
      <Content>
        {(props.filter || props.action) && (
          <div style={{ marginBottom: "10px" }}>
            <Row justify="space-between">
              <Col>{props.filter}</Col>
              <Col>{props.action}</Col>
            </Row>
          </div>
        )}
        {props.children}
      </Content>

      {/* <Sider
        collapsedWidth={0}
        collapsed={open}
        width={250}
        style={{
          background: "transparent",
        }}
      >
        <div
          style={{
            background: "#f5f5f5",
            margin: "0 10px 10px 10px",
            padding: "10px",
            boxSizing: "border-box",
            borderRadius: "10px",
          }}
        >
          {props.filter}
        </div>
      </Sider> */}
    </Layout>
  );
}

export default Page;
