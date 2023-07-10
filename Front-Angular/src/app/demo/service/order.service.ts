import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    constructor(private http: HttpClient, private storageService: StorageService) {}

    private getAPIURL(): Observable<string> {
        return this.storageService.getAPIURL();
    }

    getOrders(type: number, queryParams?: any): Observable<any> {
        return this.getAPIURL().pipe(
            switchMap((url) => {
                const apiUrl = type === 0 ? `${url}/orders/requester` : `${url}/orders/agent`;
                const params = new HttpParams({ fromObject: queryParams });
                return this.http.get(apiUrl, { params });
            })
        );
    }

    getOrder(id: number): Observable<any> {
        return this.getAPIURL().pipe(
            switchMap((url) => {
                return this.http.get(`${url}/orders/${id}`);
            })
        );
    }

    getRequesterOrder(id: number): Observable<any> {
        return this.getAPIURL().pipe(
            switchMap((url) => {
                return this.http.get(`${url}/orders/detail-requester/${id}`);
            })
        );
    }

    createOrder(title: string, description: string, priorityId: number, agentId: number, categoryId: number, supportGroupId: number): Observable<any> {
        return this.getAPIURL().pipe(
            switchMap((url) => {
                const apiUrl = `${url}/orders`;
                const body = { title, description, priorityId, agentId, categoryId, supportGroupId };
                return this.http.post(apiUrl, body);
            })
        );
    }

    updateOrder(id: string, title: string, description: string, priorityId: number, agentId: number, categoryId: number, supportGroupId: number): Observable<any> {
        return this.getAPIURL().pipe(
            switchMap((url) => {
                const apiUrl = `${url}/orders/${id}`;
                const body = { title, description, priorityId, agentId, categoryId, supportGroupId };
                return this.http.put(apiUrl, body);
            })
        );
    }

    finishOrder(id: string): Observable<any> {
        return this.getAPIURL().pipe(
            switchMap((url) => {
                const apiUrl = `${url}/orders/finish/${id}`;
                return this.http.post(apiUrl, {});
            })
        );
    }

    rateOrder(id: string, rating: string): Observable<any> {
        return this.getAPIURL().pipe(
            switchMap((url) => {
                const apiUrl = `${url}/orders/rate/${id}`;
                return this.http.post(apiUrl, { rating });
            })
        );
    }

    createTimeEntry(description: string, startTime: Date, endTime: Date, type: string, orderId: number): Observable<any> {
        return this.getAPIURL().pipe(
            switchMap((url) => {
                const apiUrl = `${url}/time-entries`;
                const body = { description, startTime, endTime, type, orderId };
                return this.http.post(apiUrl, body);
            })
        );
    }

    updateTimeEntry(id: number, description: string, startTime: Date, endTime: Date, type: string): Observable<any> {
        return this.getAPIURL().pipe(
            switchMap((url) => {
                const apiUrl = `${url}/time-entries/${id}`;
                const body = { description, startTime, endTime, type };
                return this.http.post(apiUrl, body);
            })
        );
    }

    deleteTimeEntry(id: string): Observable<any> {
        return this.getAPIURL().pipe(
            switchMap((url) => {
                const apiUrl = `${url}/time-entries/${id}`;
                return this.http.delete(apiUrl);
            })
        );
    }
}
