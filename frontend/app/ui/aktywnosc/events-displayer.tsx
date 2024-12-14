"use client";

import { MapPinIcon } from "@heroicons/react/24/outline";

import clsx from "clsx";
import { Button } from "@/components/ui/button";
import EventSidenav from "./event-sidenav";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Event, eventIconMap } from "@/services/Events";
import { useMapContext } from "@/context/MapContext";

export default function EventsDisplayer() {
  const {events, loading, setFocusedEvent} = useMapContext();

  if (loading)
  {
    return (
      <div>
        Loading
      </div>
    )
  }

  const handleAccordionClick = (event: Event
  ) => {
    setFocusedEvent(event)
  };
  
  

  return (
    <Accordion className="" type="single" collapsible>
      {events.map((event) => (
        <AccordionItem
          key={event.id}
          value={`item-${event.id}`}
          className="hover:bg-gray-200 rounded-lg p-4"
        >
          <AccordionTrigger onClick={() => handleAccordionClick(event)}>
            <div className="text-lg font-semibold">
              <div className="flex gap-2 items-center">
                <p className="text-2xl font-semibold mb-1">{event.name}</p>
                {eventIconMap[event.type]}
              </div>
              
              <div className="text-gray-700 font-extralight">
                <p>Start: {(new Date(event.data_start)).toLocaleDateString()}</p>
                {/*<p>Distance: {event.distance} km</p>*/}
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="text-lg">
              <p>{event.description}</p>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
