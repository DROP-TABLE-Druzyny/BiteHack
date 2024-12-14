import { Briefcase, Circle, Music, PartyPopper } from "lucide-react";

export enum EventType {
    PARTY = 'party',
    WORK = 'work',
    MUSIC = 'music',
    DEFAULT = 'default',
}

export interface Event {
  id: number;
  name: string;
  position: [number, number]; // Latitude and Longitude
  type: EventType;
}

export const eventIconMap: Record<EventType, React.ReactNode> = {
    [EventType.PARTY]: <PartyPopper/>,
    [EventType.WORK]: <Briefcase/>,
    [EventType.MUSIC]: <Music/>,
    [EventType.DEFAULT]: <Music/>,
};