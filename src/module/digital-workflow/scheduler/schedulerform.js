import PageForm from "../../../utils/page/page-form";
import Page from "../../../utils/page/page";
import {
  Button,
  Form,
  Select,
  Row,
  Col,
  DatePicker,
  Radio,
  Spin,
  Card,
} from "antd";
import { Input } from "antd";
import SchedulerService from "../../../services/scheduler-service";
import UserService from "../../../services/user-service";
import CheckListService from "../../../services/checklist-service";
import { withRouter } from "../../../utils/with-router";
import { withForm } from "../../../utils/with-form";
import AssetService from "../../../services/asset-service";
import dayjs from "dayjs";
import moment from "moment";

const { TextArea } = Input;
const { Option } = Select;

class SchedulerForm extends PageForm {
  service = new SchedulerService();
  userservice = new UserService();
  checklistservice = new CheckListService();
  assetservice = new AssetService();

  closePopup = () => {
    this.props.navigate("../");
  };
  onSuccess(data) {
    super.onSuccess(data);
    this.closePopup();
  }

  componentDidMount() {
    if (this.props.searchParams.get("date")) {
      let date = Number(this.props.searchParams.get("date"));
      this.props?.form?.setFieldValue("scheduleDate", dayjs(moment.unix(date)));
    }

    this.assetservice.list({ active: true }).then((response) => {
      this.setState((state) => ({ ...state, asset: response.data }));
    });

    this.checklistservice.list({ active: true }).then((response) => {
      this.setState((state) => ({ ...state, checklist: response.data }));
    });

    this.userservice.list({ active: true }).then((response) => {
      this.setState((state) => ({ ...state, user: response.data }));
    });

    this.service.list({ active: true }).then((response) => {
      this.setState((state) => ({ ...state, scheduler: response.data }));
    });
    if (this.props.params.id) {
      this.onRetrieve(this.props.params.id);
      this.closePopup = () => this.props.navigate("../");
      if (this.props.mode == "Edit")
        this.setState((state) => ({ ...state, title: "Edit Schedule" }));
      else if (this.props.mode == "View")
        this.setState((state) => ({
          ...state,
          title: "View Schedule",
          disabled: true,
        }));
    } else {
      this.setState((state) => ({ ...state, title: "Add Schedule" }));
    }
    super.componentDidMount();
  }
  patchForm(data) {
    if (this.props.form) {
      this.props.form.setFieldsValue({
        ...data,
        scheduleDate: dayjs(data.scheduleDate),
      });
    }
  }
  render() {
    return (
      <Page title={this.state.title}>
        <Row justify="center">
          <Col sm={18} md={18} xs={24}>
            <Spin spinning={!!this.state.isLoading}>
              <Card>
                <Form
                  size="small"
                  form={this.props.form}
                  colon={false}
                  labelAlign="left"
                  layout="vertical"
                  onFinish={this.onFinish}
                  loading={this.state.isLoading}
                >
                  <Row gutter={[10, 10]}>
                    <Col sm={12} xs={24}>
                      <Form.Item name="schedulerId" hidden>
                        <Input />
                      </Form.Item>
                      <Form.Item
                        label="Asset"
                        name="assetId"
                        rules={[
                          {
                            required: true,
                            message: "Please select Asset Name!",
                          },
                        ]}
                      >
                        <Select showSearch>
                          {this.state.asset?.map((e) => (
                            <Option
                              key={`asset${e.assetNameId}`}
                              value={e.assetId}
                            >
                              {e.assetName}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col sm={12} xs={24}>
                      <Form.Item
                        label="Checklist"
                        name="schedulerCheckListMappings"
                        rules={[
                          { required: true, message: "Please add Checklist!" },
                        ]}
                      >
                        <Select showSearch mode="multiple">
                          {this.state.checklist?.map((e) => (
                            <Option
                              key={`checklist${e.checkListId}`}
                              value={e.checkListId}
                            >
                              {e.checkListName}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col sm={12} xs={24}>
                      <Form.Item
                        label="Frequency"
                        name="frequency"
                        rules={[
                          {
                            required: true,
                            message: "Please Select Frequency!",
                          },
                        ]}
                      >
                        <Select showSearch>
                          <Option value="Daily">Daily</Option>
                          <Option value="Weekly">Weekly</Option>
                          <Option value="Monthly">Monthly</Option>
                          <Option value="Quarterly">Quarterly</Option>
                          <Option value="HalfYearly">HalfYearly</Option>
                          <Option value="Yearly">Yearly</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col sm={12} xs={24}>
                      <Form.Item
                        label="Assigned To"
                        name="userId"
                        rules={[
                          { required: true, message: "Please select User!" },
                        ]}
                      >
                        <Select showSearch>
                          {this.state.user?.map((e) => (
                            <Option key={`user${e.userId}`} value={e.userId}>
                              {e.userName}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col sm={12} xs={24}>
                      <Form.Item
                        label="Date"
                        name="scheduleDate"
                        rules={[
                          { required: true, message: "Please select date!" },
                        ]}
                      >
                        <DatePicker format="DD-MM-YYYY" />
                      </Form.Item>
                    </Col>
                    <Col sm={12} xs={24}>
                      <Form.Item
                        name="active"
                        label="Status"
                        initialValue={true}
                      >
                        <Radio.Group>
                          <Radio value={true}>Active</Radio>
                          <Radio value={false}>In-active</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </Col>
                    <Col sm={24} xs={24}>
                      <Form.Item
                        label="Description"
                        name="description"
                        rules={[
                          { required: true, message: "Please add description" },
                        ]}
                      >
                        <TextArea rows={4} maxLength={200} />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row justify="end">
                    <Col>
                      <Button type="primary" htmlType="submit">
                        Save
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card>
            </Spin>
          </Col>
        </Row>
      </Page>
    );
  }
}
export default withForm(withRouter(SchedulerForm));
