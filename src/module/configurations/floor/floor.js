import FloorService from "../../../services/floor-service";
import PlantService from "../../../services/plant-service";
import PageList from "../../../utils/page/page-list";
import { remoteAsset } from "../../../helpers/url";
import {
  DeleteButton,
  EditButton,
  ViewButton,
} from "../../../utils/action-button/action-button";
import Page from "../../../utils/page/page";
import { AddButton } from "../../../utils/action-button/action-button";
import { Table, Avatar,message } from "antd";
import { Link } from "react-router-dom";

class Floor extends PageList {
  plantservice = new PlantService();
  service = new FloorService();
  componentDidMount() {
    Promise.all([
      this.plantservice.list({ active: true }),
      this.service.list(),
    ])
      .then((response) => {
        let changes = this.handleData(response[1].data);
        this.setState((state) => ({
          ...state,
          customer: response[0].data,
          rows: changes,
          res: changes,
        }));
      })
      .catch((error) => {
        message.error(error.message);
      })
      .finally(() => {
        this.setState((state) => ({
          ...state,
          isLoading: false,
        }));
      });

    super.componentDidMount();
  }
 
  title = "Floor";
  columns = [
    {
      dataIndex: "sno",
      key: "sno",
      title: "S.No",
      width: 80,
      align: "left",
    },

    {
      dataIndex: "imageUrl",
      key: "imageUrl",
      title: "Image",
      width: "100px",
      align: "center",
      render: (value) => {
        return <Avatar src={remoteAsset(value)} shape="square" />;
      },
    },

    {
      dataIndex: "floorName",
      key: "floorName",
      title: "Floor Name",
      align: "left",
      sorter: (a, b) => a.floorName.localeCompare(b.floorName),
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
      dataIndex: "floorId",
      key: "floorId",
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
            <Link to="add">
              <AddButton />
            </Link>
          </>
        }
      >
        <Table
          rowKey="floorId"
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
      </Page>
    );
  }
}

export default Floor;
