// import FilterService from "../../../services/filter-service";
import PageList from "../../../utils/page/page-list";
import { Button, Form, Select, Row, Col } from "antd";
import React, { useState } from "react";

class Filter extends PageList {
  state = {};
  constructor() {
    super();
  }
  // service = new FilterService();
  title = "Parameter Report";

  static getDerivedStateFromProps(props, state) {
    if (props.layout == "horizontal") {
      return { sm: 6, md: 4, lg: 4, xs: 24 };
    } else {
      return { span: 24 };
    }
  }
  render() {
    return (
      <Form layout="vertical" size="small">
        <Row gutter={[10, 0]} align="bottom">
          <Col {...this.state}>
            <Form.Item label="Country">
              <Select>
                <Select.Option value="UAE">United Arab Emirates</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col {...this.state}>
            <Form.Item label="State">
              <Select>
                <Select.Option value="dubai">Dubai</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col {...this.state}>
            <Form.Item label="Customer">
              <Select>
                <Select.Option value="test">Test</Select.Option>
              </Select>
            </Form.Item>
          </Col>

          <Col {...this.state}>
            <Form.Item label="Machine">
              <Select>
                <Select.Option value="electricalpump">
                  Electrical Pump
                </Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col {...this.state}>
            <Button type="primary" block>
              Filter
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default Filter;
