
type Route = {
  route_id: string,
  agency_id: string,
  route_short_name: string,
  route_long_name: string,
  route_desc: string,
  route_type: string,
  route_url: string,
  route_color: string,
  route_text_color: string,
}

type Routes = {
  [key: string]: Route,
};

type Trip = {
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
  trip_shapes: TripShapes,
};

type Trips = {
  [key: string]: Trip,
}

type RouteTrips = {
  [key: string]: Trips,
};

type StopTime = {
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
};

type StopTimes = {
  [key: string]: {
    [key: string]: StopTime,
  }
};

type Stop = {
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
};

type Stops = {
  [key: string]: Stop,
};

type Shape = {
  shape_id: string,
  shape_pt_lat: number,
  shape_pt_lon: number,
  shape_pt_sequence: string,
  shape_dist_traveled: string,
};

type Shapes = {
  [key: string]: Shape,
};

type TripShapes = {
  [key: string]: {
    [key: string]: Shape,
  }
};

export type {
  Route,
  Routes,
  Trip,
  Trips,
  RouteTrips,
  StopTime,
  StopTimes,
  Stop,
  Stops,
  Shape,
  Shapes,
  TripShapes,
};
