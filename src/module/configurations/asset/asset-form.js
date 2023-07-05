import { Card, Col, Row, Steps } from "antd";
import React, { useEffect, useState } from "react";
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Page from "../../../utils/page/page";
import Alerts from "./alerts";
import BasicDetails from "./basic-details-form";
import Parameters from "./parameters";
import Preview from "./preview";
import GatewayMappingForm from "./gateway-mapping-form";
import ImageUpload from "./image-upload";
// import ProductFile from "./product-file";
import WarrantyDetailsForm from "./warranty-details-form";
import { withAuthorization } from "../../../utils/with-authorization";
const { Step } = Steps;

function AssetForm(props) {
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
    // console.log("iiiiiii",i);
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
        return <ImageUpload assetId={id} next={next} prev={prev} />;
        break;
      // case 2:
      //   return (
      //     <WarrantyDetailsForm
      //       mode={props.mode}
      //       id={id}
      //       prev={prev}
      //       next={nextStage}
      //     />
      //   );
      //   break;
      // case 3:
      //   return <Parameters assetId={id} next={next} prev={prev} />;
      //   break;
      // case 4:
      //   return <Alerts assetId={id} next={next} prev={prev} />;
      //   break;

      // case 5:
      //   return <GatewayMappingForm assetId={id} next={next} prev={prev} />;
      //   break;
      // case 6:
      //   return <ProductFile assetId={id} next={next} prev={prev} />;
      //   break;
      case 2:
        return <Preview assetId={id} next={next} prev={prev} />;
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
    <>
       {/* {!this.props.add && this.props.mode == "Add" && <div>Access denied</div>} */}
      <Page title="Asset">
        <Row justify="center">
          <Col sm={16}>
            <Steps
              progressDot
              size="small"
              current={current}
              onChange={onChange}
              labelPlacement="vertical"
            >
              <Step title="Basic Details" />
               <Step title="Image" />
            {/* <Step title="Warranty Details" />
            <Step title="Parameters" />
            <Step title="Alerts" />
            <Step title="Gateway Mapping" /> */} 
              {/* <Step title="Product File" /> */}
              <Step title="Preview" />
            </Steps>
            <br />
            <Card size="small" bordered={false}>
              {renderContent()}
            </Card>
          </Col>
        </Row>
      </Page>
      
    </>
  );
}

export default withAuthorization(AssetForm);
