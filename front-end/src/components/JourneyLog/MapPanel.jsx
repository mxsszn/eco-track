import 'leaflet/dist/leaflet.css';
import React, { useMemo, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL("leaflet/dist/images/marker-icon-2x.png", import.meta.url).toString(),
  iconUrl: new URL("leaflet/dist/images/marker-icon.png", import.meta.url).toString(),
  shadowUrl: new URL("leaflet/dist/images/marker-shadow.png", import.meta.url).toString(),
});

function FitRouteBounds({ coordinates }) {
  const map = useMap();
  useEffect(() => {
    if (!coordinates || coordinates.length === 0) return;
    const bounds = L.latLngBounds(coordinates);
    map.fitBounds(bounds, { padding: [40, 40] });
  }, [coordinates, map]);
  return null;
}

export default function MapPanel({ routeCoords }) {
  const [mapReady, setMapReady] = useState(false);
  const hasRoute = routeCoords && routeCoords.length > 0;

  // Delay map render until after page paint
  useEffect(() => {
    const timer = setTimeout(() => setMapReady(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const center = useMemo(() => {
    if (!hasRoute) return [54.5, -3];
    return routeCoords[Math.floor(routeCoords.length / 2)];
  }, [hasRoute, routeCoords]);

  return (
    <div className="card" style={{padding: '1.5rem'}}>
      <h2 className="card-title">📍 Route Map</h2>
      <div className="map-wrapper">
        {!mapReady ? (
          <div style={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#94a3b8',
            fontSize: '0.95rem',
            background: '#f8fafc',
            borderRadius: '14px'
          }}>
            Loading map...
          </div>
        ) : (
          <MapContainer
            center={center}
            zoom={6}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {hasRoute && (
              <>
                <FitRouteBounds coordinates={routeCoords} />
                <Polyline
                  positions={routeCoords}
                  pathOptions={{ color: '#2563eb', weight: 5, opacity: 0.85 }}
                />
                <Marker position={routeCoords[0]} />
                <Marker position={routeCoords[routeCoords.length - 1]} />
              </>
            )}
          </MapContainer>
        )}
      </div>
    </div>
  );
}