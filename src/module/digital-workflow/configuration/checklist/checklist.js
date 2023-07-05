import { Table } from "antd";
import { Link } from "react-router-dom";
import DigitalWorkflowChecklistService from "../../../../services/checklist-service";
import {
  AddButton,
  DeleteButton,
  EditButton,
  ViewButton,
} from "../../../../utils/action-button/action-button";
import Page from "../../../../utils/page/page";
import FilterFunctions from "../../../remote-monitoring/common/filter-functions";

const style = {
  formItem: {
    minWidth: "120px",
  },
};

class Checklist extends FilterFunctions {
  service = new DigitalWorkflowChecklistService();
  // state = {
  //   open: false,
  //   isCountryListLoading: false,
  //   countryList: [],
  //   isContinentListLoading: false,
  //   continentList: [],
  //   isStateListLoading: false,
  //   stateList: [],
  //   isCustomerListLoading: false,
  //   customerList: [],
  // };

  // continentService = new ContinentService();
  // countryService = new CountryService();
  // stateService = new StateService();

  // componentDidMount() {
  //   this.getContinentList();
  //   this.getCustomerList();
  //   this.getCountryList();
  //   this.getStateList();
  //   this.getAssetList();
  // }

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

  render() {
    return (
      <Page
        title={this.title}
        action={
          <>
            <Link to="add">
              <AddButton />
            </Link>
          </>
        }
      >
        {/* <Col sm={24}>
          <Card size="small" className="rounded">
            <Form size="small" layout="inline">
              <Form.Item name="region" style={style.formItem}>
                <Select
                  onChange={this.getCountryList}
                  loading={this.state.isContinentListLoading}
                  showSearch
                  placeholder="Region"
                  options={this.state.continentList}
                ></Select>
              </Form.Item>
              <Form.Item name="country" style={style.formItem}>
                <Select
                  onChange={this.getStateList}
                  showSearch
                  loading={this.state.isCountryListLoading}
                  placeholder="Country"
                  allowClear
                  options={this.state.countryList}
                ></Select>
              </Form.Item>
              <Form.Item name="state" style={style.formItem}>
                <Select
                  onChange={this.getCustomerList}
                  showSearch
                  loading={this.state.isStateListLoading}
                  placeholder="State"
                  allowClear
                  options={this.state.stateList}
                ></Select>
              </Form.Item>
              <Form.Item name="customer" style={style.formItem}>
                <Select
                  onChange={this.getAssetList}
                  showSearch
                  loading={this.state.isCustomerListLoading}
                  placeholder="Customer"
                  allowClear
                  options={this.state.customerList}
                ></Select>
              </Form.Item>
              <Form.Item name="asset" style={style.formItem}>
                <Select
                  onChange={this.getData}
                  showSearch
                  loading={this.state.isAssetListLoading}
                  placeholder="Asset"
                  allowClear
                  options={this.state.assetList}
                ></Select>
              </Form.Item>
            </Form>
          </Card>
        </Col> */}

        {/* <Filter layout="horizontal" /> */}
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

export default Checklist;
