import CountryService from "../../../services/country-service";
import StateService from "../../../services/state-service";
import {
  DeleteButton,
  EditButton,
  ViewButton,
} from "../../../utils/action-button/action-button";
import StateForm from "./stateform";
import PageList from "../../../utils/page/page-list";
import Page from "../../../utils/page/page";
import { AddButton } from "../../../utils/action-button/action-button";
import { Table, message } from "antd";

class State extends PageList {
  countryservice = new CountryService();
  service = new StateService();
  componentDidMount() {
    Promise.all([
      this.countryservice.list({ active: true }),
      this.service.list(),
    ])
      .then((response) => {
        let changes = this.handleData(response[1].data);
        this.setState((state) => ({
          ...state,
          country: response[0].data,
          rows: changes,
          res: changes,
        }));
      })
      .catch((error) => {
        console.log(message);
      })
      .finally(() => {
        this.setState((state) => ({
          ...state,
          isLoading: false,
        }));
      });

    super.componentDidMount();
  }
  title = "State";
  columns = [
    {
      dataIndex: "sno",
      key: "sno",
      title: "S.No",
      width: 80,
      align: "left",
    },

    {
      dataIndex: "stateName",
      key: "stateName",
      title: "State Name",
      align: "left",
      sorter: (a, b) => a.stateName.localeCompare(b.stateName),
    },
    {
      dataIndex: "countryId",
      key: "countryId",
      title: "Country",
      align: "left",
      sorter: (a, b) => a.countryId.localeCompare(b.countryId),
      render: (value) => {
        return this.getName(value);
      },
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
      dataIndex: "stateId",
      key: "stateId",
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
    let e = this.state.country?.find((e) => e.countryId == id);
    return e ? e.countryName : "";
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
          rowKey="stateId"
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
        <StateForm {...this.state.popup} close={this.onClose} />
      </Page>
    );
  }
}

export default State;
