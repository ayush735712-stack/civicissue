import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { StatusBadge } from '../common/StatusBadge';
import { Button } from '../common/Button';
import { MapPin, Calendar, ExternalLink } from 'lucide-react';
import { formatDate } from '../../utils/formatters';
import './MapView.css';

// Custom DivIcon generator with distinct status colors
const createCustomIcon = (status, isSelected) => {
  let color = '#ef4444'; // Red default
  if (status === 'Assigned') color = '#0284c7';
  if (status === 'In Progress') color = '#d97706';
  if (status === 'Resolved') color = '#10b981';

  const size = isSelected ? 38 : 30;

  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        background-color: ${color};
        border: 3px solid #ffffff;
        border-radius: 50%;
        box-shadow: 0 4px 10px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        transition: transform 0.2s ease;
        transform: ${isSelected ? 'scale(1.2)' : 'scale(1)'};
      ">
        <svg width="${size * 0.5}" height="${size * 0.5}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </svg>
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2]
  });
};

// Component to dynamically adjust map center when a complaint is selected
const MapRecenter = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    if (center && center[0] && center[1]) {
      map.flyTo(center, zoom || 14, { duration: 1.2 });
    }
  }, [center, zoom, map]);
  return null;
};

export const MapView = ({
  complaints = [],
  selectedComplaint = null,
  onSelectComplaint,
  onViewDetails
}) => {
  const defaultCenter = selectedComplaint
    ? [selectedComplaint.latitude, selectedComplaint.longitude]
    : complaints.length > 0
    ? [complaints[0].latitude, complaints[0].longitude]
    : [37.7749, -122.4194];

  return (
    <div className="map-view-wrapper">
      <MapContainer
        center={defaultCenter}
        zoom={13}
        scrollWheelZoom={true}
        className="civic-map-container"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapRecenter center={defaultCenter} zoom={selectedComplaint ? 15 : 13} />

        {complaints.map((item) => {
          const isSelected = selectedComplaint?.id === item.id;
          return (
            <Marker
              key={item.id}
              position={[item.latitude, item.longitude]}
              icon={createCustomIcon(item.status, isSelected)}
              eventHandlers={{
                click: () => onSelectComplaint && onSelectComplaint(item)
              }}
            >
              <Popup className="custom-map-popup">
                <div className="popup-card">
                  <div className="popup-image-container">
                    <img src={item.image} alt={item.title} />
                    <span className="popup-category">{item.category}</span>
                  </div>
                  <div className="popup-content">
                    <div className="popup-top">
                      <span className="popup-id">{item.id}</span>
                      <StatusBadge status={item.status} />
                    </div>
                    <h4 className="popup-title">{item.title}</h4>
                    <p className="popup-location">
                      <MapPin size={12} /> {item.location}
                    </p>
                    <div className="popup-actions">
                      {onViewDetails && (
                        <Button
                          variant="primary"
                          size="sm"
                          fullWidth
                          icon={ExternalLink}
                          onClick={() => onViewDetails(item)}
                        >
                          View Details
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};
