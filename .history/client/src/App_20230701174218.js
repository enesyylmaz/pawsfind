import { useEffect, useState, useRef } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";
import Marker from "./marker";
const URL = "http://localhost:4000";

const containerStyle = {
  position: "absolute",
  bottom: "2%",
  left: "50%",
  transform: "translateX(-50%)",
  width: "80vw",
  height: "70vh",
};

const center = {
  lat: 37.7749, // Latitude of the desired center of the map
  lng: -122.4194, // Longitude of the desired center of the map
};

const App = () => {
  const mapRef = useRef(null);
  const [mapReady, setMapReady] = useState(false);
  const coordinates = [{ lat: 45.4046987, lng: 12.2472504, name: "Marker 1" }];

  const onGoogleApiLoaded = ({ map }) => {
    mapRef.current = map;
    setMapReady(true);

    const bounds = new window.google.maps.LatLngBounds();
    coordinates.forEach(({ lat, lng }) => {
      bounds.extend(new window.google.maps.LatLng(lat, lng));
    });
    map.fitBounds(bounds);
  };

  const onMarkerClick = (e, { markerId, lat, lng }) => {
    console.log("This is ->", markerId);
    mapRef.current.setCenter({ lat, lng });
  };

  return (
    <>
      {mapReady}
      <LoadScript
        googleMapsApiKey="AIzaSyCpSbd_GTUT5hRGzW-BBK6mXYX_quZ6ZOQ"
        libraries={["places"]}
        onLoad={() => console.log("Script loaded")}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={5}
          onGoogleApiLoaded={onGoogleApiLoaded}
          onChange={(map) => console.log("Map moved", map)}
        ></GoogleMap>
      </LoadScript>
    </>
  );
};

export default App;