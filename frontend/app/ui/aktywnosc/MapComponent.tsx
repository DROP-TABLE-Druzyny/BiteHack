'use client';

import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { renderToString } from 'react-dom/server';
import L, { LatLngExpression } from 'leaflet';
import { eventIconMap } from '@/services/Events';
import { Event } from '@/services/Events';
import 'leaflet/dist/leaflet.css';

interface MapProps {
  events: Event[];
  localization: number[];
  focusedEvent: Event | null;
}

interface CustomIconProps {
  icon: React.ReactNode;
  color?: string;
}

function createCustomIcon({ icon, color = 'white' }: CustomIconProps): L.DivIcon {
  return new L.DivIcon({
    html: `<div style="display: flex; justify-content: center; align-items: center; width: 30px; height: 30px; background-color: ${color}; border-radius: 50%; box-shadow: 0 0 5px rgba(0,0,0,0.5);">
             <svg fill="black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="width: 20px; height: 20px;">
               ${renderToString(icon)}
             </svg>
           </div>`,
    className: '',
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });
}

function MapFocusHandler({ focusedEvent }: { focusedEvent: Event | null }) {
  const map = useMap();

  useEffect(() => {
    if (focusedEvent) {
      const position: LatLngExpression = [focusedEvent.latitude, focusedEvent.longitude];
      map.setView(position, 15, { animate: true });
    }
  }, [focusedEvent, map]);

  return null;
}

export default function MapComponent({ events, localization, focusedEvent }: MapProps) {
  const position: LatLngExpression = [localization[0], localization[1]];

  return (
    <MapContainer
      center={position}
      zoom={13}
      style={{ height: '500px', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapFocusHandler focusedEvent={focusedEvent} />
      {events.map((event) => {
        const customIcon = createCustomIcon({ icon: eventIconMap[event.type] });
        return (
          <Marker
            key={event.id}
            position={[event.latitude, event.longitude]}
            icon={customIcon}
          >
            <Popup>{event.name}</Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}