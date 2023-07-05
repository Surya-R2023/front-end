import CameraService from "../../../services/camera-service";
import FloorService from "../../../services/floor-service";
import PlantService from "../../../services/plant-service";
import PageList from "../../../utils/page/page-list";
import {
  DeleteButton,
  EditButton,
  ViewButton,
} from "../../../utils/action-button/action-button";
import CameraConfiguration from "./camera-configuration";
import Page from "../../../utils/page/page";
import { AddButton } from "../../../utils/action-button/action-button";
import { Table, message,Button } from "antd";
import { Link } from "react-router-dom";

class Camera extends PageList {
  service = new CameraService();
  floorservice = new FloorService();
  plantservice = new PlantService();

  componentDidMount() {
    this.setState((state) => ({
      ...state,
      isLoading: true,
    }));
    Promise.all([
      this.floorservice.list(),
      this.plantservice.list(),
      this.service.list(),
    ])
      .then((response) => {
        let changes = this.handleData(response[1].data);
        this.setState((state) => ({
          ...state,
          camera: response[0].data,
          customer: response[0].data,
          floor:response[0].data,
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
  title = "Camera";
  columns = [
    {
      dataIndex: "sno",
      key: "sno",
      title: "S.No",
      width: 80,
      align: "left",
    },

    {
      dataIndex: "cameraName",
      key: "cameraName",
      title: "Camera Name",
      align: "left",
    
    },
    {
      dataIndex: "cameraUrl",
      key: "cameraUrl",
      title: "Camera Url",
      align: "left",
      render: (e) => <Link to={`../cameraframe?`}><Button type="text"><a href={"View"}> {"View"}  </a> </Button></Link>,

    },

    {
        dataIndex: "taskType",
        key: "taskType",
        title: "Task Type",
        align: "left",
      
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
      dataIndex: "cameraId",
      key: "cameraId",
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
    let e = this.state.camera?.find((e) => e.camera == id);
    return e ? e.camera : "";
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
          rowKey="camera"
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
        <CameraConfiguration {...this.state.popup} close={this.onClose} />
      </Page>
    );
  }
}

export default Camera;
