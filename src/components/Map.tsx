'use client';

import 'leaflet/dist/leaflet.css';

import { useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import GtfsRealtimeBindings from "gtfs-realtime-bindings";

// TODO: marker clusters
// TODO: show statis schedule as well (which is the estimated next bus times)


/*
  1. write a script that converts text files to json
  2. write a function that reads json (see cellystats)
  3. use json data to manage what a user sees on the map (ex: stops/routes within 2km of a user's location)
  4. use localstorage to keep track of a user's activity and preferences
  5. the files used in this app need to be update every week (translink posts new files every week)
*/

function Map({ vehicles }: { vehicles: (GtfsRealtimeBindings.transit_realtime.IVehiclePosition | null | undefined)[] }) {
  const [mapTheme, setMapTheme] = useState<string>('light');
  // const [vehicles, setVehicles] = useState<(GtfsRealtimeBindings.transit_realtime.IVehiclePosition | null | undefined)[]>([]);

  const mapRef = useRef<any>(null);

  // useEffect(() => {
  //   async function getData() {

  //     const _vehicles = await getVehiclePositions();

  //     if (_vehicles) {
  //       console.log(_vehicles);
  //       setVehicles(_vehicles);
  //     }


  //     // setInterval(async () => {
  //     //   console.log('refresh');

  //     //   const _vehicles = await getVehiclePositions();

  //     //   if (_vehicles) {
  //     //     console.log(_vehicles);
  //     //     setVehicles(_vehicles);
  //     //   }
  //     // }, 60000); // 1 min
  //   }

  //   getData();
  // }, []);

  const locationIcon = new Icon({
    iconUrl: '/map-pin-fill.svg',
    iconSize: [40 , 40] // pixel size
  });

  const busIcon = new Icon({
    iconUrl: '/bus-fill.svg',
    iconSize: [40 , 40] // pixel size
  });

  return (
    <div className="relative top-0 left-0">
      <div className="absolute bottom-0 right-0 bg-black/75 z-50 p-2">
        <button type="button" className="p-2 bg-neutral-500 text-white cursor-pointer capitalize" onClick={() => {
          if (mapTheme === 'light') {
            setMapTheme('dark');
          } else {
            setMapTheme('light');
          }
        }}>{mapTheme === 'light' ? 'dark' : 'light'}</button>
      </div>
      <MapContainer ref={mapRef} center={[49.22563, -122.97430]} zoom={14} scrollWheelZoom attributionControl={false} className="z-40">
        <TileLayer
          url={`https://tile.jawg.io/jawg-${mapTheme}/{z}/{x}/{y}{r}.png?access-token=${process.env.NEXT_PUBLIC_JAWG_ACCESS_TOKEN}`}
        />
        <Marker position={[49.22563, -122.97430]} icon={locationIcon}>
          <Popup>
            <div className="flex flex-col gap-2 p-2 w-full min-w-[128px] max-w-[256px] shadow">
              <button type="button" className="self-end hover:bg-neutral-200 flex justify-center items-center cursor-pointer" onClick={() => mapRef.current?.closePopup()}>
                <img src="/close-line.svg" alt="Close Popup" width={16} height={16} />
              </button>
              <h1 className="font-bold">Home</h1>
            </div>
          </Popup>
        </Marker>
        {vehicles.map((vehicle, index) => (
          <div key={index}>
            {vehicle && vehicle.position && vehicle.vehicle && (
              <Marker position={[vehicle.position.latitude, vehicle.position?.longitude]} icon={busIcon}>
                <Popup>
                  <div className="flex flex-col gap-2 p-2 w-full min-w-[128px] shadow">
                    <button type="button" className="self-end hover:bg-neutral-200 flex justify-center items-center cursor-pointer" onClick={() => mapRef.current?.closePopup()}>
                      <img src="/close-line.svg" alt="Close Popup" width={16} height={16} />
                    </button>
                    <h1 className="font-bold">Bus: {vehicle.vehicle.label}</h1>
                    <p>ID: {vehicle.vehicle.id}</p>
                    <p>Status: {vehicle.currentStatus}</p>
                    <p>Stop Sequence: {vehicle.currentStopSequence}</p>
                    <p>Stop ID: {vehicle.stopId}</p>
                  </div>
                </Popup>
              </Marker>
            )}
          </div>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;
