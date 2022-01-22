import {AxiosResponse} from 'axios';
import axios from "axios/index";
import ServiceException from "./exceptions/ServiceException";

const UNAUTHORIZED = { data: { error: true, message: "Unauthorized", status: 401 } } as any;

export default class CloudService {
    private serviceUrl: string;

    public constructor(serviceUrl: string = 'base-service') {
        this.serviceUrl = window.location.protocol + "//" + window.location.host + "/" + serviceUrl;
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

    public async put(url: string, body: any = {}, params: Record<string, any> = {}) {
        if (body === null) {
            body = {};
        }

        const response = await axios.put(this.serviceUrl + url, body, { validateStatus: () => true, ...params });

        if(response.status !== 401) {
            return response;
        } else {
            return UNAUTHORIZED;
        }
    }

    public async delete(url: string, body: any = {}, params: Record<string, any> = {}) {
        if (body === null) {
            body = {};
        }

        const response = await axios.delete(this.serviceUrl + url, { data: body, validateStatus: () => true, ...params });

        if(response.status !== 401) {
            return response;
        } else {
            return UNAUTHORIZED;
        }
    }

    public async post(url: string, body: any = {}, params: Record<string, any> = {}) {
        if (body === null) {
            body = {};
        }

        const response = await axios.post(this.serviceUrl + url, body, { validateStatus: () => true, ...params });

        if(response.status !== 401) {
            return response;
        } else {
            return UNAUTHORIZED;
        }
    }

    public async get(url: string, params: Record<string, any> = {}) {
        const response = await axios.get(this.serviceUrl + url, { validateStatus: () => true, ...params });

        if(response.status !== 401) {
            return response;
        } else {
            return UNAUTHORIZED;
        }
    }
}
export const CloudServiceInstance = new CloudService();