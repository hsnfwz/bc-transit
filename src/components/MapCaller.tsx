'use client';

import dynamic from 'next/dynamic';
import GtfsRealtimeBindings from "gtfs-realtime-bindings";

const LazyMap = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

function MapCaller({ vehicles }: { vehicles: (GtfsRealtimeBindings.transit_realtime.IVehiclePosition | null | undefined)[] }) {
  return <LazyMap vehicles={vehicles} />;
}

export default MapCaller;