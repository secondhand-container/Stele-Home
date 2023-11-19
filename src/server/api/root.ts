import { postRouter } from "~/server/api/routers/post";
import { directionRouter } from "~/server/api/routers/direction";
import { createTRPCRouter } from "~/server/api/trpc";
import { configRouter } from "./routers/config";
import { eventRouter } from "./routers/events";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  config: configRouter,
  event: eventRouter,
  direction: directionRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
