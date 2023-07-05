import { Col, message, Row, Table, Tag, Button } from "antd";
import React, { Component } from "react";
import CheckService from "../../../services/check-service";

import ChecksSelection from "./checks-selection";
import Popups from "../../../utils/page/popups";
class ChecksSelectionList extends Component {
  state = { checkItems: [], checks: [], isLoading: false, popup: false , checkIds:[] };
  checkService = new CheckService();
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
    {
      title: "Type",
      dataIndex: "checkType",
      key: "checkType",
      render: (value) => {
        return value?.map((e) => (
          <Tag color="blue" key={e.checkTypeId}>
            {e.checkType.checkTypeName ? e.checkType.checkTypeName : null}
          </Tag> 
        ));
      },
    },
  ];
  constructor(props) {
    super(props);
    this.callRef = React.createRef();
  }

  // setChecksId = () => {
  //   for(let i=0;i<this.props.checks.length;i++)
  //   {
  //     console.log(this.props.checks[i].checkId);
  //     // this.setState({checkIds:this.props.checks[i].checkId})
  //     this.setState((prevState) => ({
  //       checkIds: [...prevState.checkIds, this.props.checks[i].checkId],
  //     }));
  //   }
    
  // }
  componentDidMount() {
    this.setState((state) => ({ ...state, checks: this.props.checks?.map(e=>e.checkId) }));
    this.list();
  }
  list() {
    
    this.setState((state) => ({ ...state, isLoading: true }));
    Promise.all([this.checkService.list({ active: true })])
      .then((response) => {
        this.setState((state) => ({
          ...state,
          checkItems: response[0].data.filter((e) =>
            this.state.checks.some((el) => el == e.checkId)
          ),
        }));
      })
      .catch((error) => {
        console.log(message);
      })
      .finally(() => {
        this.setState((state) => ({ ...state, isLoading: false }));
      });
      console.log("this.state.checkIds",this.state.checkIds);
  }
  closePopup = (e) => {
    this.setState((state) => ({ ...state, popup: false }));
  };
  openPopup = () => {
    this.setState((state) => ({ ...state, popup: true }));
  };
  onOk = (e) => {
    console.log(e);
  };
  updateChecks = (e) => {
    this.setState(
      (state) => ({
        ...state,
        checks: this.callRef.current.state.checkIds,
        popup: false,
      }),
      () => {
        this.list();
      }
    );
  };
  render() {
    const { isLoading, checkItems, checks } = this.state;
    return (
      <>
        <Row justify="end">
          <Col>
            <Button type="primary" onClick={this.openPopup}>
              Add / Remove Check Items
            </Button>
          </Col>
          <Col span={24}>
            <Table
              loading={isLoading}
              columns={this.columns}
              dataSource={checkItems}
              size="middle"
              pagination={{
                showSizeChanger: true,
                size: "default",
              }}
            />
          </Col>
          <Col style={{ marginRight: "auto" }}>
            <Button onClick={() => this.props.prev()}>Back</Button>
          </Col>
          <Col>
            <Button type="primary" onClick={() => this.props.save(checks)}>
              Save
            </Button>
          </Col>
        </Row>

        <Popups
          destroyOnClose
          open={this.state.popup}
          onCancel={this.closePopup}
          title="Add / Remove Check Items"
          style={{ top: 20 }}
          onOk={this.updateChecks}
          width={1000}
        >
          <ChecksSelection
            ref={this.callRef}
            checks={this.state.checks}
            updateChecks={this.updateChecks}
          />
        </Popups>
      </>
    );
  }
}

export default ChecksSelectionList;
