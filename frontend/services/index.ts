// Public Service
import { 
    PublicDjangoService
} from "./PublicService";

// Client Service
import {
    ClientDjangoService
} from './ClientService';

export const publicService = new PublicDjangoService();
export const clientService = new ClientDjangoService();
export const volounteerService = new ClientDjangoService();