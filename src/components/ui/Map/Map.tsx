import React, { useState } from "react";
import { MapContainer, TileLayer, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

export default function Map({
  location,
  setNewLocation,
}: {
  location: { latitude?: number; longitude?: number };
  setNewLocation: ({
    latitude,
    longitude,
  }: {
    latitude: number;
    longitude: number;
  }) => void;
}): React.JSX.Element {
  return (
    <>
      {location && (
        <MapContainer
          center={
            location.latitude && location.longitude
              ? [location.latitude, location.longitude]
              : [51.170539, 7.0769935]
          }
          zoom={13}
          scrollWheelZoom={true}
          className="h-[25vh] w-full"
          attributionControl={false}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <MapContent
            setNewLocation={setNewLocation}
            location={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
          />
        </MapContainer>
      )}
    </>
  );
}

const MapContent = ({
  location,
  setNewLocation,
}: {
  location: { latitude?: number; longitude?: number };
  setNewLocation: ({
    latitude,
    longitude,
  }: {
    latitude: number;
    longitude: number;
  }) => void;
}) => {
  const [marker, setMarker] = useState(null);

  const a = useMap();
  marker?.addTo(a);

  function setMarker2(lat: number, lng: number, map: L.Map) {
    const m = L.marker([lat, lng]);
    marker?.removeFrom(map);
    m.addTo(map);
    setMarker(m);
    setNewLocation({ latitude: lat, longitude: lng });
  }

  const map = useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      setMarker2(lat, lng, map);
    },
  });
  return null;
};
