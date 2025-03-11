import Image from "next/image";

import {
  getServiceAlerts,
  getTripUpdates,
  getVehiclePositions,
} from '@/helpers/translink-api';
import MapCaller from "@/components/MapCaller";


async function Home() {
  const vehicles = await getVehiclePositions();

  console.log(vehicles);

  if (!vehicles) {
    return (
      <h1>No Vehicles</h1>
    );
  }

  return (
    <MapCaller vehicles={JSON.parse(JSON.stringify(vehicles))} />
    // <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
    //   <Image
    //     className="dark:invert"
    //     src="/next.svg"
    //     alt="Next.js logo"
    //     width={180}
    //     height={38}
    //     priority
    //   />
    // </main>
  );
}

export default Home;
