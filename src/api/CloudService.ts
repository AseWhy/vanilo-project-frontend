import {AxiosResponse} from 'axios';
import axios from "axios/index";
import ServiceException from "./exceptions/ServiceException";

const UNAUTHORIZED = { data: { error: true, message: "Unauthorized", status: 401 }, status: 401 } as any;

export default class CloudService {
    private serviceUrl: string;

    public constructor(serviceUrl: string = 'base-service') {
        this.serviceUrl = window.location.protocol + "//" + this.getHost() + "/" + serviceUrl;
    }

    public getHost() {
        if(!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
            return window.location.hostname + ":3000";
        } else {
            return window.location.host;
        }
    }

    public getToken() {
        const token = localStorage.getItem("token");
        const expires = localStorage.getItem("token_expires");

        if(token != null && expires != null) {
            const expires_pure = parseInt(expires);

            if(expires_pure > Date.now() / 1000) {
                return "Bearer " + token;
            } else {
                return undefined;
            }
        } else {
            return undefined;
        }
    }

    public getHeaders(): any {
        const token = this.getToken();
        
        if(token != null) {
            return {
                Authorization: token
            }
        } else {
            return {

            }
        }
    }

    public async  baseErrorCheck(payback: Promise<AxiosResponse|undefined>|AxiosResponse|undefined){
        const _payback = await payback;

        if(_payback != null && (_payback.status > 299 || _payback.status < 200)) {
            if (_payback.status === 403){
                throw new ServiceException(_payback.data.error, _payback.status, _payback.data.code, _payback.data.errors);
            }
            
            throw new ServiceException(_payback.data.message, _payback.status, _payback.data.code, _payback.data.errors);
        }

        return _payback?.data ?? null;
    }

    public async put(url: string, body: any = {}, params: Record<string, any> = {}, auth = true) {
        if (body === null) {
            body = {};
        }

        const response = await axios.put(this.serviceUrl + url, body, { validateStatus: () => true, headers: auth ? this.getHeaders() : {}, ...params });

        if(response.status !== 401) {
            return response;
        } else {
            return UNAUTHORIZED;
        }
    }

    public async delete(url: string, body: any = {}, params: Record<string, any> = {}, auth = true) {
        if (body === null) {
            body = {};
        }

        const response = await axios.delete(this.serviceUrl + url, { data: body, validateStatus: () => true, headers: auth ? this.getHeaders() : {}, ...params });

        if(response.status !== 401) {
            return response;
        } else {
            return UNAUTHORIZED;
        }
    }

    public async post(url: string, body: any = {}, params: Record<string, any> = {}, auth = true) {
        if (body === null) {
            body = {};
        }

        const response = await axios.post(this.serviceUrl + url, body, { validateStatus: () => true, headers: auth ? this.getHeaders() : {}, ...params });

        if(response.status !== 401) {
            return response;
        } else {
            return UNAUTHORIZED;
        }
    }

    public async get(url: string, params: Record<string, any> = {}, auth = true) {
        const response = await axios.get(this.serviceUrl + url, { validateStatus: () => true, headers: auth ? this.getHeaders() : {}, ...params });

        if(response.status !== 401) {
            return response;
        } else {
            return UNAUTHORIZED;
        }
    }

    public storage(name: string) {
        return this.serviceUrl + "storage/" + name;
    }
}
export const CloudServiceInstance = new CloudService("");