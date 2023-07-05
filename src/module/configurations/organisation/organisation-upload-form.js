import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Modal, Upload, Form, Spin, Select } from "antd";
import { useState } from "react";
import UploadDownloadService from "../../../services/upload-download-service";
import OrganisationService from "../../../services/organisation-service";
import { logDOM } from "@testing-library/react";

function UploadTemplate(props) {
  const [isLoading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [organisation, setOrganisation] = useState(null)
  const [orgName , setOrgName] = useState(null);
  const service = new UploadDownloadService();
  const orgService = new OrganisationService();
  //   const toBase64 = (file) =>
  //     new Promise((resolve, reject) => {
  //       const reader = new FileReader();
  //       reader.readAsDataURL(file);
  //       reader.onload = () => resolve(reader.result);
  //       reader.onerror = (error) => reject(error);
  //     });
  const beforeUpload = (file) => {
    setFile(file);
  };
  const {Option } = Select;
  const organization = () => {
    
    orgService.list().then((response)=>{
      setOrganisation(response?.data)})
  }
  const upload = () => {
    setLoading(true);
    service
      .organisationUpload(file, orgName)
      .then(({ data }) => {
        if (data?.success) {
          message.success(data.message);
          closePopup();
        } else message.error(data.message);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
    return false;
  };
  const closePopup = () => {
   
    setOpen(false);
  };
  const fromFinish = (data) =>{
    setOrgName(data);
  }

  const openPopup = () => {
    setOpen(true);
    organization()
  };
  return (
    <>
      <Modal
        open={open}
        title="Upload File"
        destroyOnClose
        okText="Upload"
        onOk={upload}
        onCancel={closePopup}
      >
        <br />
        <Spin spinning={isLoading}>
          <Form 
          onFinish={fromFinish}
          >
            <Form.Item label="Excel File">
              <Upload beforeUpload={beforeUpload}>
                <Button icon={<UploadOutlined />}>Select File</Button>
              </Upload>
            </Form.Item>
            <Form.Item label="Organisation" name={organisation}>
              <Select onChange={fromFinish}>
                {organisation?.map((e)=>(
                  <Option value={e.organisationName} key={e.organisationId}>
                    {e.organisationName}
                  </Option>
                ))
}
              </Select>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
      {/* <UploadButton onClick={openPopup} /> */}
      <Button icon={<UploadOutlined />} onClick={openPopup}></Button>
    </>
  );
}

export default UploadTemplate;
