import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private http: HttpClient, private storageService: StorageService) {}

    private getAPIURL(): Observable<string> {
        return this.storageService.getAPIURL();
    }

    getUsers(): Observable<any> {
        return this.getAPIURL().pipe(
            switchMap((url) => {
                const apiUrl = `${url}/api/account`;
                return this.http.get(apiUrl);
            })
        );
    }

    createUser(userName:string, name: string, email: string, roles: string[], password: string): Observable<any> {
        return this.getAPIURL().pipe(
            switchMap((url) => {
                const apiUrl = `${url}/api/account`;
                const body = { name, userName, email, roles, password };
                return this.http.post(apiUrl, body);
            })
        );
    }

    updateUser(id: string, userName:string, name: string, email: string, roles: string[], password: string): Observable<any> {
        return this.getAPIURL().pipe(
            switchMap((url) => {
                const apiUrl = `${url}/api/account/${id}`;
                const body = { name, userName, email, roles, password };
                return this.http.put(apiUrl, body);
            })
        );
    }

    deleteUser(id: string): Observable<any> {
        return this.getAPIURL().pipe(
            switchMap((url) => {
                const apiUrl = `${url}/api/account/${id}`;
                return this.http.delete(apiUrl);
            })
        );
    }
}
