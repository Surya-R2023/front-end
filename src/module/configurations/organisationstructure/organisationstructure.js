// import { ApartmentOutlined } from "@ant-design/icons";
// import { Card, Col, Row, Spin, Statistic, Table } from "antd";
// import React from "react";
// import {
//   AddButton,
//   EditButton,
// } from "../../../../utils/action-button/action-button";
// import Page from "../../../../utils/page/page";
// import PageList from "../../../../utils/page/page-list";
// import "../../../forms.css";
// // import Delete from "../../delete";

// import OrganisationStructureService from "../../../../services/orgservice/orgstructure-service";
// import "../../../../theme.less";
// import { DeleteButton } from "../../../../utils/action-button/action-button";
// import Organisationstructform from "./organisationstructform";
// const { Meta } = Card;

// class Organisationstructure extends PageList {
//   service = new OrganisationStructureService();
//   title = "Organisation Structure";
//   columns = [
//     // {
//     //   dataIndex: "SNo",
//     //   key: "sno",
//     //   title: "S.No",
//     // },

//     {
//       dataIndex: "Name",
//       key: "role",
//       title: "NAME",
//     },
//     // {
//     //   dataIndex: "ParentId",
//     //   key: "role",
//     //   title: "PARENT",
//     //   render:(value)=>{
//     //     ParentId=value
//     //   }
//     // },
//     {
//       dataIndex: "Status",
//       key: "Status",
//       title: "Status",
//       render: (value) => {
//         return value ? "Active" : "In-active";
//       },
//     },
//     {
//       dataIndex: "Unique",
//       key: "userId",
//       title: "ACTION",
//       width: 160,
//       align: "center",
//       render: (value) => {
//         return (
//           <>
//             {/* <Button
//               onClick={() => this.duplicate(value)}
//               icon={<CopyOutlined />}
//             ></Button>
//             <ViewButton onClick={() => this.view(value)} /> */}
//             <EditButton onClick={() => this.edit(value)} close={this.onClose} />
//             <DeleteButton
//               onClick={() => this.delete(value)}
//               close={this.onClose}
//             />
//           </>
//         );
//       },
//     },
//   ];

//   _flat(data) {
//     let obj = [];
//     for (let x of data) {
//       obj = [...obj, x];
//       if (x.children?.length > 0) {
//         obj = [...obj, ...this._flat(x.children)];
//       }
//     }
//     return obj;
//   }
//   children(list, parent, level = 0) {
//     let filtered = list.filter((el) => el.ParentId == parent);
//     return filtered.map((e) => {
//       let children = this.children(list, e.Unique, level + 1);
//       if (children.length > 0) {
//         return { ...e, children: children, level: level };
//       } else return { ...e, level: level };
//     });
//   }

//   handleData(list) {
//     //let l = list.sort((a, b) => a.orderNumber - b.orderNumber);
//     let data = this.children(list, 0);
//     this.setState((state) => ({ ...state, countlist: this._flat(data) }));
//     //console.log(this._count(d,0))
//     return data;
//   }

//   componentDidMount() {
//     super.componentDidMount();
//     this.service.list().then((response) => {
//       this.setState((state, props) => ({
//         ...state,
//         //role: response.data.array,
//         role: this.handleData(response.data.array),
//       }));
//     });
//   }

  // _count(list, level) {
  //   let filter = list?.filter((e) => e.level === level);
  //   //console.log(filter);
  //   return filter?.length ?? 0;
  // }

  // state = {
  //   total: [
  //     {
  //       title: "Organisation",
  //       value: 0,
  //       icon: <ApartmentOutlined />,
  //       // url: "organisation",
  //       loading: false,
  //     },
  //     {
  //       title: "Plant",
  //       value: 1,
  //       // icon: <TbBuildingFactory2 />,
  //       icon: (
  //         <img style={{ height: "1.75rem" }} src="/Orgicons/Planticon.png" />
  //       ),

  //       // url: "role",
  //       loading: false,
  //     },
  //     {
  //       title: "Division",
  //       value: 2,
  //       icon: (
  //         <img style={{ height: "1.75rem" }} src="/Orgicons/Divisionicon.png" />
  //       ),
  //       // url: "user",
  //       loading: false,
  //     },
  //     {
  //       title: "Area",
  //       value: 3,
  //       icon: (
  //         <img style={{ height: "1.75rem" }} src="/Orgicons/Areaicon.png" />
  //       ),
  //       // url: "plant",
  //       loading: false,
  //     },
  //     {
  //       title: "Line",
  //       value: 4,
  //       icon: (
  //         <img style={{ height: "1.75rem" }} src="/Orgicons/Lineicon.png" />
  //       ),
  //       // url: "asset-library",
  //       loading: false,
  //     },
  //     {
  //       title: "Machine",
  //       value: 5,
  //       icon: (
  //         <img style={{ height: "1.75rem" }} src="/Orgicons/Stationicon.png" />
  //       ),
  //       // url: "asset",
  //       loading: false,
  //     },
  //   ],
  // };

