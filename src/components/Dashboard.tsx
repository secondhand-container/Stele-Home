import Image from "next/image";
import { CardTitle, CardHeader, CardContent, Card } from "~/components/ui/card";
import { api } from "~/utils/api";

export default function Dashboard() {
  const { data: events, isLoading } = api.event.getEvents.useQuery();

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Family Events</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading && <div>Loading...</div>}
          {events?.length == 0 && "Du hast heute frei :)"}
          {events?.map((event) => {
            return (
              <div
                key={event.id}
                className="flex items-center justify-between py-2"
              >
                <span className="font-medium">{event.summary}</span>
                <span className="text-zinc-500 dark:text-zinc-400">
                  {event.startDate.getHours()}:{event.startDate.getMinutes()} -{" "}
                  {event.endDate.getHours()}:{event.endDate.getMinutes()}
                </span>
              </div>
            );
          })}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Route to Work</CardTitle>
        </CardHeader>
        <CardContent>
          <Image
            alt="Map to work"
            className="rounded-md object-cover"
            height="200"
            src="/placeholder.svg"
            style={{
              aspectRatio: "200/200",
              objectFit: "cover",
            }}
            width="200"
          />
          <div className="pt-4 text-sm text-zinc-500 dark:text-zinc-400">
            ETA: 30 minutes
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            {"Today's Weather"}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <svg
            className=" h-10 w-10 text-yellow-400"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2" />
            <path d="M12 20v2" />
            <path d="m4.93 4.93 1.41 1.41" />
            <path d="m17.66 17.66 1.41 1.41" />
            <path d="M2 12h2" />
            <path d="M20 12h2" />
            <path d="m6.34 17.66-1.41 1.41" />
            <path d="m19.07 4.93-1.41 1.41" />
          </svg>
          <div>
            <div className="text-2xl font-bold">75°F</div>
            <div className="text-sm text-zinc-500 dark:text-zinc-400">
              Sunny
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Shopping List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between py-2">
            <span className="font-medium">Apples</span>
            <span className="text-zinc-500 dark:text-zinc-400">2 lb</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="font-medium">Milk</span>
            <span className="text-zinc-500 dark:text-zinc-400">1 gallon</span>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="font-medium">Bread</span>
            <span className="text-zinc-500 dark:text-zinc-400">1 loaf</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
