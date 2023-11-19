import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import Openrouteservice from 'openrouteservice-js'
import { api } from "~/utils/api";
import { db } from "~/server/db";

export const directionRouter = createTRPCRouter({
  getDirection: publicProcedure
    .query(async ({input}) => {
      // const { data: config, isLoading } = api.config.getLatest.useQuery();
      const config = await db.config.findFirst();
      console.log('config: ', config)
      let orsDirections = new Openrouteservice.Directions({ api_key: "5b3ce3597851110001cf62488283d20e36e147188e7432b5f9ae1ddd" });

      try {
        let response = await orsDirections.calculate({
          // coordinates: [[config.data.location.longitude, config.data.location.latitude], [7.005390961830258, 51.17178210141855]],
          coordinates: [[7.085309428650071, 51.17229730539424], [7.005390961830258, 51.17178210141855]],
          profile: 'driving-hgv',
          restrictions: {
            height: 10,
            weight: 5
          },
          extra_info: ['waytype', 'steepness'],
          avoidables: ['highways', 'tollways', 'ferries', 'fords'],
          format: 'json'
        })
        // Add your own result handling here
        console.log("response: ", response)
        return response

      } catch (err) {
        console.log("An error occurred: " + err)
        console.error(await err.response?.json())
      }
    })
});
