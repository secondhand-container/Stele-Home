import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const configRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        location: z.object({ latitude: z.number(), longitude: z.number() }),
        caldavUrl: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.config.create({
        data: {
          name: input.name,
          latitude: input.location.latitude,
          longitude: input.location.longitude,
          caldavUrl: input.caldavUrl,
        },
      });
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.config.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),
});
