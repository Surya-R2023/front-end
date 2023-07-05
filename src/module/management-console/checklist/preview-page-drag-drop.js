// import { Button, Table, Row, Col, message } from "antd";
// import { Link, useNavigate } from "react-router-dom";
// // import UploadDownloadService from "../../../../services/preventive-maintenance-services/upload-checklist-service";
// import UploadDownloadService from "../../../../services/upload-download-service";
// function PreviewPage(props) {
//   const { data, destinationData, id , handleCurrentDecrease } = props;
//   const service = new UploadDownloadService();
//   const navigate = useNavigate();
//   const handleUpload = () => {
//     const jsonStr = destinationData?.map((e) => ({
//       key: e.key, index: e.index.toString(), label: e.label
//     }));
//     service.uploadDataId(id, jsonStr).then((response) => {
      
//       if (response.data?.success) {
//         message.success(response.data?.message)
//         navigate("/preventive-maintenance/checklist")
//       }
//       else {
//         message.error(response.data?.message)
//       }
//     })
//   }

//   const columns = [
//     {
//       title: "S.No.",
//       dataIndex: "sno",
//       align: "center",
//       width: 100,
//       render: (text, record, index) => index + 1,
//     },
//     {
//       title: "CheckList Name",
//       dataIndex: "checkListName",
//       key:"checkListName",
//       align: "center",
//       // width: 100,
//     },
//     {
//       title: "Description",
//       dataIndex: "checkListDescription",
//       key:"description",
//       align: "center",
//       // width: 100,
//     },
//     {
//       title: "Checks",
//       dataIndex: "checks",
//       key:"checks",
//       align: "center",
//     },
//     {
//       title: "Checks Description",
//       dataIndex: "checkDescription",
//       key:"checks",
//       align: "center",
//     },
    
//     {
//       title: "CheckTypes",
//       dataIndex: "checkTypes",
//       key:"checkTypes",
//       align: "center",
//     },
//   ];

  

//   return (
//     <Row gutter={[10, 10]} justify="end">
//       <Row >
//         <Col>
//           <Table
//             className="virtual-table"
//             // rowKey="checkTypeId"
//             dataSource={data}
//             columns={columns}
//             size="middle"
//             pagination={
//               false
//             }
//             scroll={{
//               y: 320,
//             }}

//           />
//         </Col>
//       </Row>
      
//       <Row justify="end" gutter={[10,10]} >
//         <Col >
//           <Button onClick={()=>{handleCurrentDecrease()}} type="primary">Cancel</Button>
//         </Col>
//         <Col >
//           <Button onClick={handleUpload} type="primary">Submit</Button>
//         </Col>
//       </Row>
//     </Row>
//   )
// }
// export default PreviewPage;

import { Button, Table, Row, Col, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import UploadDownloadService from "../../../../services/upload-download-service";
function PreviewPage(props) {
  const { data, destinationData, id , handleCurrentDecrease , modeName} = props;
  const service = new UploadDownloadService();
  const navigate = useNavigate();
  console.log("dest",data);
  const handleUpload = () => {
    const jsonStr = destinationData?.map((e) => ({
      key: e.key, index: e.index.toString(), label: e.label
    }));
    service.uploadDataId(id, jsonStr , modeName).then((response) => {
      console.log(response.data);
      if (response.data?.success) {
        message.success(response.data?.message)
        navigate("/preventive-maintenance/checklist")
      }
      else {
        message.error(response.data?.message)
      }
    })
  }

  const columns = [
    {
      title: "S.No.",
      dataIndex: "sno",
      align: "center",
      width: 100,
      render: (text, record, index) => index + 1,
    },
    ...destinationData.map((e) => ({
      key: e.key,
      dataIndex: e.key,
      title: e.label,
      align: "center",
      width: 200,
    })),
  ];
  

  // const columns = [
    // {
    //   dataIndex: "sno",
    //   key: "sno",
    //   title: "S.No",
    //   align: "center",
    //   render: (value, record, index) => {
    //     return index + 1;
    //   },
    // },
  //   {
  //     dataIndex: "checkTypeName",
  //     key: "checkTypeName",
  //     title: "Audit Type",
  //     align: "center",
  //     width: 500,
  //   },
  //   {
  //     dataIndex: "description",
  //     key: "description",
  //     title: "Description",
  //     align: "center",
  //     width: 500,
  //   },
  // ];

  return (
    <Row gutter={[10, 10]} justify="end">
      <Row >
        <Col>
          <Table
            className="virtual-table"
            rowKey="checkTypeId"
            dataSource={data}
            columns={columns}
            size="middle"
            pagination={
              false
            }
            scroll={{
              y: 330,
            }}

          />
        </Col>
      </Row>
      <Row justify="end" gutter={[10,10]} >
        <Col >
          <Button onClick={()=>{handleCurrentDecrease()}} type="primary">Cancel</Button>
        </Col>
        <Col >
          <Button onClick={handleUpload} type="primary">Submit</Button>
        </Col>
      </Row>
    </Row>
  )
}
export default PreviewPage;