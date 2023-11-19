import { api } from "~/utils/api";

export default function Routeservice() {
  const { data: direction, isLoading } = api.direction.getDirection.useQuery();
  // const { data: config, isLoadingConfig } = api.config.getLatest.useQuery();
  console.log('direction: ', direction)
  // console.log('config: ', config)

  return (
    <div className="grid grid-cols-2 gap-2 p-2 text-zinc-500">
      {isLoading && <div>Loading...</div>}
      <div className="grid grid-cols-2 gap-2 p-0">
        <img
          alt="Map to work"
          className="rounded-md object-cover"
          height="30"
          src="/POI.svg"
          style={{
            aspectRatio: "2/3",
            objectFit: "cover",
          }}
          width="30"
        />
        <div>
          <div>
            Von <span className="font-semibold">Zuhause</span> zur
          </div>
          <br /> <br />
          <div>
            <h2 className="text-zinc-500 font-semibold">Arbeit</h2>
            <p>Prinzenstraße 2a</p>
            <p>42697 Solingen</p>
          </div>
        </div>
      </div>
      {direction && direction.routes?.map((dir) => {
        return (
          <div>
            <span className="font-semibold">Distanz: </span>{(dir.summary.distance / 1000).toFixed(2) } km
            <br />
            <span className="font-semibold">Zeit: </span>~ {Math.ceil(dir.summary.duration / 60)} min
            <br /> <br />
            <h1 className="font-semibold">Wegbeschreibung:</h1>
            {dir.segments.map((seg) => {
              return (
                seg.steps.map((step) => {
                  return (
                    <h1>{step.instruction}</h1>
                  )
                })
              )
            })}
          </div>
        )
      })}
    </div>
  );
}
