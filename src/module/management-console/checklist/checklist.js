import { Button, Col, Row, Table, Tooltip,Form,Select,TreeSelect } from "antd";
import { Link } from "react-router-dom";
//import DigitalWorkflowChecklistService from "../../../../services/preventive-maintenance-services/checklist-service";
import { AddButton,ViewButton,DeleteButton,EditButton } from "../../../utils/action-button/action-button";
import { PlayCircleOutlined, SearchOutlined } from "@ant-design/icons";
import Page from "../../../utils/page/page";
import FilterFunctions from "../../remote-monitoring/common/filter-functions";
import { UploadOutlined } from "@ant-design/icons";
import { checklistPageId } from "../../../helpers/page-ids";
import UserService from "../../../services/user-service";
import { withAuthorization } from "../../../utils/with-authorization";
import AppHierarchyService from "../../../services/app-hierarchy-service";
import AssetService from "../../../services/asset-service";
const style = {
  formItem: {
    minWidth: "120px",
  },
};


class Checklist extends FilterFunctions {
  //service = new DigitalWorkflowChecklistService();
  assetService =new AssetService();
  componentDidMount() {
    Promise.all([this.assetService.list()]).then((response)=>{
      console.log("res",response[0].data);
      this.setState((state)=>({...state,AssetService:response[0].data}))
    })
    
    this.getAppHierarchyList();
    this.getAssetList();
    super.componentDidMount();
  }

  title = "Checklist";
  columns = [
    {
      dataIndex: "sno",
      key: "sno",
      title: "S.No",
      align: "left",
      width: 80,
    },
    {
      dataIndex: "checkListName",
      key: "checkListName",
      title: "Checklist Name",
    },
  
    {
      dataIndex: "assets",
      key: "assets",
      title: "Asset",
      render: (value) => {
        const assetNames = value?.map((item) => item?.asset?.assetName) || [];
        return assetNames.join(", ");
      },
    },
    
    {
      dataIndex: "description",
      key: "description",
      title: "Description",
    },
   
    {
      dataIndex: "active",
      key: "active",
      title: "Status",
      render: (value) => {
        return value ? "Active" : "In-active";
      },
    },
    {
      dataIndex: "checkListId",
      key: "checkListId",
      title: "Action",
      width: 160,
      align: "center",
      render: (value) => {
        return (
          <>
            {this.props.view && (
              <Link to={`view/${value}`}>
                <ViewButton onClick={() => this.view(value)} />
              </Link>
            )}
            {this.props.edit && (
              <Link to={`update/${value}`}>
                <EditButton onClick={() => this.edit(value)} />
              </Link>
            )}
            {this.props.delete && (
              <DeleteButton onClick={() => this.delete(value)} />
            )}
          </>
        );
      },
    },
  ];
  
 
  submitForm = (value) => {
    this.list(value);
  };
  render() {
    return (
   
      <Page
        title={this.title}
     
        // filter={
        //   <Form size="small" layout="inline" onFinish={this.submitForm}>
        //     <Form.Item name="ahId" style={{ minWidth: "250px" }}>
        //       <TreeSelect
        //         onChange={(v) => this.getAssetList(v)}
        //         showSearch
        //         loading={this.state.isparentTreeListLoading}
        //         placeholder="Site"
        //         allowClear
        //         treeData={this.state.parentTreeList}
        //       ></TreeSelect>
        //     </Form.Item>
           
        //     <Form.Item name="assetId" style={style.formItem}>
        //       <Select
        //         onChange={this.getData}
        //         showSearch
        //         loading={this.state.isAssetListLoading}
        //         placeholder="Asset"
        //         allowClear
        //         options={this.state.assetList}
        //       ></Select>
        //     </Form.Item>
          
        //     <Button type="primary" htmlType="submit">
        //       <SearchOutlined /> Go
        //     </Button>
        //   </Form>
        // }
        // action={
        //   <>
           
        //       <Row gutter={[10, 10]}>
        //         <Col>
        //           <Tooltip title="Checklist Upload in Excel">
        //             <Link to="uploadChecklist">
        //               <Button icon={<UploadOutlined />}>Upload</Button>
        //             </Link>
        //           </Tooltip>
        //         </Col>
        //         {this.props.add && (
        //         <Col>
        //           <Link to="add">
        //             <AddButton />
        //           </Link>
        //         </Col>
        //          )}
        //       </Row>
           
        //   </>
        // }
      >
        <br></br>
        <Row justify="space-between">
          <Col >
          <Form size="small" layout="inline" onFinish={this.submitForm}>
            <Form.Item name="ahId" style={{ minWidth: "250px" }}>
              <TreeSelect
                onChange={(v) => this.getAssetList(v)}
                showSearch
                loading={this.state.isparentTreeListLoading}
                placeholder="Site"
                allowClear
                treeData={this.state.parentTreeList}
              ></TreeSelect>
            </Form.Item>
           
            <Form.Item name="assetId" style={style.formItem}>
              <Select
                onChange={this.getData}
                showSearch
                loading={this.state.isAssetListLoading}
                placeholder="Asset"
                allowClear
                options={this.state.assetList}
              ></Select>
            </Form.Item>
            
          
            <Button type="primary" htmlType="submit">
              <SearchOutlined /> Go
            </Button>
          </Form>
          </Col>
          <Col>
          <Row gutter={[10, 10]} justify="end">
          <Col>
                  <Tooltip title="Checks">
                    <Link to="/configuration/check">
                      <Button>Checks</Button>
                    </Link>
                  </Tooltip>
                </Col>
                <Col>
                  <Tooltip title="CheckType">
                    <Link to="/configuration/check-type">
                      <Button>CheckType</Button>
                    </Link>
                  </Tooltip>
                </Col>
                <Col>
                  <Tooltip title="Checklist Upload in Excel">
                    <Link to="uploadChecklist">
                      <Button icon={<UploadOutlined />}>Upload</Button>
                    </Link>
                  </Tooltip>
                </Col>
                {this.props.add && (
                <Col>
                  <Link to="add">
                    <AddButton />
                  </Link>
                </Col>
                 )}
              </Row>
          </Col>
        </Row>
        <br></br>
        <Table
          pagination={{
            showSizeChanger: true,
            showQuickJumper: true,
            size: "default",
          }}
          scroll={{ x: 980 }}
          rowKey="checkListId"
          loading={this.state.isLoading}
          dataSource={this.state.rows}
          columns={this.columns}
          size="middle"
        />
      </Page>
    );
  }
}

export default withAuthorization(Checklist);
