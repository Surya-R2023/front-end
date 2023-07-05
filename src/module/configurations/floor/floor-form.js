
import { Card, Col, Row, Steps } from "antd";
import React, { useEffect, useState } from "react";
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Page from "../../../utils/page/page";
import AddFloor from "./add-floor";
import FloorBuilding from "./floor-building";


const { Step } = Steps;

function FloorForm(props) {
  const params = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [current, setCurrent] = useState(0);
  const [id, setId] = useState();
  useEffect(() => {
    if (params.id) setId(Number(params.id));
    setCurrent(Number(searchParams.get("c")) ?? 0);
  }, [searchParams]);
  const nextStage = (i) => {
    if (id) {
      navigate({
        search: `?${createSearchParams({
          c: current + 1,
        })}`,
      });
    } else {
      navigate({
        pathname: `${i}`,
        search: `?${createSearchParams({
          c: current + 1,
        })}`,
      });
    }
  };
  const renderContent = () => {
    switch (current) {
      case 0:
        return <AddFloor  />
        break;
        case 1:
          return <FloorBuilding />
          break;
          

      default:
        return <></>;
        break;
    }
  };
  const next = () => {
    if (current < 2) {
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
    if (props.mode == "Edit") {
      navigate({
        search: `?${createSearchParams({
          c: current,
        })}`,
      });
    }

    {
      this.setState({ current });
    }
  };
  return (
    <Page title="FloorForm">
      <Row justify="center">
        <Col lg={18} md={24}>
          <Steps
            progressDot
            size="small"
            current={current}
            onChange={onChange}
            labelPlacement="vertical"
          >
            <Step title="Add-Floor" />
            <Step title="Building" />
          </Steps>
          <br />
          <Card size="small" bordered={false}>
            {renderContent()}
          </Card>
        </Col>
      </Row>
    </Page>
  );
}

export default FloorForm;

