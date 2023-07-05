import { Card, Avatar, Typography, Tooltip } from "antd";
const { Text, Title } = Typography;
function BuildingDetailCard(props) {
  return (
    <Card size="small">
      <Card.Meta title={props.title}></Card.Meta>
      <br />
      <Card.Meta
        style={{ alignItems: "flex-start" }}
        avatar={
          <Tooltip title={props.title}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <Avatar
                shape="square"
                size={40}
                icon={props.icon}
                style={{ backgroundColor: props.color }}
              ></Avatar>
            </div>
          </Tooltip>
        }
        title={props.description}
        description={props.description2}
      ></Card.Meta>
    </Card>
  );
}

export default BuildingDetailCard;
