import { Avatar, Table, Badge } from "antd";
import { Link } from "react-router-dom";
import { publicUrl } from "../../../helpers/url";
import PageList from "../../../utils/page/page-list";
import { withForm } from "../../../utils/with-form";
import { withRouter } from "../../../utils/with-router";

class Listview extends PageList {
  state = { isLoading: false, rows: [] };
  static getDerivedStateFromProps(props, state) {
    return { ...state, ...props };
  }
  columns = [
    {
      dataIndex: "image",
      key: "image",
      title: "",
      width: 160,
      align: "center",
      render: (value, record) => {
        return (
          <Avatar
            size={50}
            shape="circle"
            src={`${publicUrl}/${record?.imagePath}`}
          >
            {record?.assetName[0]}
          </Avatar>
        );
      },
    },
    {
      dataIndex: "assetName",
      key: "assetName",
      title: "Asset Name",
      align: "left",
      render: (value, record, index) => {
        return (
          <Link to={`../monitoring?assetId=${record.assetId}`}>{value}</Link>
        );
      },
    },
    {
      dataIndex: "assetLibraryName",
      key: "assetLibraryName",
      title: "Asset Library",
      align: "left",
      render: (value, record, index) => {
      return record.assetLibrary.assetLibraryName;
    },
  },
    {
      dataIndex: "connected",
      key: "connected",
      title: "Status",
      align: "left",
      render: (value) => {
        return value ? (
          <Badge color="green" text="Online" />
        ) : (
          <Badge color="red" text="Offline" />
        );
      },
    },
  ];
  render() {
    return (
      <Table
        rowKey="assetId"
        pagination={false}
        scroll={{ x: 980 }}
        loading={this.state.isLoading}
        dataSource={this.state.rows}
        columns={this.columns}
        size="middle"
      />
    );
  }
}

export default withRouter(withForm(Listview));
