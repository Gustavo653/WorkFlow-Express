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
}
