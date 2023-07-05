import SuggestionConfigurationService from "../../../services/spare-parts-services/suggestionconfiguration-service";
import PageList from "../../../utils/page/page-list";
import {
  DeleteButton,
  EditButton,
  ViewButton,
} from "../../../utils/action-button/action-button";
import Page from "../../../utils/page/page";
import { AddButton } from "../../../utils/action-button/action-button";
import { Table, message } from "antd";
import SuggestionConfigurationform from "./suggestion-configurationform";
import ProductService from "../../../services/spare-parts-services/product-service";
class SuggestionConfiguration extends PageList {
  service = new SuggestionConfigurationService();
  productService = new ProductService();
  componentDidMount() {
    

    this.setState((state) => ({
      ...state,
      isLoading: true,
    }));
    Promise.all([
      this.service.list(),
    ])
      .then((response) => {
        let changes = this.handleData(response[1].data);
        this.setState((state) => ({
          ...state,
          suggestionconfiguration: response[0].data,
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
  title = "Suggestion Configuration";
  columns = [
    {
      dataIndex: "sno",
      key: "sno",
      title: "S.No",
      width: 80,
      align: "left",
    },

    {
      dataIndex: "alert",
      key: "alert",
      title: "Alert",
      align: "left",
    },
    {
      dataIndex: "checkPoint",
      key: "checkPoint",
      title: "Check Point",
      align: "left",
    },
    {
      dataIndex: "correctiveAction",
      key: "correctiveAction",
      title: "Corrective Action",
    },

    {
      dataIndex: "status",
      key: "status",
      title: "Status",
      align: "left",
      render: (value) => {
        return value ? "Active":"In-active";
      },
    },
  
    {
      dataIndex: "suggestionConfigurationId",
      key: "suggestionConfigurationId",
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
    let e = this.state.suggestionconfiguration?.find((e) => e.suggestionConfigurationId == id);
    return e ? e.S.No : "";
  };

  render() {
    return (
      <Page
        title={this.title}
        action={
          <>
            <AddButton onClick={() => this.add()}/>
          </>
        }
      >
        <Table
          rowKey="suggestionConfigurationId"
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
        <SuggestionConfigurationform {...this.state.popup} close={this.onClose} />
      </Page>
    );
  }
}

export default SuggestionConfiguration;
