'use client';

import 'leaflet/dist/leaflet.css';

import { useState, useRef, useContext, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Polygon } from 'react-leaflet';
import { Icon } from 'leaflet';
import GtfsRealtimeBindings from "gtfs-realtime-bindings";
import { useRouteContext } from '@/hooks/context';
import { getVehicles } from '@/helpers/realtime';

function Map() {
  const { selectedRoute, hoveredRoute, setSelectedRoute, setHoveredRoute } = useRouteContext();

  const [vehicles, setVehicles] = useState<(GtfsRealtimeBindings.transit_realtime.IVehiclePosition | null | undefined)[]>([]);
  const [selectedRouteVehicles, setSelectedRouteVehicles] = useState<(GtfsRealtimeBindings.transit_realtime.IVehiclePosition | null | undefined)[]>([]);

  const [mapTheme, setMapTheme] = useState<string>('light');
  const mapRef = useRef<any>(null);

  useEffect(() => {
    async function getData() {
      const { vehicles: _vehicles } = await getVehicles();

      if (_vehicles) {
        // console.log('MOUNT:', _vehicles);
        setVehicles(_vehicles);

        setInterval(async () => {
          const { vehicles: _vehicles } = await getVehicles();
          // console.log('INTERVAL:', _vehicles);
          setVehicles(_vehicles);
        }, 30000);
      }
    }

    getData();
  }, []);

  useEffect(() => {
    if (selectedRoute) {
      const _selectedRouteVehicles: (GtfsRealtimeBindings.transit_realtime.IVehiclePosition | null | undefined)[] = vehicles.filter(vehicle => {
        if (vehicle?.trip?.routeId === selectedRoute.route.route_id) {
          return vehicle;
        }
      });

      console.log(_selectedRouteVehicles);

      setSelectedRouteVehicles(_selectedRouteVehicles);
    }
  }, [selectedRoute, vehicles]);

  const iconPixelSize: [number, number] = [40, 40];

  const locationIcon = new Icon({
    iconUrl: '/map-pin-fill.svg',
    iconSize: iconPixelSize,
    className: 'rounded-full bg-white transition-all duration-300 shadow',
  });

  const busIcon = new Icon({
    iconUrl: '/bus-fill.svg',
    iconSize: iconPixelSize,
    className: 'rounded-full bg-white transition-all duration-300 shadow',
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
            <Polygon positions={hoveredRoute.polylinePositions} color="oklch(0.922 0 0)" interactive={false} />
            <Polyline positions={hoveredRoute.polylinePositions} color="oklch(0.708 0 0)" interactive={false} />
          </>
        )}

        {selectedRoute && (
          <>
            <Polygon positions={selectedRoute.polylinePositions} color="oklch(0.685 0.169 237.323)" interactive={false} />
            <Polyline positions={selectedRoute.polylinePositions} color="oklch(0.696 0.17 162.48)" interactive={false} />
          </>
        )}

        {selectedRouteVehicles.map((vehicle, index) => (
          <div key={index} className="p-4">
            {vehicle && vehicle.position && vehicle.vehicle && (
                <Marker position={[vehicle.position.latitude, vehicle.position?.longitude]} icon={busIcon} interactive={false}>
                  {/* <Popup className="transition-all duration-300">
                    <div className="flex flex-col justify-start items-start p-2 gap-2 w-[128px] shadow">
                      <button type="button" className="self-end hover:bg-neutral-200 flex justify-center items-center cursor-pointer" onClick={() => mapRef.current?.closePopup()}>
                        <img src="/close-line.svg" alt="Close Popup" width={16} height={16} />
                      </button>
                      <span className="font-bold">{vehicle.vehicle.label}</span>
                      <span>Stop: {vehicle.stopId}</span>
                    </div>
                  </Popup> */}
                </Marker>
            )}            
          </div>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;
