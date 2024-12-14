'use client'

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Event, EventType } from '@/services/Events'
import { publicService } from '@/services';


interface MapContextType {
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  localization: number[];
  setLocalization: React.Dispatch<React.SetStateAction<number[]>>;
  loading: boolean;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export const MapProvider = ({ children }: { children: React.ReactNode }) => {
  const [events, setEvents] = useState<Event[]>([]);

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
                },
                (error) => {
                  console.error("Error getting location:", error);
                }
              );
            } else {
              console.log("Geolocation permission denied.");
            }
          })
          .catch((error) => {
            console.error("Error querying permissions:", error);
          });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);
  
  useEffect(() => {
    if (!localization || localization.length == 0) return;
    console.log(localization);

    async function FetchEvents() {
      const result = await publicService.getLocalEvents(localization[0], localization[1])
      setEvents(result)
      setLoading(false)
    }

    FetchEvents();
    
  }, [localization])

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
