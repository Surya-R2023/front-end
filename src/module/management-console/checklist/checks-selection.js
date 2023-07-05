import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Col, Input, message, Row, Table, Tag, Typography } from "antd";
import React, { Component } from "react";
import CheckService from "../../../services/check-service";
import CheckTypeService from "../../../services/check-type-service";
import { AddButton } from "../../../utils/action-button/action-button";
import CheckForm from "../check/check-form";
const selectedRowKey = [];
class ChecksSelection extends Component {
  checkService = new CheckService();

  checkTypeService = new CheckTypeService();
  columns = [
    {
      title: "Check Items",
      dataIndex: "checkName",
      key: "checkName",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    // {
    //   title: "Type",
    //   dataIndex: "checkType",
    //   key: "checkType",
    //   render: (value) => {
    //     return value.map((e) => (
    //       <Tag color="blue" key={e.checkTypeId}>
    //         {e.checkType.checkTypeName}
    //       </Tag>
    //     ));
    //   },
    // },
  ];
  state = {
    checkIds: [],
    selectedChecks: [],
    selectedRowKey: [],
    open: false,
    popup: {
      open: false,
    },
  };
  constructor(props) {
    super(props);
  }
  // componentDidUpdate(prevProps) {
  //   if (prevProps.open == false && this.props.open == true) {
  //     this.setState(
  //       (state) => ({
  //         ...state,
  //         checkIds: [...this.props.checks],
  //       }),
  //       () => {
  //         this.list();
  //       }
  //     );
  //   }
  // }
  onClose = (data) => {
    console.log(typeof data);
    this.setState(
      (state) => ({
        ...this.state,
        popup: { open: false },
        checkIds: [...state.checkIds, data.checkId],
      }),
      () => {
        if (data) {
          this.list();
        }
      }
    );
  };
  add() {
    this.setState({
      ...this.state,
      popup: {
        open: true,
        mode: "Add",
        title: `Add Check Item`,
        id: undefined,
        disabled: false,
      },
    });
  }
  componentDidMount() {
    this.setState(
      (prevState) => ({
        ...prevState.checkIds,
        checkIds: this.props.checks,
      }),
      () => {
        this.list();
      }
    );
  }
  list() {
    this.setState((state) => ({
      ...state,
      isLoading: true,
    }));
    Promise.all([
      this.checkService.list({ active: true }),
      //   this.checkTypeService.list({ active: true }),
    ])
      .then((response) => {
        this.setState((state) => ({
          ...state,
          checks: response[0].data,
          res: response[0].data,
          selectedChecks: response[0].data?.filter((e) => {
            return this.state.checkIds?.some((el) => el === e.checkId);
          }),
        }));
      })
      .catch((error) => {
        console.log(message);
      })
      .finally(() => {
        this.setState((state) => ({ ...state, isLoading: false }));
      });
  }
  filter = (search) => {
    // debugger;
    let s = search.target.value.toLowerCase().trim();
    let res = this.state.checks.filter((e) => {
      return (
        e.checkName?.toLowerCase().includes(s) ||
        e.description?.toLowerCase().includes(s)
      );
    });
    this.setState((state) => ({ ...state, res: res }));
  };
  render() {
    const { isLoading, res, selectedChecks, checkIds } = this.state;
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState((state) => ({
          ...state,
          checkIds: [...selectedRowKeys],
          selectedChecks: selectedRows,
        }));
      },
      selectedRowKeys: this.state.checkIds,
    };
    console.log("resssssssssssssssssss", this.props.checks);
    console.log("this.state.checkIds", checkIds);
    return (
      <>
        {/* <Popups
          open={this.props.open}
          onCancel={this.props.closePopup}
          title="Add / Remove Check Items"
          style={{ top: 20 }}
          onOk={() => this.props.updateChecks(checkIds)}
          width={1000}
        > */}
        <Row justify="space-between" gutter={[10, 10]}>
          <Col span={24}>
            <Typography.Title level={5} style={{ display: "inline-block" }}>
              Selected Checks :
            </Typography.Title>
            &nbsp;
            {selectedChecks?.map((e) => (
              <Tag
                style={{ marginBottom: "5px" }}
                color="cyan"
                key={`sel${e.checkId}`}
              >
                {e.checkName}
              </Tag>
            ))}
          </Col>
          <Col>
            <Input
              prefix={<SearchOutlined style={{ color: "#c4c4c4" }} />}
              onInput={this.filter}
              placeholder="Search..."
              bordered={false}
            />
          </Col>
          <Col>
            <Button
              type="primary"
              onClick={() => this.add()}
              icon={<PlusOutlined />}
            >
              Add New Check Items
            </Button>
          </Col>

          <Col span={24}>
            <Table
              scroll={{ y: "350px" }}
              rowSelection={{
                type: "checkbox",
                ...rowSelection,
              }}
              loading={isLoading}
              columns={this.columns}
              dataSource={res}
              rowKey="checkId"
              size="small"
              pagination={false}
              //   pagination={{
              //     showSizeChanger: true,
              //     size: "default",
              //   }}
            />
          </Col>
        </Row>
        {/* </Popups> */}
        <CheckForm {...this.state.popup} close={this.onClose} />
      </>
    );
  }
}

export default ChecksSelection;
