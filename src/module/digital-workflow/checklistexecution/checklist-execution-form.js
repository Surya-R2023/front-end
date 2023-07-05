import {
  CloseOutlined,
  CheckOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Descriptions,
  Form,
  Input,
  Radio,
  Row,
  Spin,
  Steps,
  Popover,
  Tag,
} from "antd";
import Moment from "moment";
import CheckTypeService from "../../../services/check-type-service";
import CheckListExecutionService from "../../../services/checklistexecution-service";
import Page from "../../../utils/page/page";
import PageForm from "../../../utils/page/page-form";
import { withForm } from "../../../utils/with-form";
import { withRouter } from "../../../utils/with-router";
const { Step } = Steps;

const { TextArea } = Input;

class CheckListExecutionForm extends PageForm {
  service = new CheckListExecutionService();
  checkTypeService = new CheckTypeService();
  state = {};
  title = "Check List Execution";
  saveFn(data) {
    return this.service.add(data);
  }
  onSuccess(data) {
    super.onSuccess(data);
    this.props.next();
  }

  componentDidMount() {
    this.checkTypeService.list().then((response) => {
      this.setState((state) => ({
        ...state,
        checkType: response.data?.reduce((c, e) => {
          c[e.checkTypeId] = e.checkTypeName;
          return c;
        }, {}),
      }));
    });
    super.componentDidMount();
    if (this.props.params.id) {
      this.setState((state) => ({
        ...state,
        checkListExecutionId: this.props.params.id,
      }));
      this.onRetrieve(this.props.params.id);
    }
  }

  render() {
    return (
      <Spin spinning={this.state.isLoading}>
        <Form   size="small" form={this.props.form} onFinish={this.onFinish} layout="inline">
          <Row gutter={[10, 10]}>
            <Col sm={24}>
              <Descriptions
                column={{ xs: 1, sm: 2, md: 2, lg: 2, xl: 2, xxl: 2 }}
                labelStyle={{ fontWeight: "bold" }}
              >
                <Descriptions.Item label="Check List Description">
                  {this.state.initialValues?.description}
                </Descriptions.Item>
                <Descriptions.Item label="Asset Name">
                  {this.state.initialValues?.asset?.assetName}
                </Descriptions.Item>
                <Descriptions.Item label="Scheduled Date">
                  {Moment(this.state.initialValues?.startDate).format(
                    "DD-MM-YYYY"
                  )}
                </Descriptions.Item>
                <Descriptions.Item label="Status">
                  {this.state.initialValues?.status}
                </Descriptions.Item>
              </Descriptions>
            </Col>
            <Col sm={24}>
              <br />
              <br />
              <Form.List name="checks">
                {(fields, { add, remove }) => (
                  <table className="table table-stripped">
                    <thead>
                      <tr>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Remark</th>
                        {/* {this.state.checkType?.map((f) => (
                          <th width="80px">
                            <Popover
                              content={f.description}
                              title={f.checkTypeName}
                            >
                              {f.checkTypeName}
                            </Popover>
                          </th>
                        ))} */}
                      </tr>
                    </thead>
                    <tbody>
                      {fields.map(({ key, name, ...restField }) => (
                        <tr
                          key={key}
                          style={{
                            marginBottom: 8,
                          }}
                        >
                          <td>
                            <Form.Item
                              hidden
                              {...restField}
                              name={[name, "checkListExecutionChecksId"]}
                            >
                              <Input />
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              name={[name, "checkDescription"]}
                            >
                              <Input
                                bordered={false}
                                readOnly
                                placeholder="Check Description"
                              />
                            </Form.Item>

                            {this.state.initialValues?.checks[
                              key
                            ].checkListExecutionCheckType?.map((e) => (
                              <Tag color="blue">
                                {this.state.checkType[e.checkTypeId]}
                              </Tag>
                            ))}
                          </td>
                          <td align="center">
                            <Form.Item
                              {...restField}
                              name={[name, "status"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Please Select Status!",
                                },
                              ]}
                            >
                              <Radio.Group buttonStyle="solid">
                                <Radio.Button value="YES">Yes</Radio.Button>
                                <Radio.Button value="NO"> No</Radio.Button>
                                <Radio.Button value="NA"> NA</Radio.Button>
                              </Radio.Group>
                            </Form.Item>
                          </td>
                          <td>
                            <Form.Item
                              {...restField}
                              name={[name, "remark"]}
                              dependencies={[name, "status"]}
                              rules={[
                                ({ getFieldValue }) => ({
                                  validator(_, value) {
                                    if (
                                      getFieldValue([
                                        "checks",
                                        name,
                                        "status",
                                      ]) == "NO" &&
                                      !value
                                    ) {
                                      return Promise.reject(
                                        new Error("Remark is required!")
                                      );
                                    }
                                    return Promise.resolve();
                                  },
                                }),
                                {
                                  required: false,
                                  message: "Please enter Remark!",
                                },
                              ]}
                            >
                              <Input.TextArea placeholder="Remarks" />
                            </Form.Item>
                          </td>
                          {/* {this.state.checkType?.map((f) => {
                            let i = this.state.initialValues?.checks[
                              key
                            ].checkListExecutionCheckType.findIndex(
                              (g) => g.checkTypeId == f.checkTypeId
                            );
                            // let i = 0;
                            return (
                              <td
                                align="center"
                                key={`clechId${key}-${f.checkTypeId}`}
                              >
                                <span>
                                  {i > -1 ? (
                                    <span style={{ fontWeight: 900 }}>
                                      <CheckOutlined />
                                    </span>
                                  ) : (
                                    <CloseOutlined style={{ opacity: 0.2 }} />
                                  )}
                                </span>
                              </td>
                            );
                          })} */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </Form.List>
            </Col>
            <Col span={24}>
              <Row justify="end">
                <Col>
                  <Button type="primary" htmlType="submit">
                    Save Preview
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </Spin>
    );
  }
}

export default withRouter(withForm(CheckListExecutionForm));
