// import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
// import {
//   Button,
//   message,
//   Modal,
//   Upload,
//   Descriptions,
//   Form,
//   Spin,
//   Select,
//   Col,
//   Steps,
//   Tooltip,
//   Input,
//   Row,
//   Card,
//   Divider,
//   Dropdown,
// } from "antd";
// import { useEffect, useState } from "react";
// //import checkForm from "../check/check-form";
// // import UploadDownloadService from "../../../../services/preventive-maintenance-services/upload-checklist-service";
// import DragDropList from "../common/drag-drop-list";
// import PreviewPage from "./preview-page-drag-drop";
// import { useNavigate } from "react-router-dom";
// import UploadDownloadService from "../../../../services/upload-download-service";
// const { Option } = Select;
// const { Step } = Steps;
// function ChecklistUpload(props) {
//   const navigate = useNavigate();
//   const [isLoading, setLoading] = useState(false);
//   const [destinationData, setDestinationData] = useState([]);
//   const [current, setCurrent] = useState(0);
//   const [file, setFile] = useState(null);
//   const [labelData, setLabelData] = useState([]);
//   const [dropDownData, setDropDownData] = useState();
//   const [id, setId] = useState();
//   const [data, setData] = useState([]);
//   const service = new UploadDownloadService();
//   const name = "checkList";
//   const labelDataFunc = () => {
//     service.template().then((response) => {
//       // console.log("res",response);
//       setLabelData(response.data);
//     });
//   };

//   useEffect(() => {
//     labelDataFunc();
//   })
//   const propsUpload = {
//     progress: {
//       strokeColor: {
//         '0%': '#108ee9',
//         '100%': '#87d068',
//       },
//       strokeWidth: 3,
//       format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
//     },
//   };


//   const loadTable = () => {
//     props.list();
//   }

//   const renderContent = () => {
//     switch (current) {
//       case 0:
//         return (
//           <Row justify="end" gutter={[10, 10]}>
//             <Col span={24}>
//               <Form >
//                 <Form.Item label="Select File">
//                   <Upload.Dragger 
//                   beforeUpload={beforeUpload} 
//                   accept=".xlsx"
//                   {...propsUpload}
//                   listType="picture"
//                   >
//                     <p className="ant-upload-drag-icon">
//                       <InboxOutlined />
//                     </p>
//                     <p className="ant-upload-text">
//                       Click or drag file to this area to upload
//                     </p>
//                     <p className="ant-upload-hint">
//                       Support for a single or bulk upload.
//                     </p>
//                   </Upload.Dragger>
//                 </Form.Item>
//               </Form>
//             </Col>
//             <Col >
//             <Button onClick={()=>{navigate("/preventive-maintenance/checklist")}} type="primary">Cancel</Button>
//             </Col>
//             <Col justify="end">
//               <Button onClick={uploadFile} type="primary">Upload</Button>
//             </Col>
//           </Row>
//         )
//         break;
//       case 1:
//         return (
//           <DragDropList  dropDownData={dropDownData} closePopup={handleCurrentDecrease} labelData={labelData} handleCurrentDecrease={handleCurrentDecrease} id={id} handleCurrentIncrease={handleCurrentIncrease} loadTable={loadTable} />
//         );
//         break;
//       case 2:
//         return (
//           <PreviewPage modeName={name} data={data} destinationData={destinationData} handleCurrentDecrease={handleCurrentDecrease} id={id}/>
//         );
//         break;
//       default:
//         return <></>;
//         break;
//     }
//   };

//   const beforeUpload = (file) => {
//     setFile(file);
//   };

//   const uploadFile = () => {
//     if (file != null) {
//       service
//         .uploadFile(file)
//         .then((response) => {
//           if (response.data?.success) {
//             setDropDownData(response.data?.data?.header?.map((e) => ({ value: e.index, label: e.key, id: e.id })))
//             setId(response.data?.data?.id)
//             message.success(response.data?.message)
//             setCurrent(1)
//           }
//           else {
//             message.error(response.data?.message)
//           }
//         })
//     }
//     else{
//       message.error("Please Select The File")
//     }
//   }

//   const handleCurrentDecrease = () => {
//     setCurrent(current-1)
//   }

//   const handleCurrentIncrease = (data , destinationData) => {
//     // console.log(current,"cur");
//     setCurrent(current+1);
//     setData(data )
//     setDestinationData(destinationData)
//   }

//   // const openPopup = () => {
//   //   setOpen(true);

//   // };

