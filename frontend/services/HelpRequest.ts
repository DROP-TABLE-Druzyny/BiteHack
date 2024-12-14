export type HelpRequestTypes = "SHOPPING"
    | "MEDICAL"
    | "TRANSPORT"
    | "CARE"
    | "WALK" 
    | "OTHER";

export type HelpRequest = {
    id: number;
    author: number;
    description: string;
    created: string;
    expiration: string;
    latitude: number;
    longitude: number;
    variable: HelpRequestTypes;
    accepted_by: number | null;
    completed: boolean;
};