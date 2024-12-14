'use client';

import React, { ReactElement } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { renderToString } from 'react-dom/server';
import 'leaflet/dist/leaflet.css';
import { useMapContext } from '@/context/MapContext';
import L from 'leaflet';
import { Briefcase } from 'lucide-react';
import { eventIconMap } from '@/services/Events';


interface CustomIconProps {
    icon: React.ReactNode; // Accept any React node, but specifically a Lucide icon
    color?: string; // Optional color for the icon
  }

  function createCustomIcon({ icon, color = 'white' }: CustomIconProps): L.DivIcon {
    // if(!React.isValidElement(icon))
    // {
    //     throw new Excep
    // }        
    return new L.DivIcon({
      html: `<div style="display: flex; justify-content: center; align-items: center; width: 30px; height: 30px; background-color: ${color}; border-radius: 50%; box-shadow: 0 0 5px rgba(0,0,0,0.5);">
               <svg fill="black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style="width: 20px; height: 20px;">
                 ${renderToString(icon)} {/* Render the icon content */}
               </svg>
             </div>`,
      className: '', // Remove default Leaflet styles
      iconSize: [30, 30],
      iconAnchor: [15, 30],
    });
  }
export default function EventsMap() {
    const { events } = useMapContext();

    return (
        <MapContainer
            center={[51.505, -0.09]}
            zoom={13}
            style={{ height: '500px', width: '100%' }}
        >
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {events.map((event) => {
            const customIcon = createCustomIcon({icon: eventIconMap[event.type]});

            return (
                <Marker key={event.id} position={event.position} icon={customIcon}>
                    <Popup>{event.name}</Popup>
                </Marker>
            );
        })}
        </MapContainer>
    );
}
