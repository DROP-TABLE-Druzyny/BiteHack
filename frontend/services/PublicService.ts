import axios from 'axios';
import { ApiService } from './ApiService';
import { isTokenExpired } from '../lib/utils';

export interface IPublicService {
    refreshToken(token: string): Promise<{ access: string }>;
    register(username: string, password: string, email: string): Promise<void>;
    login(username: string, password: string): Promise<{ access: string, refresh: string }>;
    getLocalEvents(latitude: number, longitude: number): Promise<{}>;
}

export class DjangoService extends ApiService implements IPublicService {
    constructor() {
        const axiosInstance = axios.create({
            baseURL: 'http://192.168.1.148:8000/api/',
        });

        // if the last request was unauthorized, try to refresh the token
        axiosInstance.interceptors.response.use(
            (response) => {
                return response;
            },
            async (error) => {
                const originalRequest = error.config;
                if (error.response.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;
                    const refreshToken = localStorage.getItem("refresh_token");
                    if (refreshToken && !isTokenExpired(refreshToken)) {
                        try {
                            const response = await this.refreshToken(refreshToken);

                            localStorage.setItem("access_token", response.access);
                            originalRequest.headers["Authorization"] = `Bearer ${response.access}`;

                            return axiosInstance(originalRequest);
                        } catch (err) {
                            console.error("Token refresh failed:", err);
                        }
                    }
                }
                return Promise.reject(error);
            }
        );

        super(axiosInstance);
    }

    public async refreshToken(token: string): Promise<{ access: string }> {
        return this.post<{ access: string }, { refresh: string }>('token/refresh/', { refresh: token });
    }

    public async register(username: string, password: string, email: string): Promise<void> {
        return this.post<void, { username: string, password: string, email: string }>('user/register/', { username, password, email });
    }

    public async login(username: string, password: string): Promise<{ access: string, refresh: string }> {
        const response = await this.post<{ access: string, refresh: string }, { username: string, password: string }>('login/', { username, password });

        localStorage.setItem("access_token", response.access);
        localStorage.setItem("refresh_token", response.refresh);

        return response;
    }

    public async logout(): Promise<void> {
        const response = await this.post<void, {}>('user/logout/', { refresh: localStorage.getItem("refresh_token") });

        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        return response;
    }
    public async getLocalEvents(latitude?: number, longitude?: number): Promise<{}> {
        // TODO: Replace with the EventType
        const params = { latitude, longitude };
        return this.get<{}>('event/', params);
    }
}