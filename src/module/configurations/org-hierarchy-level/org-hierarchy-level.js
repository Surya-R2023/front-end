import { ExclamationCircleOutlined, MenuOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Radio,
  Table,
  Typography,
} from "antd";
import { arrayMoveImmutable } from "array-move";
import React from "react";
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
} from "react-sortable-hoc";
import OrganisationHierarchyService from "../../../services/organisation-hierarchy-level-service";
import {
  AddButton,
  DeleteButton,
  EditButton,
} from "../../../utils/action-button/action-button";
import Page from "../../../utils/page/page";
import PageList from "../../../utils/page/page-list";
import { withForm } from "../../../utils/with-form";
const { confirm } = Modal;
// Drag & drop functionality
const DragHandle = SortableHandle(() => (
  <MenuOutlined
    style={{
      cursor: "grab",
      color: "#999",
    }}
  />
));

const SortableItem = SortableElement((props) => <tr {...props} />);
const SortableBody = SortableContainer((props) => <tbody {...props} />);

// Component
class OrganisationHierarchyLevel extends PageList {
  title = "Organisation Hierarchy Level";
  service = new OrganisationHierarchyService();
  state = {
    rows: [],
    editingKey: null,
    addKey: null,
  };
  // list = () =>{
  //   this.service.list().then(response=>{
  //     this.setState(state=>({...state,isLoading:false,data:response.data}));
  //   })
  // }
  // Editable cell
  EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    // console.log(inputType);
    // const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
    const inputNode =
      dataIndex === "active" ? (
        <Radio.Group>
          <Radio value={true}>Active</Radio>
          <Radio value={false}>In-active</Radio>
        </Radio.Group>
      ) : (
        <Input />
      );
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  isEditing = (record) => record.orgHierarchyLevelId === this.state.editingKey;

  isAdding = (record) => record.orgHierarchyLevelId === this.state.addKey;

  addRow = (newLevel) => {
    const newData = [...this.state.rows];
    newData.push({
      key: newLevel.toString(),
      level: newLevel,
      orgHierarchyLevelName: "",
      orgHierarchyLevelId: "",
      active: true,
    });

    // console.log(newData[newLevel]);
    this.props.form.setFieldsValue(newData[newLevel]);
    this.setState((state) => ({
      ...state,
      addKey: "",
      // editingKey: newData[newLevel].level,
      rows: newData,
    }));
    // this.setState({ rows: newData });

    // const index = newData.findIndex(
    //   (item) => Number(newlevel) === Number(item.level)
    // );
    // this.edit(newData[newlevel]);
    // this.edit(newData[newLevel]);
  };

  edit = (record) => {
    this.props.form.setFieldsValue(record);
    this.setState((state) => ({
      ...state,
      editingKey: record.orgHierarchyLevelId,
    }));
    // console.log("in edit, state:" + this.state.rows);
    // console.log("in edit, record: " + record.level);
  };

  deleteData(record) {
    confirm({
      title: "Are you sure delete this entry?",
      icon: <ExclamationCircleOutlined />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        super.delete(record.orgHierarchyLevelId);
      },

      onCancel() {
        console.log("Cancel");
      },
    });

