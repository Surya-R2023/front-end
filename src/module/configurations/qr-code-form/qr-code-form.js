import { Form, Input, InputNumber, QRCode } from "antd";
import React, { Component } from "react";

class QRCodeForm extends Component {
  state = { link: null, size: 250 };
  static getDerivedStateFromProps(props, state) {
    return { ...props };
  }
  downloadQRCode = () => {
    const canvas = document.getElementById("myqrcode")?.querySelector("canvas");
    if (canvas) {
      const url = canvas.toDataURL();
      const a = document.createElement("a");
      a.download = "QRCode.png";
      a.href = url;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };
  setSize = (e) => {
    this.setState((state) => ({ ...state, size: e }));
  };

  render() {
    return (
      <div>
        <div
          id="myqrcode"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <QRCode size={this.state.size} value={this.state.link} />
        </div>

        <br />
        <Form>
          <Form.Item label="Link">
            <Input value={this.state.link} readonly />
          </Form.Item>
          <Form.Item label="Size">
            <InputNumber
              value={this.state.size}
              onChange={(e) => this.setSize(e)}
            />
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default QRCodeForm;
