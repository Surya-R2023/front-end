import { useState } from "react";
import {
  Row,
  Switch,
  Col,
  Space,
  Tag,
  Button,
  Typography,
  Modal,
  Spin,
  message,
} from "antd";
import { PoweroffOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import RemoteStartService from "../../../services/remote-start-service";
import { useEffect } from "react";
const { Text } = Typography;
const { confirm } = Modal;
function RemoteStart(props) {
  const remoteStartService = new RemoteStartService();

  const [loading, setLoading] = useState(false);
  const [enable, setEnabled] = useState(false);
  const start = (value) => {
    setLoading(true);
    remoteStartService
      .start(value)
      .then(({ data }) => {
        message.success(data.message);
      })
      .catch((error) => {
        message.error(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const showConfirm = (mode) => {
    confirm({
      title: "Remote Start",
      icon: <ExclamationCircleFilled />,
      content: "Do you want to start the pump ?",
      okText: "Yes",
      cancelText: "No",
      onOk() {
        start({ assetId: props.assetId, mode: mode });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  return (
    <Spin spinning={loading}>
      <Row justify="space-between">
        <Col span="24">
          <Text strong>Remote Start</Text>
        </Col>
        <Col>
          <Switch onChange={setEnabled} size="small" />
        </Col>
        <Col>
          <Space>
            <Button
              disabled={!enable}
              size="small"
              type="text"
              icon={<PoweroffOutlined />}
              onClick={() => showConfirm("E")}
            >
              Electric Pump Run
            </Button>
            <Button
              disabled={!enable}
              size="small"
              type="text"
              icon={<PoweroffOutlined />}
              onClick={() => showConfirm("D")}
            >
              Diesel Pump Run
            </Button>
          </Space>
        </Col>
      </Row>
    </Spin>
  );
}

export default RemoteStart;
