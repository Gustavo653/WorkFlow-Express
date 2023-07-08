import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root',
})
export class PriorityService {
    constructor(private http: HttpClient, private storageService: StorageService) {}

    private getAPIURL(): Observable<string> {
        return this.storageService.getAPIURL();
    }

    getPriorities(): Observable<any> {
        return this.getAPIURL().pipe(
            switchMap((url) => {
                const apiUrl = `${url}/api/priority`;
                return this.http.get(apiUrl);
            })
        );
    }

    createPriority(name: string): Observable<any> {
        return this.getAPIURL().pipe(
            switchMap((url) => {
                const apiUrl = `${url}/api/priority`;
                const body = { name };
                return this.http.post(apiUrl, body);
            })
        );
    }

    updatePriority(id: string, name: string): Observable<any> {
        return this.getAPIURL().pipe(
            switchMap((url) => {
                const apiUrl = `${url}/api/priority/${id}`;
                const body = { name };
                return this.http.put(apiUrl, body);
            })
        );
    }

    deletePriority(id: string): Observable<any> {
        return this.getAPIURL().pipe(
            switchMap((url) => {
                const apiUrl = `${url}/api/priority/${id}`;
                return this.http.delete(apiUrl);
            })
        );
    }
}
