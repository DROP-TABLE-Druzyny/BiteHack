import axios from "axios";
import { ApiService } from "./ApiService";

interface IVolounteerService {
    logIn(username: string, password: string): Promise<{ access_token: string }>;
}

export class DjangoVolounteerService extends ApiService implements IVolounteerService {
    constructor() {
        const axiosInstance = axios.create({
            baseURL: 'http://192.168.1.148:8000/api/',
        });

        super(axiosInstance);
    }

    public async logIn(username: string, password: string): Promise<{ access_token: string }> {
        const response = await this.post<{ access_token: string }, { username: string, password: string }>('/volounteer/login/', { username, password });

        localStorage.setItem("access_token", response.access_token);

        return response;
    }
}