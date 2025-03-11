/* 
  References:
  - Schedule: https://gtfs.org/documentation/schedule/reference/

  Notes:
  - each function has data organized to match the order of the content of the file being read
  - relations: routes -> trips -> stop_times -> stops
*/

import { promises as fs } from 'fs';

async function readRoutesTxtFile() {
  const file = await fs.readFile(process.cwd() + '/public/translink-static-data/routes.txt', 'utf8');

  const lines = file.split('\n');

  // const headers = lines[0].replace('\r', '').split(',');
  // console.log(headers);

  if (lines[lines.length - 1] === '') {
    lines.pop();
  }

  const routes: {
    [key: string]: {
      agency_id: string,
      route_color: string,
      route_desc: string,
      route_id: string,
      route_long_name: string,
      route_short_name: string,
      route_text_color: string,
      route_type: string,
      route_url: string,
    }
  } = {};

  let i = 1;

  while (i < lines.length) {
    const line = lines[i].replace('\r', '');
    const data = line.split(',');
    const route: {
      route_id: string,
      agency_id: string,
      route_short_name: string,
      route_long_name: string,
      route_desc: string,
      route_type: string,
      route_url: string,
      route_color: string,
      route_text_color: string,
    } = {
      route_id: '',
      agency_id: '',
      route_short_name: '',
      route_long_name: '',
      route_desc: '',
      route_type: '',
      route_url: '',
      route_color: '',
      route_text_color: '',
    };

    route.route_id = data[0];
    route.agency_id = data[1];
    route.route_short_name = data[2];
    route.route_long_name = data[3];
    route.route_desc = data[4];
    route.route_type = data[5];
    route.route_url = data[6];
    route.route_color = data[7];
    route.route_text_color = data[8];

    routes[data[0]] = route;

    i++;
  }

  return {
    routes,
  };
}

async function readTripsTxtFile() {
  const file = await fs.readFile(process.cwd() + '/public/translink-static-data/trips.txt', 'utf8');

  const lines = file.split('\n');

  // const headers = lines[0].replace('\r', '').split(',');
  // console.log(headers);

  if (lines[lines.length - 1] === '') {
    lines.pop();
  }

  const trips: {
    [key: string]: { // route_id
      [key: string]: { // trip_id
        route_id: string,
        service_id: string,
        trip_id: string,
        trip_headsign: string,
        trip_short_name: string,
        direction_id: string,
        block_id: string,
        shape_id: string,
        wheelchair_accessible: string,
        bikes_allowed: string,
      }
    }
  } = {};

  let i = 1;

  while (i < lines.length) {
    const line = lines[i].replace('\r', '');
    const data = line.split(',');
    const trip: {
      route_id: string,
      service_id: string,
      trip_id: string,
      trip_headsign: string,
      trip_short_name: string,
      direction_id: string,
      block_id: string,
      shape_id: string,
      wheelchair_accessible: string,
      bikes_allowed: string,
    } = {
      route_id: '',
      service_id: '',
      trip_id: '',
      trip_headsign: '',
      trip_short_name: '',
      direction_id: '',
      block_id: '',
      shape_id: '',
      wheelchair_accessible: '',
      bikes_allowed: '',
    };

    trip.route_id = data[0];
    trip.service_id = data[1];
    trip.trip_id = data[2];
    trip.trip_headsign = data[3];
    trip.trip_short_name = data[4];
    trip.direction_id = data[5];
    trip.block_id = data[6];
    trip.shape_id = data[7];
    trip.wheelchair_accessible = data[8];
    trip.bikes_allowed = data[9];

    if (trips[trip.route_id]) {
      trips[trip.route_id][trip.trip_id] = trip;
    } else {
      trips[trip.route_id] = {};
      trips[trip.route_id][trip.trip_id] = trip;
    }

    i++;
  }

  return {
    trips,
  };
}

async function readStopTimesTxtFile() {
  const file = await fs.readFile(process.cwd() + '/public/translink-static-data/stop_times.txt', 'utf8');

  const lines = file.split('\n');

  // const headers = lines[0].replace('\r', '').split(',');
  // console.log(headers);

  if (lines[lines.length - 1] === '') {
    lines.pop();
  }

  const stopTimes: {
    [key: string]: { // trip_id
      [key: string]: { // stop_id
        trip_id: string,
        arrival_time: string,
        departure_time: string,
        stop_id: string,
        stop_sequence: string,
        stop_headsign: string,
        pickup_type: string,
        drop_off_type: string,
        shape_dist_traveled: string,
        timepoint: string,
      }
    }
  } = {};

  let i = 1;

  while (i < lines.length) {
    const line = lines[i].replace('\r', '');
    const data = line.split(',');
    const stopTime: {
      trip_id: string,
      arrival_time: string,
      departure_time: string,
      stop_id: string,
      stop_sequence: string,
      stop_headsign: string,
      pickup_type: string,
      drop_off_type: string,
      shape_dist_traveled: string,
      timepoint: string,
    } = {
      trip_id: '',
      arrival_time: '',
      departure_time: '',
      stop_id: '',
      stop_sequence: '',
      stop_headsign: '',
      pickup_type: '',
      drop_off_type: '',
      shape_dist_traveled: '',
      timepoint: '',
    };

    stopTime.trip_id = data[0];
    stopTime.arrival_time = data[1];
    stopTime.departure_time = data[2];
    stopTime.stop_id = data[3];
    stopTime.stop_sequence = data[4];
    stopTime.stop_headsign = data[5];
    stopTime.pickup_type = data[6];
    stopTime.drop_off_type = data[7];
    stopTime.shape_dist_traveled = data[8];
    stopTime.timepoint = data[9];

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

async function readStopsTxtFile() {
  const file = await fs.readFile(process.cwd() + '/public/translink-static-data/stops.txt', 'utf8');

  const lines = file.split('\n');

  // const headers = lines[0].replace('\r', '').split(',');
  // console.log(headers);

  if (lines[lines.length - 1] === '') {
    lines.pop();
  }

  const stops: {
    [key: string]: {
      stop_id: string,
      stop_code: string,
      stop_name: string,
      stop_desc: string,
      stop_lat: string,
      stop_lon: string,
      zone_id: string,
      stop_url: string,
      location_type: string,
      parent_station: string,
      wheelchair_boarding: string,
    }
  } = {};

  let i = 1;

  while (i < lines.length) {
    const line = lines[i].replace('\r', '');
    const data = line.split(',');
    const stop: {
      stop_id: string,
      stop_code: string,
      stop_name: string,
      stop_desc: string,
      stop_lat: string,
      stop_lon: string,
      zone_id: string,
      stop_url: string,
      location_type: string,
      parent_station: string,
      wheelchair_boarding: string,
    } = {
      stop_id: '',
      stop_code: '',
      stop_name: '',
      stop_desc: '',
      stop_lat: '',
      stop_lon: '',
      zone_id: '',
      stop_url: '',
      location_type: '',
      parent_station: '',
      wheelchair_boarding: '',
    };

    stop.stop_id = data[0];
    stop.stop_code = data[1];
    stop.stop_name = data[2];
    stop.stop_desc = data[3];
    stop.stop_lat = data[4];
    stop.stop_lon = data[5];
    stop.zone_id = data[6];
    stop.stop_url = data[7];
    stop.location_type = data[8];
    stop.parent_station = data[9];
    stop.wheelchair_boarding = data[10];

    stops[data[0]] = stop;

    i++;
  }

  return {
    stops,
  };
}

export {
  readRoutesTxtFile,
  readTripsTxtFile,
  readStopsTxtFile,
  readStopTimesTxtFile,
}
