import React, { useEffect, useLayoutEffect, useRef } from "react";
import { InfoWindow } from "google-maps-react";
import { Button } from "antd";

export default function InfoWindowEx(props) {
  const infoWindowRef = React.createRef();
  const contentElement = document.createElement(`div`);
  useEffect(() => {
    infoWindowRef.current.infowindow.setContent(contentElement);
  }, [props.children]);
  return <InfoWindow ref={infoWindowRef} {...props} />;
}