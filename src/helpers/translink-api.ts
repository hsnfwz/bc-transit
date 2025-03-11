// GTFS REFERENCE: https://gtfs.org/documentation/realtime/feed-entities/overview/

import GtfsRealtimeBindings from "gtfs-realtime-bindings";

// ex: "Bus X is delayed by 5 minutes"
async function getTripUpdates() {
  try {
    const response = await fetch(`https://gtfsapi.translink.ca/v3/gtfsrealtime?apikey=${process.env.NEXT_PUBLIC_TRANSLINK_API_KEY}`);

    if (!response.ok) {
      throw new Error(`${response.url}: ${response.status} ${response.statusText}`);
    }

    const buffer = await response.arrayBuffer();
    const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(new Uint8Array(buffer));

    const tripUpdates = feed.entity.map(entity => entity.tripUpdate);

    return tripUpdates;
  } catch(error) {
    console.log(error);
  }
}

// ex: "This bus is at position X at time Y"
async function getVehiclePositions() {
  try {
    const response = await fetch(`https://gtfsapi.translink.ca/v3/gtfsposition?apikey=${process.env.NEXT_PUBLIC_TRANSLINK_API_KEY}`);

    if (!response.ok) {
      throw new Error(`${response.url}: ${response.status} ${response.statusText}`);
    }

    const buffer = await response.arrayBuffer();
    const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(new Uint8Array(buffer));

    const vehicles = feed.entity.map(entity => entity.vehicle);

    return vehicles;
  } catch(error) {
    console.log(error);
  }
}

// ex: "Station Y is closed due to construction"
async function getServiceAlerts() {
  try {
    const response = await fetch(`https://gtfsapi.translink.ca/v3/gtfsalerts?apikey=${process.env.NEXT_PUBLIC_TRANSLINK_API_KEY}`);

    if (!response.ok) {
      throw new Error(`${response.url}: ${response.status} ${response.statusText}`);
    }

    const buffer = await response.arrayBuffer();
    const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(new Uint8Array(buffer));

    const alerts = feed.entity.map(entity => entity.alert);

    return alerts;
  } catch(error) {
    console.log(error);
  }
}

export {
  getTripUpdates,
  getVehiclePositions,
  getServiceAlerts,
}