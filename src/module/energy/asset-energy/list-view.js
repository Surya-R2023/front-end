import { Table } from "antd";
import { Link } from "react-router-dom";
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
      dataIndex: "assetId",
      key: "assetId",
      title: "S.No",
      width: 80,
      align: "left",
      render: (value, record, index) => {
        return index + 1;
      },
    },
    {
      dataIndex: "assetName",
      key: "assetName",
      title: "Device",
      width: 160,
      align: "left",
      render: (value, record, index) => {
        return (
          <Link to={`../energy-consumption?assetId=${record.assetId}`}>
            {value}
          </Link>
        );
      },
    },
    {
      dataIndex: "energyMeterReading",
      key: "energyMeterReading",
      title: "Energy Meter Reading(KWH)",
      align: "right",
    },

    {
      dataIndex: "monthConsumption",
      key: "monthConsumption",
      title: "Month Energy Consumption(KWH)",
      align: "right",
    },
    {
      dataIndex: "consumption",
      key: "consumption",
      title: " Todays Energy Consumption(KWH)",
      align: "right",
    },
  ];
  render() {
    return (
      <Table
        rowKey=""
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
