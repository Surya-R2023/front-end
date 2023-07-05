import React, { useEffect, useState } from "react";
import { Card, Row, Col, Steps } from "antd";
import Page from "../../../utils/page/page";
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import BasicDetails from "./basic-details-form";
import Parameters from "./parameters";
import Alert from "./alerts";
import Preview from "./preview";
const { Step } = Steps;

function AssetLibraryForm(props) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const params = useParams();
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
        return <BasicDetails id={id} next={nextStage} />;
        break;
      case 1:
        return <Parameters assetLibraryId={id} next={next} prev={prev} />;
        break;
      case 2:
        return <Alert assetLibraryId={id} next={next} prev={prev} />;
        break;
      case 3:
        return <Preview assetLibraryId={id} next={next} prev={prev} />;
        break;
      default:
        return <></>;
        break;
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
    <Page title="Asset Library" onChange={onChange}>
      <Row justify="center">
        <Col lg={18} md={24}>
          <Steps
            progressDot
            size="small"
            current={current}
            onChange={onChange}
            labelPlacement="vertical"
          >
            <Step title="Basic Details" />
            <Step title="Parameters" />
            <Step title="Alerts" />
            <Step title="Preview" />
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

export default AssetLibraryForm;
