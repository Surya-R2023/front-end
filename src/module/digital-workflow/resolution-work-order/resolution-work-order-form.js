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

const { Step } = Steps;

function ResolutionWorkOrderForm() {
  const params = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [current, setCurrent] = useState(0);
  const [id, setId] = useState();
  useEffect(() => {
    if (params.id) setId(Number(params.id));
    setCurrent(Number(searchParams.get("c")) ?? 0);
  }, [searchParams]);

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
