import React, { useState, useEffect } from "react";
import StompClient from "react-stomp-client";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import { Button } from "antd";
const url = "http://localhost:4000/ws";

class BuildingDetail extends React.Component {
  topic = "/topic/alert";
  stompClient;
  constructor(props) {
    super(props);
    this.state = {
      latestMessage: null,
    };

    this.handleMessage = this.handleMessage.bind(this);
  }
  connect = () => {
    let ws = new SockJS(url);
    this.stompClient = Stomp.over(ws);
    const _this = this;
    this.stompClient.connect(
      {},
      (frame) => {
        this.stompClient.subscribe(_this.topic, (sdkEvent) => {
          this.onMessageReceived(sdkEvent);
        });
        //_this.stompClient.reconnect_delay = 2000;
      },
      this.errorCallBack
    );
  };
  onMessageReceived = (event) => {
    console.log("msg=>", event);
  };
  _send(message) {
    console.log("calling logout api via web socket");
    this.stompClient.send("/app/hello", {}, JSON.stringify(message));
  }
  handleMessage(stompMessage) {
    console.log(stompMessage);
    this.setState({
      latestMessage: stompMessage,
    });
  }
  errorCallBack(error) {
    console.log("errorCallBack -> " + error);
    setTimeout(() => {
      this._connect();
    }, 5000);
  }
  render() {
    const { latestMessage } = this.state;
    return (
      <StompClient
        endpoint={url}
        topic={["/topic/test"]}
        onMessage={this.handleMessage}
      >
        <div>
          <Button onClick={() => this.connect()}>Connect</Button>
          <Button onClick={() => this._send("Test Msg")}>Send</Button>
          {latestMessage
            ? `Latest message received: ${latestMessage}`
            : "No message received yet"}
        </div>
      </StompClient>
    );
  }
}

export default BuildingDetail;
