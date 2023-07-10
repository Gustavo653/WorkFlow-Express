import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root',
})
export class CategoryService {
    constructor(private http: HttpClient, private storageService: StorageService) {}

    private getAPIURL(): Observable<string> {
        return this.storageService.getAPIURL();
    }

    getCategories(): Observable<any> {
        return this.getAPIURL().pipe(
            switchMap((url) => {
                const apiUrl = `${url}/categories`;
                return this.http.get(apiUrl);
            })
        );
    }

    createCategory(name: string): Observable<any> {
        return this.getAPIURL().pipe(
            switchMap((url) => {
                const apiUrl = `${url}/categories`;
                const body = { name };
                return this.http.post(apiUrl, body);
            })
        );
    }

    updateCategory(id: string, name: string): Observable<any> {
        return this.getAPIURL().pipe(
            switchMap((url) => {
                const apiUrl = `${url}/categories/${id}`;
                const body = { name };
                return this.http.put(apiUrl, body);
            })
        );
    }

    deleteCategory(id: string): Observable<any> {
        return this.getAPIURL().pipe(
            switchMap((url) => {
                const apiUrl = `${url}/categories/${id}`;
                return this.http.delete(apiUrl);
            })
        );
    }
}
