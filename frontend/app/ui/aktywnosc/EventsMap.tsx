'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useMapContext } from '@/context/MapContext';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

// Dynamic import of the actual map component with ssr disabled
const Map = dynamic(
  () => import('./MapComponent'), 
  { 
    ssr: false,
    loading: () => <Skeleton height={500} width="100%" />
  }
);

export default function EventsMap() {
  const { events, localization, loading, focusedEvent } = useMapContext();

  if (loading) {
    return <Skeleton height={500} width="100%" />;
  }

  return <Map events={events} localization={localization} focusedEvent={focusedEvent} />;
}