    // var array = [...this.state.rows];
    // var index = array.indexOf(record);
    // if (index !== -1) {
    //   array.splice(index, 1);
    // }
    // let updatedData = array.map((e, i) => ({
    //   ...e,
    //   level: i,
    //   key: i.toString(),
    // }));
    // this.setState((state) => ({ rows: updatedData }));
    // // }
  }

  cancel = () => {
    if (this.state.addKey) {
      let index = this.state.rows.findIndex(this.isAdding);
      if (index !== -1) {
        this.delete(this.state.rows[index]);
      }
    }
    this.setState((state) => ({ ...state, editingKey: null, addKey: null }));
  };

  save = async (data) => {
    try {
      const row = await this.props.form.validateFields();
      this.setState((state) => ({ ...state, isLoading: true }));
      this.service
        .add({ ...data, ...row })
        .then((response) => {
          if (response.data?.success) {
            message.success(response.data.message);
            this.setState(
              (state) => ({
                ...state,
                editingKey: null,
                addKey: null,
              }),
              () => {
                this.list();
              }
            );
          } else message.error(response.data.message);
        })
        .catch((error) => {
          console.log(message);
        })
        .finally(() => {
          this.setState((state) => ({ ...state, isLoading: false }));
        });

      // let items = [...this.state.rows];
      // const index = items.findIndex(
      //   (item) => Number(level) === Number(item.level)
      // );

      // if (index > -1) items[index] = { ...items[index], ...row };
      // // items[index].orgHierarchyLevelName = row.orgHierarchyLevelName;
      // else items.push(row);
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  // Drag & Drop functionality
  onSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex !== newIndex) {
      const newData = arrayMoveImmutable(
        this.state.rows?.slice(),
        oldIndex,
        newIndex
      ).filter((el) => !!el);
      console.log(newData);
      let updatedData = newData.map((e, i) => ({
        ...e,
        key: i.toString(),
        level: i,
      }));
      this.setState((state) => ({ ...state, isLoading: true }));
      this.service
        .saveAll(updatedData)
        .then((response) => {
          if (response.data?.success) {
            message.success(response.data.message);
            this.setState(
              (state) => ({
                ...state,
                editingKey: null,
                addKey: null,
              }),
              () => {
                this.list();
              }
            );
          } else message.error(response.data.message);
        })
        .catch((error) => {
          console.log(message);
        })
        .finally(() => {
          this.setState((state) => ({ ...state, isLoading: false }));
        });

      this.setState((state) => ({ ...state, rows: updatedData }));
    }
  };

  DraggableContainer = (props) => (
    <SortableBody
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={this.onSortEnd}
      {...props}
    />
  );

  DraggableBodyRow = ({ className, style, ...restProps }) => {
    // function findIndex base on Table rowKey props and should always be a right array index

    const index = this.state.rows?.findIndex((x) => {
      // console.log(restProps);
      return (
        Number(x.orgHierarchyLevelId) === Number(restProps["data-row-key"])
      );
    });
    return <SortableItem index={index} {...restProps} />;
  };

  render() {
    const columns = [
      {
        title: "Key",
        dataIndex: "key",
        width: "5%",
      },
      {
        title: "Sort",
        dataIndex: "sort",
        width: "5%",
        className: "drag-visible",
        render: () => <DragHandle />,
      },
      {
        dataIndex: "level",
        key: "level",
        title: "Hierarchy Level",
        width: "15%",
        inputType: "Number",
        render: (text, record, index) => Number(text),
      },
      {
        dataIndex: "orgHierarchyLevelName",
        key: "orgHierarchyLevelName",
        title: "Hierarchy Name",
        editable: true,
      },
      {
        dataIndex: "active",
        key: "active",
        title: "Status ",
        editable: true,
        align: "left",
        width: "20%",
        render: (value) => {
          return value ? "Active" : "In-active";
        },
      },
      {
        title: "Action",
        dataIndex: "orgHierarchyLevelId",
        key: "orgHierarchyLevelId",
        align: "center",
        width: "10%",
        render: (_, record) => {
          // const editable = this.isEditing(record);

          return this.isEditing(record) || this.isAdding(record) ? (
            <span>
              <Typography.Link
                onClick={() => this.save(record)}
                style={{
                  marginRight: 8,
                }}
              >
                Save
              </Typography.Link>
              <Popconfirm title="Sure to cancel?" onConfirm={this.cancel}>
                <a>Cancel</a>
              </Popconfirm>
            </span>
          ) : (
            <span>
              <EditButton
                disabled={this.state.editingKey !== null}
                onClick={() => this.edit(record)}
              />
              <DeleteButton
                disabled={this.state.editingKey !== null}
                onClick={() => this.deleteData(record)}
              />
            </span>
          );
        },
      },
    ];
    const mergedColumns = columns.map((col) => {
      if (!col.editable) {
        return col;
      }

      return {
        ...col,
        onCell: (record) => ({
          record,
          inputType: col.dataIndex === "level" ? "number" : "text",
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record) || this.isAdding(record),
        }),
      };
    });

    return (
      <Page
        title={this.title}
        action={
          <>
            <AddButton
              onClick={() => this.addRow(this.state.rows?.length)}
              disabled={
                this.state.editingKey !== null || this.state.addKey !== null
              }
            />
          </>
        }
      >
        <Form form={this.props.form}>
          {/* {JSON.stringify(this.state.rows)} */}
          <Table
            bordered
            loading={this.state.isLoading}
            dataSource={this.state.rows}
            columns={mergedColumns}
            rowClassName="editable-row"
            pagination={false}
            rowKey="orgHierarchyLevelId"
            components={{
              body: {
                wrapper: this.DraggableContainer,
                row: this.DraggableBodyRow,
                cell: this.EditableCell,
              },
            }}
          />
        </Form>
      </Page>
    );
  }
  handleData(data) {
    return data
      .map((e, i) => ({ key: `${e.level}`, ...e }))
      .sort((a, b) => a.level - b.level);
  }
}

export default withForm(OrganisationHierarchyLevel);
