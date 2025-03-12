'use client';

import 'leaflet/dist/leaflet.css';

import { useState, useRef, useContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Polygon } from 'react-leaflet';
import { Icon } from 'leaflet';
import GtfsRealtimeBindings from "gtfs-realtime-bindings";
import { RouteContext } from '@/contexts/RouteContextProvider';

function Map({ vehicles }: {
  vehicles: (GtfsRealtimeBindings.transit_realtime.IVehiclePosition | null | undefined)[],
}) {
  const { hoveredRoute, setHoveredRoute, selectedRoute, setSelectedRoute } = useContext(RouteContext);

  const [mapTheme, setMapTheme] = useState<string>('light');
  const mapRef = useRef<any>(null);

  const iconPixelSize: [number, number] = [40, 40];

  const locationIcon = new Icon({
    iconUrl: '/map-pin-fill.svg',
    iconSize: iconPixelSize,
  });

  const busIcon = new Icon({
    iconUrl: '/bus-fill.svg',
    iconSize: iconPixelSize,
  });

  const circleIcon = new Icon({
    iconUrl: '/circle-line.svg',
    iconSize: iconPixelSize,
  });

  return (
    <div className="relative top-0 left-0 w-full h-full">
      {/* <div className="absolute bottom-0 right-0 bg-black/75 z-50 p-2">
        <button type="button" className="p-2 bg-neutral-500 text-white cursor-pointer capitalize" onClick={() => {
          if (mapTheme === 'light') {
            setMapTheme('dark');
          } else {
            setMapTheme('light');
          }
        }}>{mapTheme === 'light' ? 'dark' : 'light'}</button>
      </div> */}
      <MapContainer ref={mapRef} center={[49.22563, -122.97430]} zoom={12} scrollWheelZoom attributionControl={false} className="z-40">
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

        {hoveredRoute && (
          <>
            <Polygon positions={hoveredRoute.polylinePositions} color="lightgray" />
            <Polyline positions={hoveredRoute.polylinePositions} color="gray" />
          </>
        )}

        {selectedRoute && (
          <>
            <Polygon positions={selectedRoute.polylinePositions} color="blue" />
            <Polyline positions={selectedRoute.polylinePositions} color="red" />
          </>
        )}


        {/* {polylinePositions.map((position, index) => (
          <Marker key={index} position={position} icon={circleIcon}>

          </Marker>
        ))} */}

        {/* {vehicles.map((vehicle, index) => (
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
        ))} */}
      </MapContainer>
    </div>
  );
}

export default Map;
