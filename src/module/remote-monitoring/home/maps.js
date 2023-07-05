import React, { memo, useLayoutEffect } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import { mapKey } from "../../../helpers/url";
import { CopyOutlined } from "@ant-design/icons";
import { Button, Card, Tooltip ,message} from "antd";
import { Link, BrowserRouter as Router } from "react-router-dom";

let mainUrl;
const text = <span>prompt text</span>;
// const info = () => {
//   message.info('hi');
// };
const handleClick = () => {
  message.info('Button clicked!');
}
const currentPath = window.location.href;

const newPath = currentPath.replace("/building-view", "/fire-dashboard");

class Maps extends React.Component {
  state = {
    showingInfoWindow: false,
    activeMarker: null,
    selectedPlace: null,
    showInfoWIndow: false,
    plantId: null,
  };

  handleClick = () => {
    console.log("CLicked");
  };
  // copy = (value) => {
  //   navigator.clipboard.writeText(value);
  // };
  copy = (value) => {
    if (value) {
      const textArea = document.createElement("textarea");
      textArea.value = value;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
    }
  };
  handleMarkerClick = (props, marker) => {
    console.log("pathhhhh", newPath);
    const findKey = this.state.marker.find((obj) => {
      return obj.title === props.title;
    });
    this.setState({
      activeMarker: marker,
      selectedPlace: props,
      showInfoWIndow: true,
      plantId: findKey.key,
    });
  };
  style = [
    {
      featureType: "administrative",
      elementType: "all",
      stylers: [
        {
          visibility: "simplified",
        },
        {
          gamma: "1.00",
        },
      ],
    },
    {
      featureType: "administrative",
      elementType: "labels",
      stylers: [
        {
          weight: "1",
        },
      ],
    },
    {
      featureType: "administrative.locality",
      elementType: "labels",
      stylers: [
        {
          color: "#ba5858",
        },
        {
          visibility: "off",
        },
        {
          weight: "10",
        },
      ],
    },
    {
      featureType: "administrative.neighborhood",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "landscape",
      elementType: "geometry",
      stylers: [
        {
          visibility: "simplified",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "geometry",
      stylers: [
        {
          visibility: "simplified",
        },
        {
          saturation: "-100",
        },
        {
          lightness: "80",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi.attraction",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [
        {
          visibility: "simplified",
        },
        {
          color: "#dddddd",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road.highway.controlled_access",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [
        {
          visibility: "simplified",
        },
        {
          color: "#dddddd",
        },
      ],
    },
    {
      featureType: "road.arterial",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road.local",
      elementType: "geometry",
      stylers: [
        {
          visibility: "simplified",
        },
        {
          color: "#eeeeee",
        },
      ],
    },
    {
      featureType: "road.local",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#ba5858",
        },
        {
          saturation: "-100",
        },
      ],
    },
    {
      featureType: "transit.station",
      elementType: "all",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "transit.station",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#ba5858",
        },
        {
          visibility: "simplified",
        },
      ],
    },
    {
      featureType: "transit.station",
      elementType: "labels.icon",
      stylers: [
        {
          hue: "#ff0036",
        },
      ],
    },

    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          visibility: "simplified",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },

    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#ba5858",
        },
      ],
    },
  ];
  constructor(props) {
    super(props);
  }
  _mapLoaded(mapProps, map) {
    map.setOptions({
      styles: this.style,
      streetViewControl: false,
      //disableDefaultUI: true,
      fullscreenControl: false,
      zoomControl: true,
      maxZoom: 16,
      mapTypeId: "satellite",
      scrollwheel: true,
    });
  }
  static getDerivedStateFromProps(props, state) {
    return { ...state, ...props };
  }

  render() {
    const bounds = new this.state.google.maps.LatLngBounds();
    if (this.state.marker) {
      for (let x of this.state.marker) {
        if (x.position) bounds.extend(x.position);
      }
    }
    return (
      <>
        <Map
          className="map"
          google={this.props.google}
          // initialCenter={this.state.initialCenter}
          containerStyle={{
            width: "100%",
            height: "70vh",
            position: "relative",
            border: "2px solid #fff",
            zIndex: 0,
          }}
          bounds={bounds}
          onReady={(mapProps, map) => this._mapLoaded(mapProps, map)}
          onClick={this.handleMapClick}
        >
          {this.state.marker?.map((e) => (
            <Marker
              {...e}
              icon={{
                url: e.icon,
                anchor: new this.props.google.maps.Point(12, 12),
                scaledSize: new this.props.google.maps.Size(24, 24),
              }}
              onClick={this.handleMarkerClick}
            />
          ))}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showInfoWIndow}
          >
            <Router>
              <div>
                <Link
                  to={`/remote-monitoring/building-view?plantId=${this.state.plantId}`}
                >
                  {this.state.selectedPlace?.title}
                </Link>
                {/* <Tooltip  title="coplied">
                <Button
                  style={{ marginLeft: 10 }}
                  type="text"
                  icon={<CopyOutlined />}
                  onClick={this.copy(this.state.selectedPlace?.title)}
                /></Tooltip> */}
  <Tooltip title="Copy" >
  <Button
    style={{ marginLeft: 10 }}
    type="text"
    icon={<CopyOutlined />}
    onClick={this.copy(this.state.selectedPlace?.title)}
    // onClick={this.handleClick}
  />
  </Tooltip>   
{/* </Tooltip> */}
              </div>
            </Router>
          </InfoWindow>
        </Map>
      </>
    );
  }
}
export default memo(
  GoogleApiWrapper({
    apiKey: mapKey,
  })(Maps)
);
