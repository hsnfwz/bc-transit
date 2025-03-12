'use client';

import { useContext, useEffect } from "react";
import { Routes, RouteTrips, TripShapes } from "@/types/transit";
import { RouteContext } from "@/contexts/RouteContextProvider";
import { Route, Trip } from "@/types/transit";

function MapSidebar({ routes, routeTrips, tripShapes }: { routes: Routes, routeTrips: RouteTrips, tripShapes: TripShapes }) {
  const { hoveredRoute, setHoveredRoute, selectedRoute, setSelectedRoute } = useContext(RouteContext);

  useEffect(() => {
    console.log('HOVER:', hoveredRoute);
  }, [hoveredRoute]);

  useEffect(() => {
    console.log('SELECT:', selectedRoute);
  }, [selectedRoute]);

  function createMapRoute(route: Route) {
    const trip: Trip = Object.values(routeTrips[route.route_id])[0];
    const polylinePositions: [number, number][] = Object.values(tripShapes[trip.shape_id]).map(shape => [shape.shape_pt_lat, shape.shape_pt_lon]);

    const _route: {
      route: Route,
      trip: Trip,
      polylinePositions: [number, number][],
    } = {
      route,
      trip,
      polylinePositions,
    }
  
    // for (const trip in route.trips) {
    //   route.trips[trip].shape = shapes[route.trips[trip].shape_id];
    // }

    return _route;
  }

  return (
    <div className="flex flex-col divide-y-2 divide-neutral-200 border-2 border-neutral-200 w-full h-[200px] md:max-w-[300px] md:h-[calc(100vh-32px)] overflow-y-scroll">
      {Object.values(routes).map((route, index) => (
        <button
          key={index}
          type="button"
          className={`cursor-pointer p-2 flex flex-col hover:bg-neutral-200 text-start ${selectedRoute && selectedRoute.route.route_id === route.route_id ? 'bg-black text-white pointer-events-none' : 'bg-white'}`}
          onMouseEnter={() => {
            const _route = createMapRoute(route);
            setHoveredRoute(_route);
          }}
          onMouseLeave={() => setHoveredRoute(null)}
          onClick={() => {
            const _route = createMapRoute(route);
            setSelectedRoute(_route);
          }}
        >
          <h1>{route.route_short_name && <span className="font-bold">{route.route_short_name} </span>}{route.route_long_name}</h1>
        </button>
      ))}
    </div>
  );
}

export default MapSidebar;
