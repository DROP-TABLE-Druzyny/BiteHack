'use client';

import React, { ReactElement, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { renderToString } from 'react-dom/server';
import 'leaflet/dist/leaflet.css';
import { useMapContext } from '@/context/MapContext';
import L, { LatLngExpression } from 'leaflet';
import { Briefcase } from 'lucide-react';
import { eventIconMap } from '@/services/Events';
import { Event } from '@/services/Events';






interface CustomIconProps {
  icon: React.ReactNode; // Accept any React node, but specifically a Lucide icon
  color?: string; // Optional color for the icon
}

function createCustomIcon({ icon, color = 'white' }: CustomIconProps): L.DivIcon {
  return new L.DivIcon({
    html: `<div style="display: flex; justify-content: center; align-items: center; width: 30px; height: 30px; background-color: ${color}; border-radius: 50%; box-shadow: 0 0 5px rgba(0,0,0,0.5);">
             <svg fill="black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="width: 20px; height: 20px;">
               ${renderToString(icon)}
             </svg>
           </div>`,
    className: '', // Remove default Leaflet styles
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });
}

// Component to handle map focus when the focusedEvent changes
function MapFocusHandler({ focusedEvent }: { focusedEvent: Event | null }) {
  const map = useMap();

  useEffect(() => {
    if (focusedEvent) {
      const position: LatLngExpression = [focusedEvent.latitude, focusedEvent.longitude];
      map.setView(position, 15, { animate: true }); // Focus and zoom in on the event
    }
  }, [focusedEvent, map]);

  return null; // This component only handles the map logic
}

export default function EventsMap() {
  const { events, localization, loading, focusedEvent } = useMapContext();

  const position: LatLngExpression = [localization[0], localization[1]];

  if (loading) {
    return <div>Loading...</div>;
  }

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
      {/* Handle map focus when focusedEvent changes */}
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

