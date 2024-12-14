import { Briefcase, Circle, HeartHandshake, Music, PartyPopper } from "lucide-react";

export enum EventType {
    PARTY = 'PARTY',
    WORK = 'WORK',
    MUSIC = 'MUSIC',
    MEETING = 'MEETING',
    DEFAULT = 'DEFAULT',
}

export interface Event {
  id: number;
  name: string;
  description: string;
  position: [number, number]; // Latitude and Longitude
  type: EventType;
  latitude: number;
  longitude: number;
  data_start: string;
  data_end: string;
}

export const eventIconMap: Record<EventType, React.ReactNode> = {
    [EventType.PARTY]: <PartyPopper/>,
    [EventType.WORK]: <Briefcase/>,
    [EventType.MEETING]: <HeartHandshake />,
    [EventType.MUSIC]: <Music/>,
    [EventType.DEFAULT]: <Music/>,
};