'use client';

import {
  MapPinIcon,
} from '@heroicons/react/24/outline';

import clsx from 'clsx';
import { Button } from '@/components/ui/button';
import EventSidenav from './event-sidenav';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function EventsDisplayer() {
  const events = [
    {
      id: 1,
      name: "Spotkanie seniorów",
      date: "2024-05-20",
      distance: 0.5,
      organizer: "Firma xyz",
    },
    {
      id: 2,
      name: "Spacer po parku",
      date: "2024-06-15",
      distance: 1,
      organizer: "Burmistrz gminy Kęty",
    },
    {
      id: 3,
      name: "Piknik rodzinny",
      date: "2024-07-10",
      distance: 2,
      organizer: "Jan Kowalski",
    },
  ];

  const handleAccordionClick = (event: { name: any; date?: string; distance?: number; organizer?: string; }) => {
    console.log(`Show location on map for event: ${event.name}`);
    // Future implementation to show location on map
  };

  return (
    <Accordion className="" type="single" collapsible>
      {events.map((event) => (
        <AccordionItem key={event.id} value={`item-${event.id}`} className='hover:bg-gray-200  rounded-lg'>
          <AccordionTrigger onClick={() => handleAccordionClick(event)}>
            <div className="text-lg font-semibold">
              <p>{event.name}</p>
              <p>Date: {event.date}</p>
              <p>Distance: {event.distance} km</p>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="text-lg">
              <p>Organizer: {event.organizer}</p>
              <p>Additional details...</p>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}