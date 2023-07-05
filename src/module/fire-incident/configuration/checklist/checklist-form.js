import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Spin,
  Steps,
} from "antd";

import CheckService from "../../../../services/fire-incident-services/check-service";
import CheckListService from "../../../../services/fire-incident-services/checklist-service";
import Page from "../../../../utils/page/page";
import PageForm from "../../../../utils/page/page-form";
import { withForm } from "../../../../utils/with-form";
import { withRouter } from "../../../../utils/with-router";
import ChecksSelectionList from "./checks-selection-list";

const { TextArea } = Input;
const { Option } = Select;

class ChecklistForm extends PageForm {
  state = { current: 0, form: {} };
  checkservice = new CheckService();
  service = new CheckListService();
  componentDidMount() {
    this.checkservice.list({ active: true }).then((response) => {
      this.setState((state) => ({ ...state, checks: response.data }));
    });

    if (this.props.params.id) {
      this.onRetrieve(this.props.params.id);
      this.closePopup = () => this.props.navigate("../");
      if (this.props.mode == "Edit")
        this.setState((state) => ({ ...state, title: "Edit Checklist" }));
      else if (this.props.mode == "View")
        this.setState((state) => ({
          ...state,
          title: "View Checklist",
          disabled: true,
        }));
    } else {
      this.setState((state) => ({ ...state, title: "Add Checklist" }));
    }
    super.componentDidMount();
  }
  closePopup = () => {
    this.props.navigate("../");
  };
  onSuccess(data) {
    super.onSuccess(data);
    this.closePopup(data.data.checkListId);
  }
  save(checks) {
    this.onSubmit({ ...this.state.formValue, checks: checks });
  }
  onChange = (value) => {
    this.setState((state) => ({ ...state, current: value }));
  };
  onNext = (value) => {
    this.setState(
      (state) => ({ ...state, formValue: value }),
      () => {
        this.onChange(1);
      }
    );
  };
  prev = () => {
    this.onChange(0);
  };
  render() {
    const { current, isLoading } = this.state;
    const content = () => {
      switch (current) {
        case 0:
          return (
            <Form
              size="small"
              form={this.props.form}
              className="form-horizontal"
              colon={false}
              labelCol={{ sm: 8, xs: 24 }}
              wrapperCol={{ sm: 16, xs: 24 }}
              labelAlign="left"
              layout="horizontal"
              onFinish={this.onNext}
              disabled={this.state?.disabled}
            >
              <Row gutter={[20, 20]} justify="space-between">
                <Col sm={16} xs={24}>
                  <Form.Item name="checkListId" hidden>
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="checkListName"
                    label="Checklist Name"
                    rules={[
                      {
                        required: true,
                        message: "Please enter the Checklist Name!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item label="Description" name="description">
                    <TextArea rows={6} maxLength={200} />
                  </Form.Item>
                  {/* <Form.Item
                    label="Checks Selection"
                    name="checks"
                    rules={[
                      {
                        required: true,
                        message: "Please enter the Check Name!",
                      },
                    ]}
                  >
                    <Select mode="multiple">
                      {this.state.checks?.map((e) => (
                        <Option key={`CheckName${e.checkId}`} value={e.checkId}>
                          {e.checkName}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item> */}

                  <Form.Item name="active" label="Status" initialValue={true}>
                    <Radio.Group>
                      <Radio value={true}>Active</Radio>
                      <Radio value={false}>In-active</Radio>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Row>

              <Row justify="end">
                <Col>
                  <Button type="primary" htmlType="submit">
                    Next
                  </Button>
                </Col>
              </Row>
            </Form>
          );
          break;
        case 1:
          return (
            <ChecksSelectionList
              checks={this.state.initialValues?.checks ?? []}
              save={(checks) => this.save(checks)}
              prev={() => this.prev()}
            />
          );
          break;
        default:
          break;
      }
    };
    return (
      <Page title="Checklist">
        <Spin spinning={!!isLoading}>
          <Row justify="center" gutter={[10, 10]}>
            <Col sm={18}>
              <Steps current={current} progressDot>
                <Steps.Step title="General Details"></Steps.Step>
                <Steps.Step title="Check Items"></Steps.Step>
              </Steps>
              <br />
              <Card bordered={false}>{content()}</Card>
            </Col>
          </Row>
        </Spin>
      </Page>
    );
  }
}

export default withRouter(withForm(ChecklistForm));
