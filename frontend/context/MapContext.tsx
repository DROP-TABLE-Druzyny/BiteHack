'use client'

import React, { createContext, useContext, useState } from 'react';
import { Event, EventType } from '@/services/Events'


interface MapContextType {
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
}

const MapContext = createContext<MapContextType | undefined>(undefined);

export const MapProvider = ({ children }: { children: React.ReactNode }) => {
  const [events, setEvents] = useState<Event[]>([
    { id: 1, name: 'Event 1', position: [51.505, -0.09], type: EventType.DEFAULT },
    { id: 2, name: 'Event 2', position: [51.51, -0.1], type: EventType.WORK },
  ]);

  return (
    <MapContext.Provider value={{ events, setEvents }}>
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
