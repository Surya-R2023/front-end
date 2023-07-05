import PlantService from "../../../services/plant-service";
import PageList from "../../../utils/page/page-list";
import {
  DeleteButton,
  EditButton,
  ViewButton,
} from "../../../utils/action-button/action-button";
import { remoteAsset } from "../../../helpers/url";
import Page from "../../../utils/page/page";
import { AddButton } from "../../../utils/action-button/action-button";
import { Avatar,Table, Input } from "antd";
import { Link } from "react-router-dom";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";

class Plant extends PageList {
  service = new PlantService();
  title = "Customer";
  columns = [
    {
      dataIndex: "sno",
      key: "sno",
      title: "S.No",
      width: 0,
      align: "left",
      render: (value, record, index) => {
        return index + 1;
      },
    },
    {
      dataIndex: "imageUrl",
      key: "imageUrl",
      title: "Image",
      width: "100px",
      align: "center",
      render: (value) => {
        return <Avatar src={remoteAsset(value)} shape="square" />;
      },
    },
    {
      dataIndex: "customerName",
      key: "customerName",
      title: "Site",
      align: "left",
      sorter: (a, b) => a.customerName.localeCompare(b.customerName),
    },
    {
      dataIndex: "buildingLandlineNo",
      key: "buildingLandlineNo",
      title: "Building Landline No.",
      align: "left",
      sorter: (a, b) => a.buildingLandlineNo.localeCompare(b.buildingLandlineNo),
    
    },
    {
      dataIndex: "buildingCategory",
      key: "buildingCategory",
      title: "Building Category",
      align: "left",
      sorter: (a, b) => a.buildingCategory.localeCompare(b.buildingCategory),
    },
    {
      dataIndex: "active",
      key: "active",
      title: "Status",
      align: "left",
      render: (value) => {
        return value ? "Active" : "In-active";
      },
    },
    {
      dataIndex: "customerId",
      key: "customerId",
      title: "Action",
      width: 160,
      align: "center",
      render: (value, record, index) => {
        return (
          <>
            <Link to={`view/${value}`}>
              <ViewButton />
            </Link>
            <Link to={`update/${value}`}>
              <EditButton />
            </Link>
            <DeleteButton onClick={() => this.delete(value)} />
          </>
        );
      },
    },
  ];

  getName = (id) => {
    let e = this.state.rows?.find((e) => e.customerId == id);
    return e ? e.customerName : "";
  };
  filter = (search) => {
    // debugger;
    let s = search.target.value.toLowerCase().trim();
    let res = this.state.rows.filter((e) => {
      return (
        e.customerName?.toLowerCase().includes(s) ||
        e.mobileNo?.toLowerCase().includes(s)
      );
    });
    this.setState((state) => ({ ...state, res: res }));
  };
  render() {
    return (
      <Page
        title={this.title}
        action={
          <>
            <Link to="add">
              <AddButton />
            </Link>
            {/* <AddButton onClick={()=>this.add()}/> */}
          </>
        }
        filter={
          <Input
            prefix={<SearchOutlined style={{ color: "#c4c4c4" }} />}
            onInput={this.filter}
            placeholder="Search..."
            bordered={false}
          />
        }
      >
        <Table
          rowKey="customerId"
          pagination={{
            showSizeChanger: true,

            showQuickJumper: true,

            size: "default",
          }}
          scroll={{ x: 980 }}
          loading={this.state.isLoading}
          dataSource={this.state?.res}
          columns={this.columns}
          size="middle"
        />
      </Page>
    );
  }
}

export default Plant;
