import axios from 'axios';
import { ApiService } from './ApiService';

export interface IClientService {
    generateRandomCode(phone: string): Promise<void>;
    register(phone: string, code: string): Promise<{}>; // TODO: set user type
    login(phone: string, code: string): Promise<{ 'access_token': string }>; // TODO: set user type
    logout(): void;
    updateName(name: string): Promise<void>;
    isLoggedIn(): Promise<boolean>;
}

export class ClientDjangoService extends ApiService implements IClientService {
    constructor() {
        const axiosInstance = axios.create({
            baseURL: 'http://192.168.1.148:8000/api/',
        });
        
        super(axiosInstance);
    }

    private _retrieveToken(): string {
        return localStorage.getItem('access_token') || '';
    }
    public async generateRandomCode(phone: string): Promise<void> {
        await this.post<void, {phone: string}>('client/code/', { 'phone': phone });
    }
    public async register(phone: string, code: string): Promise<{}> {
        // TODO: Replace {} with user type
        return this.post<{}, {phone: string, code: string}>('client/', { 'phone': phone, 'code': code });
    }
    public async login(phone: string, code: string): Promise<{ 'access_token': string }> {
        return this.post<{ 'access_token': string }, {code: string}>(`client/${phone}/login/`, { 'code': code });
    }
    public logout(): void {
        localStorage.removeItem('access_token');

        return;
    }
    public async updateName(name: string): Promise<void> {
        await this.patch<void, {name: string}>('client/', { 'name': name }, {
            headers: {
                'Authorization': `Bearer ${this._retrieveToken()}`
            }
        });
    }
    public async isLoggedIn(): Promise<boolean> {
        const _token = this._retrieveToken();

        if (!_token) return false;

        const response = this.get<void>('client/authenticated/', {}, {
            headers: {
                'Authorization': `Bearer ${_token}`
            }
        })

        return response.then(() => true).catch(() => false);
    }
}