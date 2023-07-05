import PageList from "../../../utils/page/page-list";
import {
  DeleteButton,
  EditButton,
  ViewButton,
} from "../../../utils/action-button/action-button";
import Page from "../../../utils/page/page";
import { AddButton } from "../../../utils/action-button/action-button";
import { Table, message } from "antd";
import NewsUpdateForm from "./news-update-form";
import NewsUpdateService from "../../../services/news-update-service";
// import dateFormat from "../../../Helpers/date-format";
class NewsUpdate extends PageList {
  service = new NewsUpdateService();

  componentDidMount() {
    this.setState((state) => ({
      ...state,

      isLoading: true,
    }));

    Promise.all([this.service.list()])

      .then((response) => {
        let changes = this.handleData(response[0].data);

        this.setState((state) => ({
          ...state,

          // rows: response[0].data,

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
  title = "News Update";
  columns = [
    {
      dataIndex: "sno",
      key: "sno",
      title: "S.No",
      width: 80,
      align: "left",
    },

    {
      dataIndex: "title",
      key: "title",
      title: "Title",
      width: 150,
    },
    {
      dataIndex: "message",
      key: "message",
      title: "Message",
      width: 300,
    },
    {
      dataIndex: "user",
      key: "user",
      title: "Created By",
      width: 120,
      render(record) {
        console.log("Record:", record);
        return record?.userName;
      },
    },
    {
      dataIndex: "date",
      key: "date",
      title: "Updated On",
      width: 150,
      render: (value) => {
        const edtTime = new Date(value).toLocaleString("en-US", {
          timeZone: "America/New_York",
        });
        return edtTime;
        // return value;
      },
    },

    // {
    //   dataIndex: "active",
    //   key: "active",
    //   title: "Status",
    //   render: (value) => {
    //     return !!value ? "Active" : "In-active";
    //   },
    // },
    {
      dataIndex: "newsUpdateId",
      key: "newsUpdateId",
      title: "Action",
      width: 160,
      align: "center",
      render: (value) => {
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
          rowKey="updateId"
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
        <NewsUpdateForm {...this.state.popup} close={this.onClose} />
      </Page>
    );
  }
}

export default NewsUpdate;
