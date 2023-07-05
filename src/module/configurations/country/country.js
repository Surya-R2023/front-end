import CountryService from "../../../services/country-service";
import ContinentService from "../../../services/continent-service";
import PageList from "../../../utils/page/page-list";
import {
  DeleteButton,
  EditButton,
  ViewButton,
} from "../../../utils/action-button/action-button";
import CountryForm from "./countryform";
import Page from "../../../utils/page/page";
import { AddButton } from "../../../utils/action-button/action-button";
import { Table, message } from "antd";

class Country extends PageList {
  continentservice = new ContinentService();
  service = new CountryService();
  componentDidMount() {
    this.setState((state) => ({
      ...state,
      isLoading: true,
    }));
    Promise.all([
      this.continentservice.list({ active: true }),
      this.service.list(),
    ])
      .then((response) => {
        let changes = this.handleData(response[1].data);
        this.setState((state) => ({
          ...state,
          continent: response[0].data,
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
  title = "Country";
  columns = [
    {
      dataIndex: "sno",
      key: "sno",
      title: "S.No",
      width: 80,
      align: "left",
    },

    {
      dataIndex: "countryName",
      key: "countryName",
      title: "Country Name",
      align: "left",
      sorter: (a, b) => a.countryName.localeCompare(b.countryName),
    },
    {
      dataIndex: "continentId",
      key: "continentId",
      title: "Region",
      align: "left",
      // sorter: (a, b) => a.continentId.localeCompare(b.continentId),

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
      dataIndex: "countryId",
      key: "countryId",
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
    return e ? e.continentName : "";
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
          rowKey="countryId"
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
        <CountryForm {...this.state.popup} close={this.onClose} />
      </Page>
    );
  }
}

export default Country;
