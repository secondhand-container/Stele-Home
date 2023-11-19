/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { CardTitle, CardHeader, CardContent, Card } from "~/components/ui/card";
import { MapContainer, TileLayer, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { FormEvent, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { api } from "~/utils/api";

export default function Init() {
  const [newLocation, setNewLocation] = useState<{
    latitude?: number;
    longitude?: number;
  }>({
    latitude: undefined,
    longitude: undefined,
  });

  const Map = useMemo(
    () =>
      dynamic(() => import("./ui/Map/Map"), {
        ssr: false,
      }),
    [],
  );
  const { mutate } = api.config.create.useMutation();

  function handleSaveChanges(event: FormEvent<HTMLFormElement>) {
    mutate({
      name: event.currentTarget.userName.value,
      location: {
        latitude: newLocation.latitude ?? 51.170539,
        longitude: newLocation.longitude ?? 7.0769935,
      },
      caldavUrl: event.currentTarget.caldavUrl.value,
    });
  }

  return (
    <div className="bg-background-color-dark flex h-screen w-screen flex-col items-center justify-center gap-5">
      <div className="text-4xl">Willkommen in deinem Stele@Home</div>

      <div className="text-2xl">Beginnen wir zuerst mit der Einrichtung:</div>
      <form
        onSubmit={(event) => {
          handleSaveChanges(event);
        }}
      >
        <div>
          <div>
            <div>Gib bitte deinen Namen ein:</div>
            <div>
              <input
                id="userName"
                placeholder="Name"
                className="border-grey rounded-md border p-2"
              ></input>
            </div>
          </div>
          <div>
            <div>Wähle deinen Standort</div>
            <div className="w-[100%]">
              <Map
                location={{ latitude: 51.170539, longitude: 7.0769935 }}
                setNewLocation={setNewLocation}
              ></Map>
            </div>
          </div>
          <div>
            <div>Gib deine CaldavUrl an:</div>
            <div>
              <input
                id="caldavUrl"
                placeholder="caldavUrl"
                className="border-grey rounded-md border p-2"
              ></input>
            </div>
          </div>
          <button
            type="submit"
            className="bg-primary-color text-on-primary-color border-grey mt-3 self-end rounded-sm border p-3"
          >
            Speichern
          </button>
        </div>
      </form>
    </div>
  );
}
