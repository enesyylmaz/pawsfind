import { useEffect, useState } from "react";
import React, { Component } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import axios from "axios";
const URL = "http://localhost:4000";

const containerStyle = {
  width: "800px",
  height: "600px",
};

const center = {
  lat: 37.7749, // Latitude of the desired center of the map
  lng: -122.4194, // Longitude of the desired center of the map
};

function App() {
  const [message, setMessage] = useState("");

  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    const fetchApiKey = async () => {
      try {
        const response = await axios.get("/api/maps/apiKey"); // Replace with your backend endpoint
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
    <div>
      <h1>Geocoding Results</h1>
      <ul>
        {geocodingData.map((result) => (
          <li key={result.place_id}>{result.formatted_address}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
