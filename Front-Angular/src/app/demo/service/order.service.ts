import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

    getOrders(): Observable<any> {
        return this.getAPIURL().pipe(
            switchMap((url) => {
                const apiUrl = `${url}/orders`;
                return this.http.get(apiUrl);
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
