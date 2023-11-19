import { type NextApiRequest, type NextApiResponse } from "next";
import ical from "node-ical";
import { type Prisma } from "@prisma/client";
import { db } from "~/server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method == "POST") {
    //TODO remove caldav url, fetch from body
    const config = await db.config.findFirst()

    if (config == null) return res.status(400).end()
    const calData = await fetch(config.caldavUrl);
    const data = await calData.text();
    console.log(data);
    const calendar = ical.sync.parseICS(data);
    for (const key of Object.keys(calendar)) {
      if (key === "vcalendar") continue;
      const event: Prisma.EventCreateInput = {
        // @ts-expect-error aslfnalsnd
        id: calendar[key]?.uid as string,
        // @ts-expect-error aslfnalsnd
        summary: calendar[key]?.summary as string,
        // @ts-expect-error aslfnalsnd
        description: calendar[key]?.description as string,
        // @ts-expect-error aslfnalsnd
        startDate: calendar[key]?.start as Date,
        // @ts-expect-error aslfnalsnd
        endDate: calendar[key]?.end as Date,
        // @ts-expect-error aslfnalsnd
        location: calendar[key]?.location as string,
      };

      try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        await db.event.upsert({
          create: event,
          update: event,
          where: {
            id: event.id,
          },
        });
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        res.json(calendar);
      } catch (e) {
        console.log(e);
      }
    }
    res.status(200).end();

    return;
  } else {
    res.status(405).end();
    return;
  }
}
