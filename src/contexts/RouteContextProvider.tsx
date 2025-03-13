'use client';

import { Route, Trip } from '@/types/transit';
import { createContext, useState, Dispatch, SetStateAction } from 'react';

const RouteContext = createContext<{
  hoveredRoute: {
    route: Route,
    trip: Trip,
    polylinePositions: [number, number][],
  } | null,
  selectedRoute: {
    route: Route,
    trip: Trip,
    polylinePositions: [number, number][],
  } | null,
  setHoveredRoute: Dispatch<SetStateAction<{
    route: Route,
    trip: Trip,
    polylinePositions: [number, number][],
  } | null>>,
  setSelectedRoute: Dispatch<SetStateAction<{
    route: Route,
    trip: Trip,
    polylinePositions: [number, number][],
  } | null>>
} | null>(null);

function RouteContextProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [hoveredRoute, setHoveredRoute] = useState<{
    route: Route,
    trip: Trip,
    polylinePositions: [number, number][],
  } | null>(null);
  
  const [selectedRoute, setSelectedRoute] = useState<{
    route: Route,
    trip: Trip,
    polylinePositions: [number, number][],
  } | null>(null);

  return (
    <RouteContext.Provider value={{ hoveredRoute, setHoveredRoute, selectedRoute, setSelectedRoute }}>
      {children}
    </RouteContext.Provider>
  );
}

export {
  RouteContext,
  RouteContextProvider,
};
