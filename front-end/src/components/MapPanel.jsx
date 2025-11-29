// src/components/MapPanel.jsx
import React, { useMemo, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMap,
} from "react-leaflet";
import L from "leaflet";

// Fix Leaflet marker icons (works well in Vite)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL(
    "leaflet/dist/images/marker-icon-2x.png",
    import.meta.url
  ).toString(),
  iconUrl: new URL(
    "leaflet/dist/images/marker-icon.png",
    import.meta.url
  ).toString(),
  shadowUrl: new URL(
    "leaflet/dist/images/marker-shadow.png",
    import.meta.url
  ).toString(),
});

function FitRouteBounds({ coordinates }) {
  const map = useMap();

  useEffect(() => {
    if (!coordinates || coordinates.length === 0) return;
    const bounds = L.latLngBounds(coordinates);
    map.fitBounds(bounds, { padding: [30, 30] });
  }, [coordinates, map]);

  return null;
}

export default function MapPanel({ routeCoords }) {
  const hasRoute = routeCoords && routeCoords.length > 0;

  const center = useMemo(() => {
    if (!hasRoute) {
      // default roughly over the UK
      return [54.5, -3];
    }
    return routeCoords[0];
  }, [hasRoute, routeCoords]);

  return (
    <div className="card map-card">
      <h2 className="card-title">Map</h2>

      <div className="map-wrapper">
        <MapContainer
          center={center}
          zoom={6}
          scrollWheelZoom={false}
          className="map"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {hasRoute && (
            <>
              <FitRouteBounds coordinates={routeCoords} />
              <Polyline positions={routeCoords} />
              <Marker position={routeCoords[0]} />
              <Marker position={routeCoords[routeCoords.length - 1]} />
            </>
          )}
        </MapContainer>
      </div>
    </div>
  );
}