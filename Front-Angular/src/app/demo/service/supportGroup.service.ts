import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root',
})
export class SupportGroupService {
    constructor(private http: HttpClient, private storageService: StorageService) {}

    private getAPIURL(): Observable<string> {
        return this.storageService.getAPIURL();
    }

    getSupportGroups(): Observable<any> {
        return this.getAPIURL().pipe(
            switchMap((url) => {
                const apiUrl = `${url}/support-groups`;
                return this.http.get(apiUrl);
            })
        );
    }

    createSupportGroup(name: string, users: any[]): Observable<any> {
        return this.getAPIURL().pipe(
            switchMap((url) => {
                const apiUrl = `${url}/support-groups`;
                const body = { name, users };
                return this.http.post(apiUrl, body);
            })
        );
    }

    updateSupportGroup(id: string, name: string, users: any[]): Observable<any> {
        return this.getAPIURL().pipe(
            switchMap((url) => {
                const apiUrl = `${url}/support-groups/${id}`;
                const body = { name, users };
                return this.http.put(apiUrl, body);
            })
        );
    }

    deleteSupportGroup(id: string): Observable<any> {
        return this.getAPIURL().pipe(
            switchMap((url) => {
                const apiUrl = `${url}/support-groups/${id}`;
                return this.http.delete(apiUrl);
            })
        );
    }
}
