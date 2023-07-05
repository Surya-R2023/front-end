import { Button, Form, Select, Spin, Tag } from "antd";
import moment from "moment";
import React from "react";
import { createSearchParams } from "react-router-dom";
import Page from "../../../utils/page/page";
import { withRouter } from "../../../utils/with-router";
import FilterFunctions from "../../remote-monitoring/common/filter-functions";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { SearchOutlined } from "@ant-design/icons";
import SchedulerService from "../../../services/audit-services/scheduler-service";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);
const style = {
  formItem: {
    minWidth: "120px",
  },
};

class Scheduler extends FilterFunctions {
  service = new SchedulerService();
  state = {
    open: false,
    isCountryListLoading: false,
    countryList: [],
    isContinentListLoading: false,
    continentList: [],
    isStateListLoading: false,
    stateList: [],
    isCustomerListLoading: false,
    customerList: [],
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.getContinentList();
    this.getCustomerList();
    this.getAssetList();
    super.componentDidMount();
  }

  onSelect = (scheduleDate) => {
    this.props.navigate({
      pathname: "./add",
      search: `?${createSearchParams({
        date: scheduleDate,
      })}`,
    });
  };

  componentWillUnmount() {
    clearTimeout(this.timeOut);
  }

  submitForm = (value) => {
    this.list(value);
  };
  handleData(data) {
    return data?.map((e, i) => ({
      id: e.schedulerId,
      title: e.description,
      allDay: true,
      start: moment(e.scheduleDate),
      end: moment(e.scheduleDate).add(1, "h"),
      color: "#4caf50",
    }));
  }

  handleSelectSlot = ({ start }) => {
    this.props.navigate({
      pathname: "./add",
      search: `?${createSearchParams({
        date: moment(start).unix(),
      })}`,
    });
  };
  handleSelectEvent = ({ start, id }) => {
    this.props.navigate({
      pathname: `./update/${id}`,
      // search: `?${createSearchParams({
      //   date: moment(start).unix(),
      // })}`,
    });
  };
  render() {
    const eventStyleGetter = (event, start, end, isSelected) => {
      var backgroundColor = event.color;
      var style = {
        backgroundColor: backgroundColor,
        // borderRadius: '0px',
        // opacity: 0.8,
        color: "#fff",
        border: "0px",
        display: "block",
        // fontWeight: "bold",
      };
      return {
        style: style,
      };
    };
    return (
      <Page
        title="Audit Scheduler"
        filter={
          <Form size="small" layout="inline" onFinish={this.submitForm}>
            <Form.Item name="regionId" style={style.formItem}>
              <Select
                onChange={this.getCountryList}
                loading={this.state.isContinentListLoading}
                showSearch
                placeholder="Region"
                options={this.state.continentList}
              ></Select>
            </Form.Item>
            <Form.Item name="countryId" style={style.formItem}>
              <Select
                onChange={this.getStateList}
                showSearch
                loading={this.state.isCountryListLoading}
                placeholder="Country"
                allowClear
                options={this.state.countryList}
              ></Select>
            </Form.Item>
            <Form.Item name="stateId" style={style.formItem}>
              <Select
                onChange={this.getCustomerList}
                showSearch
                loading={this.state.isStateListLoading}
                placeholder="State"
                allowClear
                options={this.state.stateList}
              ></Select>
            </Form.Item>
            <Form.Item name="customerId" style={style.formItem}>
              <Select
                onChange={this.getAssetList}
                showSearch
                loading={this.state.isCustomerListLoading}
                placeholder="Customer"
                allowClear
                options={this.state.customerList}
              ></Select>
            </Form.Item>
            <Form.Item name="assetId" style={style.formItem}>
              <Select
                showSearch
                loading={this.state.isAssetListLoading}
                placeholder="Asset"
                allowClear
                options={this.state.assetList}
              ></Select>
            </Form.Item>
            <Button type="primary" htmlType="submit">
              <SearchOutlined /> Go
            </Button>
          </Form>
        }
      >
        <Spin spinning={this.state.isLoading}>
          <Calendar
            showMultiDayTimes={true}
            localizer={localizer}
            events={this.state.rows}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 700 }}
            // min={new Date()}
            onSelectEvent={this.handleSelectEvent}
            onSelectSlot={this.handleSelectSlot}
            selectable={true}
            eventPropGetter={eventStyleGetter}
          />
          {/* <Calendar
            onSelect={this.onSelect}
            dateCellRender={this.dateFullCellRender}
            onChange={true}
          /> */}
        </Spin>
      </Page>
    );
  }
}

export default withRouter(Scheduler);
