import { Row, Table } from "antd";
import AppHierarchyService from "../../../services/app-hierarchy-service";
import { AddButton,ViewButton,EditButton,DeleteButton } from "../../../utils/action-button/action-button";
import Page from "../../../utils/page/page";
import PageList from "../../../utils/page/page-list";
import AppHierarchyForm from "./app-hierarchy-form";
import { appHierarchyPageId } from "../../../helpers/page-ids";
import { withAuthorization } from "../../../utils/with-authorization";

class AppHierarchy extends PageList {
 
  form = AppHierarchyForm;
  pageId = appHierarchyPageId;
  service = new AppHierarchyService();
  title = "App Hierarchy";
  componentDidMount(){
    this.list();
  }
  columns = [
    {
      dataIndex: "ahname",
      key: "ahname",
      title: "Name",
      align: "left",
    },

    // {
    //   dataIndex: "ahlevel",
    //   key: "ahlevel",
    //   title: "Level",
    //   align: "left",
    //   width: "100px",
    // },

    {
      dataIndex: "active",
      key: "active",
      title: "Status",
      align: "center",
      width: "150px",
      render: (value) => {
        return value ? "Active" : "In-active";
      },
    },
    {
      dataIndex: "ahid",
      key: "ahid",
      title: "Action",
      width: 160,
      align: "center",
      render: (value, record, index) => {
        return (
          <>
            {this.props.view && <ViewButton onClick={() => this.view(value)} />}
            {this.props.edit && <EditButton onClick={() => this.edit(value)} />}
            {this.props.delete && (
              <DeleteButton onClick={() => this.delete(value)} />
            )}
          </>
        );
      },
    },
  ];
  handleData(data) {
    return this.service.convertToTree(data);
  }

  render() {
    return (
      <>
        <Page
          title={this.title}
          // action={
          //   <>{this.props.add && <AddButton onClick={() => this.add()} />}</>
          // }
        >
          <br></br>
          <Row justify="end">
          <>{this.props.add && <AddButton onClick={() => this.add()} />}</>
          </Row>
          <br></br>
          <Table
            bordered
            rowKey="ahid"
            loading={this.state.isLoading}
            dataSource={this.state.res}
            columns={this.columns}
            size="small"
            pagination={{
              showSizeChanger: true,

              showQuickJumper: true,

              size: "default",
            }}
          />
          <this.form {...this.state.popup} close={this.onClose} />
        </Page>
      </>
    );
  }
}

export default withAuthorization(AppHierarchy);
