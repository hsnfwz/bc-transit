'use client';

import dynamic from 'next/dynamic';
import MapLoader from './MapLoader';

const LazyMap = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => <MapLoader />,
});

function MapCaller() {
  return <LazyMap />;
}

export default MapCaller;