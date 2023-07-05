import ContinentService from "../../../services/continent-service";
import PageList from "../../../utils/page/page-list";
import {
  DeleteButton,
  EditButton,
  ViewButton,
} from "../../../utils/action-button/action-button";
import ContinentForm from "./continentform";
import Page from "../../../utils/page/page";
import { AddButton } from "../../../utils/action-button/action-button";
import { Table } from "antd";

class Continent extends PageList {
  service = new ContinentService();
  title = "Region";
  columns = [
    {
      dataIndex: "sno",
      key: "sno",
      title: "S.No",
      width: 80,
      align: "left",
    },

    {
      dataIndex: "continentName",
      key: "continentName",
      title: "Region Name",
      align: "left",
      sorter: (a, b) => a.continentName.localeCompare(b.continentName)
    },
    {
      dataIndex: "active",
      key: "active",
      title: "Status",
      render: (value) => {
        return !!value ? "Active" : "In-active";
      },
    },
    {
      dataIndex: "continentId",
      key: "continentId",
      title: "Action",
      width: 160,
      align: "center",
      render: (value, record, index) => {
        return (
          <>
            <ViewButton onClick={() => this.view(value)} />
            <EditButton onClick={() => this.edit(value)} />
            <DeleteButton onClick={() => this.delete(value)} />
          </>
        );
      },
    },
  ];

  getName = (id) => {
    let e = this.state.continent?.find((e) => e.continentId == id);
    return e ? e.sno : "";
  };

  render() {
    return (
      <Page
        title={this.title}
        action={
          <>
            <AddButton onClick={() => this.add()} />
          </>
        }
      >
        <Table
          rowKey="continent"
          pagination={{
            showSizeChanger: true,

            showQuickJumper: true,

            size: "default",
          }}
          scroll={{ x: 980 }}
          loading={this.state.isLoading}
          dataSource={this.state.rows}
          columns={this.columns}
          size="middle"
        />
        <ContinentForm {...this.state.popup} close={this.onClose} />
      </Page>
    );
  }
}

export default Continent;
