import { useEffect, useState } from "react";
import React, { Component } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import axios from "axios";

import { Map, Marker, GoogleApiWrapper } from "@react-google-maps/api";
const URL = "http://localhost:4000";

const containerStyle = {
  width: "800px",
  height: "600px",
};

const center = {
  lat: 37.7749, // Latitude of the desired center of the map
  lng: -122.4194, // Longitude of the desired center of the map
};

function initMap() {
  const myLatLng = { lat: -25.363, lng: 131.044 };
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: myLatLng,
  });

  new google.maps.Marker({
    position: myLatLng,
    map,
    title: "Hello World!",
  });
}
window.initMap = initMap;

function App() {
  const [message, setMessage] = useState("");

  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        const response = await axios.get(`${URL}/api/maps/apiKey`);
        setApiKey(response.data.apiKey);
      } catch (error) {
        console.error("Error fetching API key:", error);
      }
    };

    fetchApiKey();
  }, []);

  // Fetching message from backend on mount
  useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <LoadScript googleMapsApiKey={apiKey} onLoad={initMap}>
      <div>
        <h1>{message}</h1>
        <div id="map" style={containerStyle}></div>
      </div>
    </LoadScript>
  );
}

export default App;
