import PageList from "../../../utils/page/page-list";
import {
  DeleteButton,
  EditButton,
  ViewButton,
} from "../../../utils/action-button/action-button";
import { AddButton } from "../../../utils/action-button/action-button";
import { Table, message } from "antd";
import { Link } from "react-router-dom";
import AssetLibraryServiceBasicDetails from "../../../services/asset-library-service";
import OrganisationService from "../../../services/organisation-service";
import Page from "../../../utils/page/page";

class AssetLibrary extends PageList {
  service = new AssetLibraryServiceBasicDetails();

  componentDidMount() {
    let orgService = new OrganisationService();
    this.setState((state) => ({
      ...state,
      isLoading: true,
    }));
    Promise.all([orgService.list({ active: true }), this.service.list()])
      .then((response) => {
        let changes = this.handleData(response[1].data);
        this.setState((state) => ({
          ...state,
          organisation: response[0].data,
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

  getName = (id) => {
    let e = this.state.organisation?.find((e) => e.organisationId == id);
    return e ? e.organisationName : "";
  };
  title = "Asset Library";
  columns = [
    {
      dataIndex: "sno",
      key: "sno",
      title: "S.No",
      width: 80,
    },
    {
      dataIndex: "assetLibraryName",
      key: "assetLibraryName",
      title: "Library Name",
      sorter: (a, b) => a.assetLibraryName.localeCompare(b.assetLibraryName),
    },
    {
      dataIndex: "description",
      key: "description",
      title: "Description",
      sorter: (a, b) => a.description.localeCompare(b.description),
    },
    {
      dataIndex: "organisationId",
      key: "organisationId",
      title: "Organisation",
      sorter: (a, b) => a.organisationId.localeCompare(b.organisationId),
      render: (value) => {
        return this.getName(value);
      },
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
      dataIndex: "assetLibraryId",
      key: "assetLibraryId",
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
        <Table
          scroll={{ x: 980 }}
          rowKey="assetLibraryId"
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
      </Page>
    );
  }
}

export default AssetLibrary;
