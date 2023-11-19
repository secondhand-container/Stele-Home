/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Image from "next/image";
import { CardTitle, CardHeader, CardContent, Card } from "~/components/ui/card";
import { api } from "~/utils/api";
import Routeservice from "~/components/Routeservice";

export default function Dashboard() {
  const config = api.config.getLatest.useQuery();

  const { data: events, isLoading } = api.event.getEvents.useQuery();

  if (!isLoading) {
    console.log(events);
  }

  if (!config.data) {
    return <div>Keine Daten</div>;
  } else {
    return (
      <div
        className="flex h-screen w-full flex-col border-none bg-white font-bold"
        style={{ fontFamily: "Museo" }}
      >
        <div
          id="header"
          className="my-4 flex w-full flex-none items-center justify-between text-3xl text-primary-color"
        >
          <div className="flex flex-col">
            <div>
              Stele<span className="text-4xl text-secondary-color">@</span>
            </div>
            <div>Home</div>
          </div>
          <span>Hallo {config.data.name}!</span>
          <div>
            <span className="text-6xl text-primary-color">
              {new Date().getHours()}
            </span>
            <span className="align-top text-secondary-color">
              {new Date().getMinutes()}
            </span>
          </div>
        </div>
        <div className="h-max flex-1">
          <div className="grid grid-cols-8 grid-rows-2 gap-8">
            <div className="col-span-4 rounded-xl bg-background-color-dark p-4 text-primary-color">
              <div className="grid grid-cols-3">
                <span className="col-span-1 text-2xl">Kalender</span>

                <span
                  className="col-span-2 flex flex-col gap-4 rounded-lg bg-white p-3 text-2xl font-normal"
                  style={{ fontFamily: "MuseoSans" }}
                >
                  <span className="border-4 border-white border-l-secondary-color pl-4">
                    Heute
                  </span>
                  <div className="flex flex-col gap-4">
                    {!isLoading &&
                      events?.map((event, index) => {
                        return (
                          <div
                            key={index}
                            className="flex flex-col rounded-lg bg-secondary-color p-3 text-sm text-primary-color"
                          >
                            <span className="text-sm">
                              {event.startDate.toLocaleTimeString()} Uhr -{" "}
                              {event.endDate.toLocaleTimeString()} Uhr
                            </span>
                            <span className="text-md font-bold">
                              {event.summary}
                            </span>
                          </div>
                        );
                      })}
                  </div>
                </span>
              </div>
            </div>
            <div className="col-span-2 h-full rounded-xl bg-primary-color p-4 text-secondary-color">
              <span className="text-2xl">Wetter</span>
            </div>
            <div className="col-span-2 h-full rounded-xl bg-secondary-color p-4 text-primary-color">
              <span className="text-2xl">Einkaufsliste</span>
            </div>

            <div className="col-span-3 h-full rounded-xl bg-background-color-dark p-4 text-primary-color">
              <span className="text-2xl">Empfehlungen</span>
            </div>

            <div className="col-span-5 h-full rounded-xl bg-background-color-dark p-4 text-primary-color ">
              <span className="text-2xl">Anfahrt</span>
              <Routeservice/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
