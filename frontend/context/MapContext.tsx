'use client'

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Event, EventType } from '@/services/Events'


interface MapContextType {
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  localization: number[];
  setLocalization: React.Dispatch<React.SetStateAction<number[]>>;
  loading: boolean;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export const MapProvider = ({ children }: { children: React.ReactNode }) => {
  const [events, setEvents] = useState<Event[]>([
    { id: 1, name: 'Event 1', position: [51.505, -0.09], type: EventType.DEFAULT },
    { id: 2, name: 'Event 2', position: [51.51, -0.1], type: EventType.WORK },
  ]);

  const [localization, setLocalization] = useState<number[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (navigator.geolocation) {
        navigator.permissions
          .query({ name: "geolocation" })
          .then((result) => {
            if (result.state === 'granted' || result.state === 'prompt') {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  const { latitude, longitude } = position.coords;
                  setLocalization([latitude, longitude]);
                  setLoading(false);
                },
                (error) => {
                  console.error("Error getting location:", error);
                  setLoading(false); // Stop loading if there's an error
                }
              );
            } else {
              console.log("Geolocation permission denied.");
              setLoading(false); // Stop loading if permission denied
            }
          })
          .catch((error) => {
            console.error("Error querying permissions:", error);
            setLoading(false); // Stop loading if there's an error querying permissions
          });
    } else {
      console.log("Geolocation is not supported by this browser.");
      setLoading(false); // Stop loading if geolocation is not supported
    }
  }, []);

  const value: MapContextType = {
    events,
    setEvents,
    localization,
    setLocalization,
    loading,
  }

  return (
    <MapContext.Provider value={value}>
      {children}
    </MapContext.Provider>
  );
};

export const useMapContext = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error('useMapContext must be used within a MapProvider');
  }
  return context;
};
