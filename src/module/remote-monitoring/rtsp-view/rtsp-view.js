import JsmpegPlayer from "./JsmpegPlayer";
import React, { Component } from "react";

class RtspView extends Component {
  state = {};
  render() {
    let jsmpegPlayer = null;
    return (
      <>
        <p>
          <video
            id="video"
            src="http://192.168.0.107:8080"
            autoplay="autoplay"
            width="500"
          ></video>
        </p>
        {/* <JsmpegPlayer
          wrapperClassName="video-wrapper"
          videoUrl="rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mp4"
          options={{
            "Content-Type": "application/x-mpegURL",
            "Access-Control-Allow-Origin": "*",
          }}
          overlayOptions={{}}
          onRef={(ref) => (jsmpegPlayer = ref)}
        />
        <div className="buttons-wrapper">
          <button onClick={() => jsmpegPlayer.play()}>Play</button>
          <button onClick={() => jsmpegPlayer.pause()}>Pause</button>
          <button onClick={() => jsmpegPlayer.stop()}>Stop</button>
        </div> */}
      </>
    );
  }
}

export default RtspView;
