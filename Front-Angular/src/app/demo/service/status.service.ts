import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root',
})
export class StatusService {
    constructor(private http: HttpClient, private storageService: StorageService) {}

    private getAPIURL(): Observable<string> {
        return this.storageService.getAPIURL();
    }

    getStatuses(): Observable<any> {
        return this.getAPIURL().pipe(
            switchMap((url) => {
                const apiUrl = `${url}/statuses`;
                return this.http.get(apiUrl);
            })
        );
    }

    createStatus(name: string): Observable<any> {
        return this.getAPIURL().pipe(
            switchMap((url) => {
                const apiUrl = `${url}/statuses`;
                const body = { name };
                return this.http.post(apiUrl, body);
            })
        );
    }

    updateStatus(id: string, name: string): Observable<any> {
        return this.getAPIURL().pipe(
            switchMap((url) => {
                const apiUrl = `${url}/statuses/${id}`;
                const body = { name };
                return this.http.put(apiUrl, body);
            })
        );
    }

    deleteStatus(id: string): Observable<any> {
        return this.getAPIURL().pipe(
            switchMap((url) => {
                const apiUrl = `${url}/statuses/${id}`;
                return this.http.delete(apiUrl);
            })
        );
    }
}
