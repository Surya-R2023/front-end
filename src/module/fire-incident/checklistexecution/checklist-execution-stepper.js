import ChecklistExecutionForm from "./checklist-execution-form";
import ChecklistExecutionPreview from "./checklist-execution-preview";
import {
  Row,
  Col,
  Steps,
  Card,
  message,
  Input,
  Select,
  Radio,
  Spin,
} from "antd";
import Page from "../../../utils/page/page";
import CheckListExecutionService from "../../../services/fire-incident-services/checklist-execution-service";
import React, { useEffect, useState } from "react";
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import ChecklistExecutionStart from "./checklist-execution-start";
const { Step } = Steps;
function ChecklistExecutionStepper(props) {
  const service = new CheckListExecutionService();
  const params = useParams();
  const navigate = useNavigate();
  const [current, setCurrent] = useState(null);
  const [isLoading, setIsLoading] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const renderContent = () => {
    switch (current) {
      case 0:
        return <ChecklistExecutionStart next={next} />;
        break;
      case 1:
        return <ChecklistExecutionForm next={next} prev={prev} />;
        break;
      case 2:
        return <ChecklistExecutionPreview next={next} prev={prev} />;
        break;

      default:
        return <></>;
        break;
    }
  };

  useEffect(() => {
    setIsLoading(true);
    service
      .retrieve(params.id)
      .then((response) => {
        if (response.data) {
          let status = response.data.status;
          if (status == "InProgress") setCurrent(1);
          else if (status == "Closed") setCurrent(2);
          else setCurrent(0);
        } else message.error(response.data.message);
      })
      .catch((error) => {
        console.log(message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <Page title="Check List Execution">
      <Row justify="center" gutter={[10, 10]}>
        <Col sm={18}>
          <Spin spinning={isLoading}>
            <Steps progressDot current={current} labelPlacement="vertical">
              <Step
                title="Start"
                // icon={<FileDoneOutlined />}
              />
              <Step
                title="Execution"
                // icon={<FileDoneOutlined />}
              />
              <Step
                title="Preview"
                //  icon={<ProfileOutlined />}
              />
            </Steps>

            <Card size="small" bordered={false}>
              {renderContent()}
            </Card>
          </Spin>
        </Col>
      </Row>
    </Page>
  );
}

export default ChecklistExecutionStepper;
