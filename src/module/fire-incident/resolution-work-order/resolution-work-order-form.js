import { Card, Col, Row, Steps } from "antd";
import React, { useEffect, useState } from "react";
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Page from "../../../utils/page/page";
import Popups from "../../../utils/page/popups";
import ResolutionWorkOrderAssign from "./resolution-work-order-assign";
import ResolutionWorkOrderResolve from "./resolution-work-order-resolve";
import ResolutionWorkOrderVerify from "./resolution-work-order-verify";
import WorkOrderResolutionService from "../../../services/fire-incident-services/workorder-resolution-service";
const { Step } = Steps;

function ResolutionWorkOrderForm() {
  const params = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [current, setCurrent] = useState(0);
  const [id, setId] = useState();
  const service = new WorkOrderResolutionService();
  useEffect(() => {
    if (params.id) setId(Number(params.id));
    setCurrent(Number(searchParams.get("c")) ?? 0);
  }, [searchParams]);
  useEffect(() => {
    service.retrieve(params.id).then((response) => {
      if (response.data) {
        let status = response.data.status;
        if (status == 1) setCurrent(1);
        else if (status == 2) setCurrent(2);
        else if (status == 3) setCurrent(2);
        else if (status == 4) setCurrent(3);
        else if (status == 5) setCurrent(3);
        else setCurrent(0);
      }
    });
  }, []);
  const renderContent = () => {
    switch (current) {
      case 0:
        return <ResolutionWorkOrderAssign id={id} next={next} />;
      case 1:
        return <ResolutionWorkOrderResolve id={id} next={next} prev={prev} />;
      case 2:
        return (
          <ResolutionWorkOrderVerify
            key="1R"
            c={current}
            id={id}
            next={next}
            prev={prev}
          />
        );
      case 3:
        return (
          <ResolutionWorkOrderVerify
            key="2R"
            c={current}
            id={id}
            next={next}
            prev={prev}
          />
        );
      default:
        return <ResolutionWorkOrderVerify key="3R" c={4} id={id} />;
    }
  };
  const steps = () => {
    if (current < 4) {
      return (
        <Steps
          progressDot
          size="small"
          current={current}
          // onChange={onChange}
          labelPlacement="vertical"
        >
          <Step title="Assign" />
          <Step title="Resolve" />
          <Step title="Verify" />
          <Step title="Close" />
        </Steps>
      );
    }
  };
  const next = () => {
    if (current < 3) {
      navigate({
        search: `?${createSearchParams({
          c: current + 1,
        })}`,
      });
    } else {
      navigate("../");
    }
  };
  const prev = () => {
    navigate({
      search: `?${createSearchParams({
        c: current - 1,
      })}`,
    });
  };
  const onChange = (current) => {
    // console.log("onChange:", current);
    // if (props.mode == "Edit") {
    navigate({
      search: `?${createSearchParams({
        c: current,
      })}`,
    });
    // }
    {
      this.setState({ current });
    }
  };
  return (
    <Page title="Resolution Workorder">
      <Row justify="center" gutter={[10, 10]}>
        <Col sm={18}>
          {steps()}
          <br />
          <Card size="small" bordered={false}>
            {renderContent()}
          </Card>
        </Col>
      </Row>
    </Page>
  );
}

export default ResolutionWorkOrderForm;
