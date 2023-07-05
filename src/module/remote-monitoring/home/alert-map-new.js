import React, { useRef, memo } from "react";
// import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import GoogleMapReact, { fitBounds } from "google-map-react";
import { mapKey } from "../../../helpers/url";
import { useEffect } from "react";
const AnyReactComponent = (props) => {
  return (
    <div width="32px" onClick={props.onClick}>
      <img
        src={props.icon}
        style={{
          transform: "translateY(-28px) translateX(-14px)",
          width: "28px",
          height: "28px",
          objectFit: "contain",
        }}
      />
    </div>
  );
};

export default function AlertMapNew(props) {
  const mapRef = useRef(null);
  const defaultProps = {
    center: {
      lat: 25.99835602,
      lng: 52.01502627,
    },
    zoom: 2,
  };

  const onChange = (e) => {
    // console.log(e);
  };
  const bounds = {
    nw: {
      lat: 50.01038826014866,
      lng: -118.6525866875,
    },
    se: {
      lat: 32.698335045970396,
      lng: -92.0217273125,
    },
  };

  const { center, zoom } = fitBounds(bounds, 1);
  return (
    <div style={{ height: "65vh", width: "100%" }}>
      <GoogleMapReact
        ref={mapRef}
        // layerTypes={['TrafficLayer', 'TransitLayer']}
        bootstrapURLKeys={{ key: mapKey }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        options={function (maps) {
          return {
            panControl: true,
            mapTypeControl: false,
            fullscreenControl: false,
          };
        }}
        resetBoundsOnResize={true}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => {
          // map.setZoom(5);
          map.panTo(map.center);
        }}
        onChange={onChange}
      >
        {props.marker?.map((e) => (
          <AnyReactComponent
            lat={e.position.lat}
            lng={e.position.lng}
            title={e.title}
            icon={e.icon}
            onClick={() => e.callbackFn()}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
}
