import {
  getServiceAlerts,
  getTripUpdates,
  getVehiclePositions,
} from '@/helpers/transit';
import { readRoutesTxtFile, readStopsTxtFile, readTripsTxtFile, readStopTimesTxtFile, readShapesTxtFile } from "@/helpers/files";

import MapCaller from "@/components/MapCaller";
import MapSidebar from "@/components/MapSidebar";

async function Home() {
  // console.time('performance');
  // const [
  //   { routes }, { routeTrips }, { tripShapes }, /* vehicles */
  // ] = await Promise.all([
  //   readRoutesTxtFile(),
  //   readTripsTxtFile(),
  //   readShapesTxtFile(),
  //   // getVehiclePositions(),
  // ]);
  // console.timeEnd('performance');

  console.time('performance');

  const vehicles: any = [];
  const { routes } = await readRoutesTxtFile();
  const { routeTrips } = await readTripsTxtFile();
  const { tripShapes } = await readShapesTxtFile();

  console.timeEnd('performance');

  return (
    <div className="relative top-0 left-0 flex flex-col md:flex-row gap-4 p-4 w-full h-full">
      <div className="order-2 md:order-1">
        <MapSidebar
          routes={JSON.parse(JSON.stringify(routes))}
          routeTrips={JSON.parse(JSON.stringify(routeTrips))}
          tripShapes={JSON.parse(JSON.stringify(tripShapes))}
        />
      </div>
      <div className="w-full h-[calc(100vh-248px)] md:h-[calc(100vh-32px)] order-1 md:order-2">
        <MapCaller vehicles={JSON.parse(JSON.stringify(vehicles))} />
      </div>
    </div>
  );
}

export default Home;

// TODO: marker clusters
// TODO: local storage for user activity and preferences
// TODO: display a dashed path from home to nearest stop for a selected route
// TODO: only show live bus data for the selected route

// FIX: speed up build time by reducing size of page
// FIX: some routes do not exist when you click on them - check before trying to display - see Next.js provided errors