import { ControlFilled } from "@ant-design/icons";
import Page from "../../../utils/page/page";
import { Image, Tooltip, Card, Row, Col, Avatar, Typography } from "antd";
import PageForm from "../../../utils/page/page-form";
const { Title } = Typography;

class CardDesign extends PageForm {
  render() {
    return (
      <Page>
        <Image  src="../bg.png" preview={false} style={{ width: "100%" }}/>   
        <br></br>
        <br></br>
        <Typography
          style={{ fontWeight: "bold", fontSize: "20px", marginLeft: "20px" }}         
        >
          Remote Service Apps
        </Typography>
        <br></br>
        <Row gutter={[30, 30]}>
          <Col>
            <Tooltip title="Remote Asset Monitoring">
              <Card
                style={{
                  width: 400,
                  borderRadius: 7,
                  boxShadow: "2px 2px 2px 2px rgba(211,211,211)",
                }}
              >
                <Card.Meta
                  avatar={
                    <Avatar
                    icon = { <ControlFilled />}
                      shape="square"
                      size={70}
                      FontAwesomeIcon={"fa-solid fa-computer"}
                      style={{
                        backgroundColor: "#80abc2",
                        borderRadius: 5,
                        verticalAlign: "middle",
                      }}
                    />
                  }
                  title={
                    <Title
                      level={4}
                      style={{ fontSize: "15px", fontWeight: "bold" }}
                    >
                      Remote Asset Monitoring
                    </Title>
                  }
                  description="Real-Time Energy Monitoring and Diagnostics"
                ></Card.Meta>
              </Card>
            </Tooltip>
          </Col>

          <Col>
            <Tooltip title="Energy Monitoring & Analytics">
              <Card
                style={{
                  width: 400,
                  borderRadius: 7,
                  boxShadow: "2px 2px 2px 2px rgba(211,211,211)",
                }}
              >
                <Card.Meta
                  avatar={
                    <Avatar
                      shape="square"
                      size={70}
                      style={{
                        backgroundColor: "#80abc2",
                        borderRadius: 7,
                        verticalAlign: "middle",
                      }}
                    />
                  }
                  title={
                    <Title
                      level={4}
                      style={{ fontSize: "15px", fontWeight: "bold" }}
                    >
                      Energy Monitoring & Analytics
                    </Title>
                  }
                  description="Real-Time Energy Monitoring and Diagnostics"
                ></Card.Meta>
              </Card>
            </Tooltip>
          </Col>

          <Col>
            <Tooltip title=" Digital Twin">
              <Card
                style={{
                  width: 400,
                  borderRadius: 7,
                  boxShadow: "2px 2px 2px 2px rgba(211,211,211)",
                }}
              >
                <Card.Meta
                  avatar={
                    <Avatar
                      shape="square"
                      size={70}
                      style={{
                        backgroundColor: "#8a92a6",
                        verticalAlign: "middle",
                        borderRadius: 5,
                      }}
                    />
                  }
                  title={
                    <Title
                      level={4}
                      style={{ fontSize: "15px", fontWeight: "bold" }}
                    >
                      Digital Twin
                    </Title>
                  }
                  description="Replica of reality"
                ></Card.Meta>
              </Card>
            </Tooltip>
          </Col>

          <Col>
            <Tooltip title="Predictive Service Insights">
              <Card
                style={{
                  width: 400,
                  borderRadius: 7,
                  boxShadow: "2px 2px 2px 2px rgba(211,211,211)",
                }}
              >
                <Card.Meta
                  avatar={
                    <Avatar
                      shape="square"
                      size={70}
                      style={{
                        backgroundColor: "#87568f",
                        verticalAlign: "middle",
                        borderRadius: 7,
                      }}
                    />
                  }
                  title={
                    <Title
                      level={4}
                      style={{ fontSize: "15px", fontWeight: "bold" }}
                    >
                      Predictive Service Insights
                    </Title>
                  }
                  description="Proactive rather Reactive Service"
                ></Card.Meta>
              </Card>
            </Tooltip>
          </Col>

          <Col>
            <Tooltip title=" Fire Station Management">
              <Card
                style={{
                  width: 400,
                  borderRadius: 7,
                  boxShadow: "2px 2px 2px 2px rgba(211,211,211)",
                }}
              >
                <Card.Meta
                  avatar={
                    <Avatar
                      shape="square"
                      size={70}
                      style={{
                        backgroundColor: "#80abc2",
                        verticalAlign: "middle",
                        borderRadius: 7,
                      }}
                    />
                  }
                  title={
                    <Title
                      level={4}
                      style={{ fontSize: "15px", fontWeight: "bold" }}
                    >
                      Fire Station Management
                    </Title>
                  }
                  description="Emergency incident and Fire Engine allocation Management"
                ></Card.Meta>
              </Card>
            </Tooltip>
          </Col>

          <Col>
            <Tooltip title=" Service Insights">
              <Card
                style={{
                  width: 400,
                  borderRadius: 7,
                  boxShadow: "2px 2px 2px 2px rgba(211,211,211)",
                }}
              >
                <Card.Meta
                  avatar={
                    <Avatar
                      shape="square"
                      size={70}
                      style={{
                        backgroundColor: "#8a92a6",
                        verticalAlign: "middle",
                        borderRadius: 7,
                      }}
                    />
                  }
                  title={
                    <Title
                      level={4}
                      style={{ fontSize: "15px", fontWeight: "bold" }}
                    >
                      Service Insights
                    </Title>
                  }
                  description="Service Business Intelligence"
                ></Card.Meta>
              </Card>
            </Tooltip>
          </Col>

          <Col>
            <Tooltip title=" Service Resource Management ">
              <Card
                style={{
                  width: 400,
                  borderRadius: 7,
                  boxShadow: "2px 2px 2px 2px rgba(211,211,211)",
                }}
              >
                <Card.Meta
                  avatar={
                    <Avatar
                      shape="square"
                      size={70}
                      style={{
                        backgroundColor: "#8a92a6",
                        verticalAlign: "middle",
                        borderRadius: 7,
                      }}
                    />
                  }
                  title={
                    <Title
                      level={4}
                      style={{ fontSize: "15px", fontWeight: "bold" }}
                    >
                      Service Resource Management
                    </Title>
                  }
                  description="Field Service Capacity Compantancy and Performance Management"
                ></Card.Meta>
              </Card>
            </Tooltip>
          </Col>

          <Col>
            <Tooltip title=" Cyber Physical Security">
              <Card
                style={{
                  width: 400,
                  borderRadius: 7,
                  boxShadow: "2px 2px 2px 2px rgba(211,211,211)",
                }}
              >
                <Card.Meta
                  avatar={
                    <Avatar
                      shape="square"
                      size={70}
                      style={{
                        backgroundColor: "#cc708c",
                        verticalAlign: "middle",
                        borderRadius: 7,
                      }}
                    />
                  }
                  title={
                    <Title
                      level={4}
                      style={{ fontSize: "15px", fontWeight: "bold" }}
                    >
                      Cyber Physical Security
                    </Title>
                  }
                  description="Teck stack Security"
                ></Card.Meta>
              </Card>
            </Tooltip>
          </Col>

          <Col>
            <Tooltip title="Real Time Remote Control">
              <Card
                style={{
                  width: 400,
                  borderRadius: 7,
                  boxShadow: "2px 2px 2px 2px rgba(211,211,211)",
                }}
              >
                <Card.Meta
                  avatar={
                    <Avatar
                      shape="square"
                      size={70}
                      style={{
                        backgroundColor: "#80abc2",
                        verticalAlign: "middle",
                        borderRadius: 7,
                      }}
                    />
                  }
                  title={
                    <Title
                      level={4}
                      style={{ fontSize: "15px", fontWeight: "bold" }}
                    >
                      Real Time Remote Control
                    </Title>
                  }
                  description="Remote Asset Control Management"
                ></Card.Meta>
              </Card>
            </Tooltip>
          </Col>

          <Col>
            <Tooltip title="Remote Software Management">
              <Card
                style={{
                  width: 400,
                  borderRadius: 7,
                  boxShadow: "2px 2px 2px 2px rgba(211,211,211)",
                }}
              >
                <Card.Meta
                  avatar={
                    <Avatar
                      shape="square"
                      size={70}
                      style={{
                        backgroundColor: "#80abc2",
                        verticalAlign: "middle",
                        borderRadius: 7,
                      }}
                    />
                  }
                  title={
                    <Title
                      level={4}
                      style={{ fontSize: "15px", fontWeight: "bold" }}
                    >
                      Remote Software Management
                    </Title>
                  }
                  description="Remote Eage Device Software Configuratioin & Version Management"
                ></Card.Meta>
              </Card>
            </Tooltip>
          </Col>
        </Row>
        <br></br>
        <br></br>

        {/* ///////////Second Card row */}

        <Typography
          style={{ fontWeight: "bold", fontSize: "20px", marginLeft: "20px" }}
        >
          Field Efficiency Apps
        </Typography>
        <br></br>
        <Row gutter={[30, 30]}>
          <Col>
            <Tooltip title="Preventive Maintenance">
              <Card
                style={{
                  width: 400,
                  borderRadius: 7,
                  boxShadow: "2px 2px 2px 2px rgba(211,211,211)",
                }}
              >
                <Card.Meta
                  avatar={
                    <Avatar
                      icon={<ControlFilled />}
                      shape="square"
                      size={70}
                      style={{
                        backgroundColor: "#50bd89",
                        borderRadius: 5,
                        verticalAlign: "middle",
                      }}
                    />
                  }
                  title={
                    <Title
                      level={4}
                      style={{ fontSize: "15px", fontWeight: "bold" }}
                    >
                      Preventive Maintenance
                    </Title>
                  }
                  description="Paperless Maintenance & Workflow"
                ></Card.Meta>
              </Card>
            </Tooltip>
          </Col>

          <Col>
            <Tooltip title="Audit/Inspection Management">
              <Card
                style={{
                  width: 400,
                  borderRadius: 7,
                  boxShadow: "2px 2px 2px 2px rgba(211,211,211)",
                }}
              >
                <Card.Meta
                  avatar={
                    <Avatar
                      shape="square"
                      size={70}
                      style={{
                        backgroundColor: "#87568f",
                        borderRadius: 7,
                        verticalAlign: "middle",
                      }}
                    />
                  }
                  title={
                    <Title
                      level={4}
                      style={{ fontSize: "15px", fontWeight: "bold" }}
                    >
                      Audit/Inspection Management
                    </Title>
                  }
                  description="Paperless Maintenance & Workflow"
                ></Card.Meta>
              </Card>
            </Tooltip>
          </Col>

          <Col>
            <Tooltip title="Fire Incident">
              <Card
                style={{
                  width: 400,
                  borderRadius: 7,
                  boxShadow: "2px 2px 2px 2px rgba(211,211,211)",
                }}
              >
                <Card.Meta
                  avatar={
                    <Avatar
                      shape="square"
                      size={70}
                      style={{
                        backgroundColor: "#50bd89",
                        verticalAlign: "middle",
                        borderRadius: 5,
                      }}
                    />
                  }
                  title={
                    <Title
                      level={4}
                      style={{ fontSize: "15px", fontWeight: "bold" }}
                    >
                      Fire Incident
                    </Title>
                  }
                  description="Fire incident & Workflow Management"
                ></Card.Meta>
              </Card>
            </Tooltip>
          </Col>

          <Col>
            <Tooltip title="MR Work Instruction-Hololens">
              <Card
                style={{
                  width: 400,
                  borderRadius: 7,
                  boxShadow: "2px 2px 2px 2px rgba(211,211,211)",
                }}
              >
                <Card.Meta
                  avatar={
                    <Avatar
                      shape="square"
                      size={70}
                      style={{
                        backgroundColor: "#d78d61",
                        verticalAlign: "middle",
                        borderRadius: 7,
                      }}
                    />
                  }
                  title={
                    <Title
                      level={4}
                      style={{ fontSize: "15px", fontWeight: "bold" }}
                    >
                      MR Work Instruction-Hololens
                    </Title>
                  }
                  description="Mixed Reality & Paperless Work Instruction"
                ></Card.Meta>
              </Card>
            </Tooltip>
          </Col>

          <Col>
            <Tooltip title=" Web AR Product Catalogue">
              <Card
                style={{
                  width: 400,
                  borderRadius: 7,
                  boxShadow: "2px 2px 2px 2px rgba(211,211,211)",
                }}
              >
                <Card.Meta
                  avatar={
                    <Avatar
                      shape="square"
                      size={70}
                      style={{
                        backgroundColor: "#d78d61",
                        verticalAlign: "middle",
                        borderRadius: 7,
                      }}
                    />
                  }
                  title={
                    <Title
                      level={4}
                      style={{ fontSize: "15px", fontWeight: "bold" }}
                    >
                      Web AR Product Catalogue
                    </Title>
                  }
                  description="AR Based Formfit & Function"
                ></Card.Meta>
              </Card>
            </Tooltip>
          </Col>

          <Col>
            <Tooltip title="AR - Reomte Assistance">
              <Card
                style={{
                  width: 400,
                  borderRadius: 7,
                  boxShadow: "2px 2px 2px 2px rgba(211,211,211)",
                }}
              >
                <Card.Meta
                  avatar={
                    <Avatar
                      shape="square"
                      size={70}
                      style={{
                        backgroundColor: "#d78d61",
                        verticalAlign: "middle",
                        borderRadius: 7,
                      }}
                    />
                  }
                  title={
                    <Title
                      level={4}
                      style={{ fontSize: "15px", fontWeight: "bold" }}
                    >
                      AR - Reomte Assistance
                    </Title>
                  }
                  description="Real-Time Remote Assistance"
                ></Card.Meta>
              </Card>
            </Tooltip>
          </Col>

          <Col>
            <Tooltip title=" AR Work Instruction-Tablet ">
              <Card
                style={{
                  width: 400,
                  borderRadius: 7,
                  boxShadow: "2px 2px 2px 2px rgba(211,211,211)",
                }}
              >
                <Card.Meta
                  avatar={
                    <Avatar
                      shape="square"
                      size={70}
                      style={{
                        backgroundColor: "#d78d61",
                        verticalAlign: "middle",
                        borderRadius: 7,
                      }}
                    />
                  }
                  title={
                    <Title
                      level={4}
                      style={{ fontSize: "15px", fontWeight: "bold" }}
                    >
                      AR Work Instruction-Tablet
                    </Title>
                  }
                  description="AR Based Work Instruction"
                ></Card.Meta>
              </Card>
            </Tooltip>
          </Col>

          <Col>
            <Tooltip title=" Smart BOT">
              <Card
                style={{
                  width: 400,
                  borderRadius: 7,
                  boxShadow: "2px 2px 2px 2px rgba(211,211,211)",
                }}
              >
                <Card.Meta
                  avatar={
                    <Avatar
                      shape="square"
                      size={70}
                      style={{
                        backgroundColor: "#87568f",
                        verticalAlign: "middle",
                        borderRadius: 7,
                      }}
                    />
                  }
                  title={
                    <Title
                      level={4}
                      style={{ fontSize: "15px", fontWeight: "bold" }}
                    >
                      Smart BOT
                    </Title>
                  }
                  description="AI Based RCA/CAPA Recommendations"
                ></Card.Meta>
              </Card>
            </Tooltip>
          </Col>

          <Col>
            <Tooltip title="VR Based Firesafety Training">
              <Card
                style={{
                  width: 400,
                  borderRadius: 7,
                  boxShadow: "2px 2px 2px 2px rgba(211,211,211)",
                }}
              >
                <Card.Meta
                  avatar={
                    <Avatar
                      shape="square"
                      size={70}
                      style={{
                        backgroundColor: "#d78d61",
                        verticalAlign: "middle",
                        borderRadius: 7,
                      }}
                    />
                  }
                  title={
                    <Title
                      level={4}
                      style={{ fontSize: "15px", fontWeight: "bold" }}
                    >
                      VR Based Firesafety Training
                    </Title>
                  }
                  description="VR Based Firesafety Training"
                ></Card.Meta>
              </Card>
            </Tooltip>
          </Col>

          <Col>
            <Tooltip title="Knowledge Base">
              <Card
                style={{
                  width: 400,
                  borderRadius: 7,
                  boxShadow: "2px 2px 2px 2px rgba(211,211,211)",
                }}
              >
                <Card.Meta
                  avatar={
                    <Avatar
                      shape="square"
                      size={70}
                      style={{
                        backgroundColor: "#dd7a6d",
                        verticalAlign: "middle",
                        borderRadius: 7,
                      }}
                    />
                  }
                  title={
                    <Title
                      level={4}
                      style={{ fontSize: "15px", fontWeight: "bold" }}
                    >
                      Knowledge Base
                    </Title>
                  }
                  description="Enterprise Knowledge Base"
                ></Card.Meta>
              </Card>
            </Tooltip>
          </Col>

          <Col>
            <Tooltip title="VR Based Product Training">
              <Card
                style={{
                  width: 400,
                  borderRadius: 7,
                  boxShadow: "2px 2px 2px 2px rgba(211,211,211)",
                }}
              >
                <Card.Meta
                  avatar={
                    <Avatar
                      shape="square"
                      size={70}
                      style={{
                        backgroundColor: "#d78d61",
                        verticalAlign: "middle",
                        borderRadius: 7,
                      }}
                    />
                  }
                  title={
                    <Title
                      level={4}
                      style={{ fontSize: "15px", fontWeight: "bold" }}
                    >
                      VR Based Product Training
                    </Title>
                  }
                  description="VR Based Product Training"
                ></Card.Meta>
              </Card>
            </Tooltip>
          </Col>

          <Col>
            <Tooltip title="Spare Parts Inventory">
              <Card
                style={{
                  width: 400,
                  borderRadius: 7,
                  boxShadow: "2px 2px 2px 2px rgba(211,211,211)",
                }}
              >
                <Card.Meta
                  avatar={
                    <Avatar
                      shape="square"
                      size={70}
                      style={{
                        backgroundColor: "#8a92a6",
                        verticalAlign: "middle",
                        borderRadius: 7,
                      }}
                    />
                  }
                  title={
                    <Title
                      level={4}
                      style={{ fontSize: "15px", fontWeight: "bold" }}
                    >
                      Spare Parts Inventory
                    </Title>
                  }
                  description="Spare Parts & Inventory Management"
                ></Card.Meta>
              </Card>
            </Tooltip>
          </Col>
        </Row>
      </Page>
    );
  }
}

export default CardDesign;