//   useEffect(() => {
//     labelDataFunc();
//   }, [])
//   return (
//     <>


//       <Spin spinning={isLoading}>

//         <Steps progressDot current={current} labelPlacement="vertical">
//           <Step
//             title="Upload File"
//           />
//           <Step
//             title="Select Data"
//           />
//           <Step
//             title="Preview"
//           />
//         </Steps>
//         <Divider />
//         <Card>{renderContent()}</Card>

//       </Spin>

//     </>
//   );
// }

// export default ChecklistUpload;

import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
import {
  Button,
  message,
  Modal,
  Upload,
  Descriptions,
  Form,
  Spin,
  Select,
  Col,
  Steps,
  Tooltip,
  Input,
  Row,
  Card,
  Divider,
  Dropdown,
} from "antd";
import { useEffect, useState } from "react";
import DragDropList from "../common/drag-drop-list";
import PreviewPage from "./preview-page-drag-drop";
import { useNavigate } from "react-router-dom";
import UploadDownloadService from "../../../../services/upload-download-service";

const { Option } = Select;
const { Step } = Steps;

function ChecklistUpload(props) {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [destinationData, setDestinationData] = useState([]);
  const [current, setCurrent] = useState(0);
  const [file, setFile] = useState(null);
  const [labelData, setLabelData] = useState([]);
  const [dropDownData, setDropDownData] = useState();
  const [id, setId] = useState();
  const [data, setData] = useState([]);
  const service = new UploadDownloadService();
  const name = "checkList";

  const labelDataFunc = () => {
    service.template().then((response) => {
      setLabelData(response.data);
    });
  };

  useEffect(() => {
    labelDataFunc();
  }, []);

  const propsUpload = {
    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
      },
      strokeWidth: 3,
      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
  };

  const loadTable = () => {
    props.list();
  };

  const renderContent = () => {
    switch (current) {
      case 0:
        return (
          <Row justify="end" gutter={[10, 10]}>
            <Col span={24}>
              <Form>
                <Form.Item label="Select File">
                  <Upload.Dragger
                    beforeUpload={beforeUpload}
                    accept=".xlsx"
                    {...propsUpload}
                    listType="picture"
                  >
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                      Click or drag file to this area to upload
                    </p>
                    <p className="ant-upload-hint">
                      Support for a single or bulk upload.
                    </p>
                  </Upload.Dragger>
                </Form.Item>
              </Form>
            </Col>
            <Col>
              <Button onClick={() => navigate("/preventive-maintenance/checklist")} type="primary">Cancel</Button>
            </Col>
            <Col justify="end">
              <Button onClick={uploadFile} type="primary">Upload</Button>
            </Col>
          </Row>
        );
      case 1:
        return (
          <DragDropList
            dropDownData={dropDownData}
            closePopup={handleCurrentDecrease}
            labelData={labelData}
            handleCurrentDecrease={handleCurrentDecrease}
            id={id}
            handleCurrentIncrease={handleCurrentIncrease}
            loadTable={loadTable}
          />
        );
      case 2:
        return (
          <PreviewPage
            modeName={name}
            data={data}
            destinationData={destinationData}
            handleCurrentDecrease={handleCurrentDecrease}
            id={id}
          />
        );
      default:
        return <></>;
    }
  };

  const beforeUpload = (file) => {
    setFile(file);
  };

  const uploadFile = () => {
    if (file !== null) {
      service.uploadFile(file).then((response) => {
        if (response.data?.success) {
          setDropDownData(response.data?.data?.header?.map((e) => ({
            value: e.index,
            label: e.key,
            id: e.id,
          })));
          setId(response.data?.data?.id);
          message.success(response.data?.message);
          setCurrent(1);
        } else {
          message.error(response.data?.message);
        }
      });
    } else {
      message.error("Please Select The File");
    }
  };

  const handleCurrentDecrease = () => {
    setCurrent((prevCurrent) => prevCurrent - 1);
  };

  const handleCurrentIncrease = (data, destinationData) => {
    setCurrent((prevCurrent) => prevCurrent + 1);
    setData(data);
    setDestinationData(destinationData);
  };

  return (
    <>
      <Spin spinning={isLoading}>
        <Steps progressDot current={current} labelPlacement="vertical">
          <Step title="Upload File" />
          <Step title="Select Data" />
          <Step title="Preview" />
        </Steps>
        <Divider />
        <Card>{renderContent()}</Card>
      </Spin>
    </>
  );
}

export default ChecklistUpload;
