/* 
  References:
  - Schedule: https://gtfs.org/documentation/schedule/reference/
  - TransLink: https://www.translink.ca/about-us/doing-business-with-translink/app-developer-resources/gtfs

  Notes:
  - each file needs to be update every week (translink posts new files every week)
  - each function has data organized to match the order of the content of the file being read

*/

import { Routes, Route, RouteTrips, Trip, StopTimes, StopTime, Stop, Stops, Shape, Shapes, TripShapes } from '@/types/transit';

async function getRoutes() {
  const response = await fetch('/schedule/routes.txt');
  const text = await response.text();

  const lines = text.split('\n');

  if (lines[lines.length - 1] === '') {
    lines.pop();
  }

  const routes: Routes = {};

  let i = 1;

  while (i < lines.length) {
    const line = lines[i].replace('\r', '');
    const data = line.split(',');
    const route: Route = {
      route_id:  data[0],
      agency_id:  data[1],
      route_short_name: data[2],
      route_long_name: data[3],
      route_desc: data[4],
      route_type: data[5],
      route_url: data[6],
      route_color: data[7],
      route_text_color: data[8],
    };

    routes[data[0]] = route;

    i++;
  }

  return {
    routes,
  };
}

async function getRouteTrips() {
  const response = await fetch('/schedule/trips.txt');
  const text = await response.text();
  
  const lines = text.split('\n');

  if (lines[lines.length - 1] === '') {
    lines.pop();
  }

  const routeTrips: RouteTrips = {};

  let i = 1;

  while (i < lines.length) {
    const line = lines[i].replace('\r', '');
    const data = line.split(',');
    const trip: Trip = {
      route_id: data[0],
      service_id: data[1],
      trip_id: data[2],
      trip_headsign: data[3],
      trip_short_name: data[4],
      direction_id: data[5],
      block_id: data[6],
      shape_id: data[7],
      wheelchair_accessible: data[8],
      bikes_allowed: data[9],
      trip_shapes: {},
    };

    if (routeTrips[trip.route_id]) {
      routeTrips[trip.route_id][trip.trip_id] = trip;
    } else {
      routeTrips[trip.route_id] = {};
      routeTrips[trip.route_id][trip.trip_id] = trip;
    }

    i++;
  }

  return {
    routeTrips,
  };
}

async function getStopTimes() {
  const response = await fetch('/schedule/stop_times.txt');
  const text = await response.text();
  
  const lines = text.split('\n');

  if (lines[lines.length - 1] === '') {
    lines.pop();
  }

  const stopTimes: StopTimes = {};

  let i = 1;

  while (i < lines.length) {
    const line = lines[i].replace('\r', '');
    const data = line.split(',');
    const stopTime: StopTime = {
      trip_id: data[0],
      arrival_time: data[1],
      departure_time: data[2],
      stop_id: data[3],
      stop_sequence: data[4],
      stop_headsign: data[5],
      pickup_type: data[6],
      drop_off_type: data[7],
      shape_dist_traveled: data[8],
      timepoint: data[9],
    };

    if (stopTimes[stopTime.trip_id]) {
      stopTimes[stopTime.trip_id][stopTime.stop_id] = stopTime;
    } else {
      stopTimes[stopTime.trip_id] = {};
      stopTimes[stopTime.trip_id][stopTime.stop_id] = stopTime;
    }

    i++;
  }

  return {
    stopTimes,
  };
}

async function getStops() {
  const response = await fetch('/schedule/stops.txt');
  const text = await response.text();
  
  const lines = text.split('\n');

  if (lines[lines.length - 1] === '') {
    lines.pop();
  }

  const stops: Stops = {};

  let i = 1;

  while (i < lines.length) {
    const line = lines[i].replace('\r', '');
    const data = line.split(',');
    const stop: Stop = {
      stop_id: data[0],
      stop_code: data[1],
      stop_name: data[2],
      stop_desc: data[3],
      stop_lat: data[4],
      stop_lon: data[5],
      zone_id: data[6],
      stop_url: data[7],
      location_type: data[8],
      parent_station: data[9],
      wheelchair_boarding: data[10],
    };

    stops[data[0]] = stop;

    i++;
  }

  return {
    stops,
  };
}

async function getTripShapes() {
  const response = await fetch('/schedule/shapes.txt');
  const text = await response.text();
  
  const lines = text.split('\n');

  if (lines[lines.length - 1] === '') {
    lines.pop();
  }

  const tripShapes: TripShapes = {};

  let i = 1;

  while (i < lines.length) {
    const line = lines[i].replace('\r', '');
    const data = line.split(',');
    const shape: Shape = {
      shape_id: data[0],
      shape_pt_lat: Number(data[1]),
      shape_pt_lon: Number(data[2]),
      shape_pt_sequence: data[3],
      shape_dist_traveled: data[4],
    };

    if (tripShapes[shape.shape_id]) {
      tripShapes[shape.shape_id][shape.shape_pt_sequence] = shape;
    } else {
      tripShapes[shape.shape_id] = {};
      tripShapes[shape.shape_id][shape.shape_pt_sequence] = shape;
    }

    i++;
  }

  return {
    tripShapes,
  };
}

export {
  getRoutes,
  getRouteTrips,
  getStops,
  getStopTimes,
  getTripShapes,
}
