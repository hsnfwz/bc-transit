import {
  getServiceAlerts,
  getTripUpdates,
  getVehiclePositions,
} from '@/helpers/transit';

import MapCaller from "@/components/MapCaller";
import MapSidebar from "@/components/MapSidebar";

async function Home() {
  const vehicles: any = [];

  return (
    <div className="relative top-0 left-0 flex flex-col md:flex-row gap-4 p-4 w-full h-full">
      <div className="w-full md:max-w-[300px] order-2 md:order-1">
        <MapSidebar />
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