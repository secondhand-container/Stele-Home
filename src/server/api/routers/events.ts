import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";


export const eventRouter = createTRPCRouter({
  getEvents: publicProcedure.query(async ({ ctx }) => {
    const events = await ctx.db.event.findMany({
      orderBy: {
        startDate: "asc",
      },
    });
    return events;
  })
});
