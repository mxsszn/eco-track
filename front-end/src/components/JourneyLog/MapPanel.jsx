import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Leaflet with React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Helper component to auto-zoom the map to fit the route
function MapUpdater({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords && coords.length > 0) {
      const bounds = L.latLngBounds(coords);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [coords, map]);
  return null;
}

const MapPanel = ({ routeCoords }) => {
  // Default position (London) if no route
  const defaultCenter = [51.505, -0.09];

  return (
    <div className="map-container" style={{ height: '400px', width: '100%', borderRadius: '12px', overflow: 'hidden' }}>
      <MapContainer 
        center={defaultCenter} 
        zoom={13} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Draw the Route Line if coordinates exist */}
        {routeCoords && routeCoords.length > 0 && (
          <>
            <Polyline positions={routeCoords} color="blue" weight={5} opacity={0.7} />
            
            {/* Start Marker */}
            <Marker position={routeCoords[0]}>
              <Popup>Start</Popup>
            </Marker>

            {/* End Marker */}
            <Marker position={routeCoords[routeCoords.length - 1]}>
              <Popup>Destination</Popup>
            </Marker>

            {/* Auto-zoom helper */}
            <MapUpdater coords={routeCoords} />
          </>
        )}
      </MapContainer>
    </div>
  );
};

export default MapPanel;