import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import './LocationPickerMap.css';

const pickerIcon = L.divIcon({
  className: 'custom-picker-marker',
  html: `
    <div style="
      width: 36px;
      height: 36px;
      background-color: #2563eb;
      border: 3px solid #ffffff;
      border-radius: 50%;
      box-shadow: 0 4px 12px rgba(37,99,235,0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    ">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
    </div>
  `,
  iconSize: [36, 36],
  iconAnchor: [18, 18]
});

// Map click listener hook component
const LocationMarker = ({ position, setPosition, onChangeLocation }) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      const newPos = [Number(lat.toFixed(5)), Number(lng.toFixed(5))];
      setPosition(newPos);
      if (onChangeLocation) {
        onChangeLocation(newPos);
      }
    }
  });

  return position ? <Marker position={position} icon={pickerIcon} /> : null;
};

export const LocationPickerMap = ({ initialPosition = [37.7749, -122.4194], onChangeLocation }) => {
  const [position, setPosition] = useState(initialPosition);

  return (
    <div className="location-picker-wrapper">
      <div className="picker-map-badge">
        <span>Click map to drop issue pin</span>
        <strong>{position[0]}, {position[1]}</strong>
      </div>
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={true}
        className="picker-map-container"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker
          position={position}
          setPosition={setPosition}
          onChangeLocation={onChangeLocation}
        />
      </MapContainer>
    </div>
  );
};
