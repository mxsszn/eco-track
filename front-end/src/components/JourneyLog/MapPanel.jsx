import React, { useEffect } from "react";
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function RecenterMap({ routeCoords }) {
  const map = useMap();

  useEffect(() => {
    if (routeCoords && routeCoords.length > 0) {
      map.fitBounds(routeCoords, { padding: [30, 30] });
    }
  }, [routeCoords, map]);

  return null;
}

export default function MapPanel({ routeCoords }) {
  const defaultCenter = [51.5072, -0.1276];

  return (
    <div className="map-panel">
      <MapContainer
        center={defaultCenter}
        zoom={10}
        scrollWheelZoom={false}
        style={{ height: "300px", width: "100%", borderRadius: "12px" }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <RecenterMap routeCoords={routeCoords} />

        {routeCoords && routeCoords.length > 0 && (
          <>
            <Polyline positions={routeCoords} />
            <Marker position={routeCoords[0]}>
              <Popup>Start</Popup>
            </Marker>
            <Marker position={routeCoords[routeCoords.length - 1]}>
              <Popup>Destination</Popup>
            </Marker>
          </>
        )}
      </MapContainer>
    </div>
  );
}