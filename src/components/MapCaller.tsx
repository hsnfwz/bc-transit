'use client';

import dynamic from 'next/dynamic';
import GtfsRealtimeBindings from "gtfs-realtime-bindings";

import { Trip, Route } from '@/types/transit';

import MapLoader from './MapLoader';

const LazyMap = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => <MapLoader />,
});

function MapCaller({ vehicles }: {
  vehicles: (GtfsRealtimeBindings.transit_realtime.IVehiclePosition | null | undefined)[],
}) {
  return <LazyMap vehicles={vehicles} />;
}

export default MapCaller;