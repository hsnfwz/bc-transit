/* 
  References:
  - Realtime: https://gtfs.org/documentation/realtime/reference/
  - TransLink: https://www.translink.ca/about-us/doing-business-with-translink/app-developer-resources/gtfs
  
*/

import GtfsRealtimeBindings from "gtfs-realtime-bindings";

// ex: "Bus X is delayed by 5 minutes"
async function getTripUpdates() {
  try {
    const response = await fetch(`/gtfsrealtime`);

    if (!response.ok) {
      throw new Error(`${response.url}: ${response.status} ${response.statusText}`);
    }

    const buffer = await response.arrayBuffer();
    const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(new Uint8Array(buffer));

    const tripUpdates = feed.entity.map(entity => entity.tripUpdate);

    return {
      tripUpdates,
    };
  } catch(error) {
    console.log(error);
    return {
      tripUpdates: [],
    };
  }
}

// ex: "This bus is at position X at time Y"
async function getVehicles() {
  try {
    const response = await fetch(`/gtfsposition`);

    if (!response.ok) {
      throw new Error(`${response.url}: ${response.status} ${response.statusText}`);
    }

    const buffer = await response.arrayBuffer();
    const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(new Uint8Array(buffer));

    const vehicles = feed.entity.map(entity => entity.vehicle);

    return {
      vehicles,
    };
  } catch(error) {
    console.log(error);
    return {
      vehicles: [],
    };
  }
}

// ex: "Station Y is closed due to construction"
async function getServiceAlerts() {
  try {
    const response = await fetch(`/gtfsalerts`);

    if (!response.ok) {
      throw new Error(`${response.url}: ${response.status} ${response.statusText}`);
    }

    const buffer = await response.arrayBuffer();
    const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(new Uint8Array(buffer));

    const alerts = feed.entity.map(entity => entity.alert);

    return {
      alerts,
    };
  } catch(error) {
    console.log(error);
    return {
      alerts: [],
    };
  }
}

export {
  getTripUpdates,
  getVehicles,
  getServiceAlerts,
}