//   render() {
//     //console.log(this.state.plant)
//     return (
//       <Page
//         title={this.title}
//         state={
//           <Row gutter={[10, 10]}>
//             {this.state.total?.map((e, i) => (
//               <Col sm={6} md={6} lg={4} xl={4} key={`total${i}`}>
//                 <Spin spinning={e.loading}>
//                   {/* <Link to={`../${e.url}`}> */}
//                   <Card hoverable size="small">
//                     <Statistic
//                       title={e.title}
//                       value={this._count(this.state.countlist, e.value)}
//                       prefix={e.icon}
//                     />
//                   </Card>
//                   {/* </Link> */}
//                 </Spin>
//               </Col>
//             ))}
//           </Row>
//         }
//         action={
//           <div style={{ marginRight: "20px" }}>
//             <AddButton onClick={() => this.add()}></AddButton>
//             {/* <EditButton
//             onClick={() => this.edit()}
//             disabled={this.state.selectedRow?.length !== 1}
//           />
//           <DeleteButton disabled={this.state.selectedRow?.length === 0} onClick={()=>this.state.selectedRow.map((e)=>this.delete(e.Role))}/>
//           <DownloadButton />
          

//           <UploadButton /> */}
//           </div>
//         }
//       >
//         <Table
//           rowKey="Unique"
//           pagination={{
//             showSizeChanger: true,
//             showQuickJumper: true,
//             size: "default",
//           }}
//           scroll={{ y: 350 }}
//           //loading={this.state.isLoading}
//           dataSource={this.state.role}
//           columns={this.columns}
//           size="middle"
//         />
//         {this.state.popup?.open && (
//           <Organisationstructform {...this.state.popup} close={this.onClose} />
//         )}
//       </Page>
//     );
//   }
// }

// export default Organisationstructure;


import React from "react";
import { Card, Table,Row,Col,Spin,Statistic } from "antd";
import {
  DeleteButton,
  EditButton,
  ViewButton,
  AddButton,
} from "../../../utils/action-button/action-button";
import OrganisationHierarchyService1 from "../../../services/organisation-hierarchy-service";

import Page from "../../../utils/page/page";
import PageList from "../../../utils/page/page-list";
import { withForm } from "../../../utils/with-form";
// import OrgHierarchyForm from "./org-hierarchy-form";
import OrganisationHierarchyLevelService from "../../../services/organisation-hierarchy-level-service";
// import OrganisationHierarchyForm from "./organisation-hierarchy-from";
import Organisationstructform  from "./organisationstructform"
// Component
class Organisationstructure extends PageList {
  title = "Organisation Hierarchy";
  // service = new OrganisationHierarchyService1();
  // orgLevelService = new OrganisationHierarchyLevelService();
  columns = [
    // {
    //   dataIndex: "SNo",
    //   key: "sno",
    //   title: "S.No",
    // },

    {
      dataIndex: "Name",
      key: "role",
      title: "NAME",
    },
    // {
    //   dataIndex: "ParentId",
    //   key: "role",
    //   title: "PARENT",
    //   render:(value)=>{
    //     ParentId=value
    //   }
    // },
    {
      dataIndex: "Status",
      key: "Status",
      title: "Status",
      render: (value) => {
        return value ? "Active" : "In-active";
      },
    },
    {
      dataIndex: "Unique",
      key: "userId",
      title: "ACTION",
      width: 160,
      align: "center",
      render: (value) => {
        return (
          <>
            {/* <Button
              onClick={() => this.duplicate(value)}
              icon={<CopyOutlined />}
            ></Button>
            <ViewButton onClick={() => this.view(value)} /> */}
            <EditButton onClick={() => this.edit(value)} close={this.onClose} />
            <DeleteButton
              onClick={() => this.delete(value)}
              close={this.onClose}
            />
          </>
        );
      },
    },
  ];
  // componentDidMount() {
  //   super.componentDidMount();
  //   this.orgLevelService.list().then(({ data }) => {
  //     this.setState((state) => ({
  //       ...state,
  //       orgLevel: data.reduce(function (c, e) {
  //         c[e.level] = e.orgHierarchyLevelName;
  //         return c;
  //       }, {}),
  //     }));
  //   });
  // }
  handleData(data) {
    return this.service.convertTree(data);
  }
  render() {
    return (
      <Page
      title={this.title}
      // state={
      //   <Row gutter={[10, 10]}>
      //     {this.state.total?.map((e, i) => (
      //       <Col sm={6} md={6} lg={4} xl={4} key={`total${i}`}>
      //         <Spin spinning={e.loading}>
      //           {/* <Link to={`../${e.url}`}> */}
      //           <Card hoverable size="small">
      //             <Statistic
      //               title={e.title}
      //               value={this._count(this.state.countlist, e.value)}
      //               prefix={e.icon}
      //             />
      //           </Card>
      //           {/* </Link> */}
      //         </Spin>
      //       </Col>
      //     ))}
      //   </Row>
      // }
      action={
        <div style={{ marginRight: "20px" }}>
          <AddButton onClick={() => this.add()}></AddButton>
          {/* <EditButton
          onClick={() => this.edit()}
          disabled={this.state.selectedRow?.length !== 1}
        />
        <DeleteButton disabled={this.state.selectedRow?.length === 0} onClick={()=>this.state.selectedRow.map((e)=>this.delete(e.Role))}/>
        <DownloadButton />
        

        <UploadButton /> */}
        </div>
      }
    >
      <Table
        // rowKey="Unique"
        pagination={{
          showSizeChanger: true,
          showQuickJumper: true,
          size: "default",
        }}
        scroll={{ y: 350 }}
        //loading={this.state.isLoading}
        dataSource={this.state.rows}
        columns={this.columns}
        size="middle"
      />
      {this.state.popup?.open && (
      <Organisationstructform {...this.state.popup} close={this.onClose} />
      )}
    </Page>
    );
  }
}

export default withForm(Organisationstructure);
