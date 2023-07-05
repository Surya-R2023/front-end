import GatewayService from "../../../services/gateway-service";
import PageList from "../../../utils/page/page-list";
import {
  DeleteButton,
  EditButton,
  ViewButton,
} from "../../../utils/action-button/action-button";
import GatewayForm from "./gatewayform";
import Page from "../../../utils/page/page";
import { AddButton } from "../../../utils/action-button/action-button";
import { Table, Badge } from "antd";

class Gateway extends PageList {
  service = new GatewayService();
  title = "IoT Gateway";
  columns = [
    {
      dataIndex: "sno",
      key: "sno",
      title: "S.No",
      width: 80,
    },
    {
      dataIndex: "mqttName",
      key: "mqttName",
      title: "MQTT Name",
      sorter: (a, b) => a.mqttName.localeCompare(b.mqttName),
    },

    {
      dataIndex: "serverName",
      key: "serverName",
      title: "Server Name",
      sorter: (a, b) => a.serverName.localeCompare(b.serverName),
    },

    // {
    //   dataIndex: "serverPort",
    //   key: "serverPort",
    //   title: "Server Port ",
    // },

    {
      dataIndex: "userName",
      key: "userName",
      title: "User Id ",
      sorter: (a, b) => a.userName.localeCompare(b.userName),
    },
    {
      dataIndex: "connected",
      key: "connected",
      title: "Connection Status",
      align: "left",
      sorter: (a, b) => a.connected.localeCompare(b.connected),
      render: (value) => {
        return value ? (
          <Badge color="green" text="Online" />
        ) : (
          <Badge color="red" text="Offline" />
        );
      },
    },
    {
      dataIndex: "active",
      key: "active",
      title: "Status ",
      align: "left",
      render: (value) => {
        return value ? "Active" : "In-active";
      },
    },

    {
      dataIndex: "mqttConfigId",
      key: "mqttConfigId",
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
    let e = this.state.rows?.find((e) => e.gatewayId == id);
    return e ? e.gatewayName : "";
  };
  render() {
    console.log("rows",this.state.rows);
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
          scroll={{ x: 980 }}
          rowKey="gatewayId"
          loading={this.state.isLoading}
          dataSource={this.state.rows}
          columns={this.columns}
          size="middle"
          pagination={{
            showSizeChanger: true,
            showQuickJumper: true,
            size: "default",
          }}
        />
        <GatewayForm {...this.state.popup} close={this.onClose} />
      </Page>
    );
  }
}

export default Gateway;
