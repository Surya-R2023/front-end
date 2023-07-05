import React, { memo } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import { mapKey } from "../../../helpers/url";
import { CopyOutlined } from "@ant-design/icons";
import { Button, Card, Tooltip, message } from "antd";
import { Link, BrowserRouter as Router } from "react-router-dom";
class Maps extends React.Component {
  state = {
    initialCenter: {
      lat: 10.854885,
      lng: 40.081807,
    },
    center: {},
  };
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
    // {
    //   featureType: "administrative.neighborhood",
    //   elementType: "labels",
    //   stylers: [
    //     {
    //       color: "#e57878",
    //     },
    //   ],
    // },
    {
      featureType: "landscape",
      elementType: "geometry",
      stylers: [
        {
          visibility: "simplified",
        },
        // {
        //   lightness: "10",
        // },
        // {
        //   saturation: "89",
        // },
        // {
        //   hue: "#2196f3",
        // },
        // {
        //   color: "#ff9800",
        // },
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
        // {
        //   color: "#f5f5f5",
        // },
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
      // styles: this.style,
      streetViewControl: false,
      disableDefaultUI: true,
      fullscreenControl: false,
      zoomControl: true,
      maxZoom: 16,
      mapTypeId: "satellite",
      // scrollwheel: true,
    });
  }
  static getDerivedStateFromProps(props, state) {
    return { ...state, ...props };
  }

  render() {
    const bounds = new this.state.google.maps.LatLngBounds();
    for (let x of this.state.marker) {
      if (x.position) {
        bounds.extend(x.position);
      }
    }
    return (
      <>
        <Map
          className={"map"}
          google={this.state.google}
          initialCenter={this.state.initialCenter}
          containerStyle={{
            width: "100%",
            height: "100vh",
            position: "relative",
            border: "2px solid #fff",
            zIndex: 0,
          }}
          bounds={bounds}
          onReady={(mapProps, map) => this._mapLoaded(mapProps, map)}
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
                  to={`../remote-monitoring/building-view?plantId=${this.state.plantId}`}
                >
                  {this.state.selectedPlace?.title}
                </Link>
                <Button
                  style={{ marginLeft: 10 }}
                  type="text"
                  icon={<CopyOutlined />}
                  onClick={this.copy(this.state.selectedPlace?.title)}
                  // onClick={info}
                />
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
