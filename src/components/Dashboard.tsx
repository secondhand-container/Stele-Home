/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Image from "next/image";
import { CardTitle, CardHeader, CardContent, Card } from "~/components/ui/card";
import { api } from "~/utils/api";

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
          className="text-primary-color my-4 flex w-full flex-none items-center justify-between text-3xl"
        >
          <div className="flex flex-col">
            <div>
              Stele<span className="text-secondary-color text-4xl">@</span>
            </div>
            <div>Home</div>
          </div>
          <span>Hallo {config.data.name}!</span>
          <div>
            <span className="text-primary-color text-6xl">
              {new Date().getHours()}
            </span>
            <span className="text-secondary-color align-top">
              {new Date().getMinutes()}
            </span>
          </div>
        </div>
        <div className="h-max flex-1">
          <div className="grid grid-cols-8 grid-rows-2 gap-8">
            <div className="bg-background-color-dark text-primary-color col-span-4 rounded-xl p-4">
              <div className="grid grid-cols-3">
                <span className="col-span-1 text-2xl">Kalender</span>

                <span
                  className="col-span-2 flex flex-col gap-4 rounded-lg bg-white p-3 text-2xl font-normal"
                  style={{ fontFamily: "MuseoSans" }}
                >
                  <span className="border-l-secondary-color border-4 border-white pl-4">
                    Heute
                  </span>
                  <div className="flex flex-col gap-4">
                    {!isLoading &&
                      events?.map((event, index) => {
                        return (
                          <div
                            key={index}
                            className="bg-secondary-color text-primary-color flex flex-col rounded-lg p-3 text-sm"
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
            <div className="bg-primary-color text-secondary-color col-span-2 h-full rounded-xl p-4">
              <span className="text-2xl">Wetter</span>
            </div>
            <div className="bg-secondary-color text-primary-color col-span-2 h-full rounded-xl p-4">
              <span className="text-2xl">Einkaufsliste</span>
            </div>

            <div className="bg-background-color-dark text-primary-color col-span-3 h-full rounded-xl p-4">
              <span className="text-2xl">Empfehlungen</span>
            </div>

            <div className="bg-background-color-dark text-primary-color col-span-5 h-full rounded-xl p-4 ">
              <span className="text-2xl">Anfahrt</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
