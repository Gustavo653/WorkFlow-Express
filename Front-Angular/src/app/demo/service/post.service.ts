import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root',
})
export class PostService {
    constructor(private http: HttpClient, private storageService: StorageService) {}

    private getAPIURL(): Observable<string> {
        return this.storageService.getAPIURL();
    }

    createPost(title: string, content: string): Observable<any> {
        return this.getAPIURL().pipe(
            switchMap((url) => {
                const apiUrl = `${url}/posts`;
                const body = { title, content };

                return this.http.post(apiUrl, body);
            })
        );
    }

    getMinePosts(): Observable<any> {
        return this.getAPIURL().pipe(
            switchMap((url) => {
                const apiUrl = `${url}/posts/mine`;
                return this.http.get(apiUrl);
            })
        );
    }

    getPosts(): Observable<any> {
        return this.getAPIURL().pipe(
            switchMap((url) => {
                const apiUrl = `${url}/posts`;
                return this.http.get(apiUrl);
            })
        );
    }

    getPostById(id: string): Observable<any> {
        return this.getAPIURL().pipe(
            switchMap((url) => {
                const apiUrl = `${url}/posts/${id}`;

                return this.http.get(apiUrl);
            })
        );
    }

    updatePost(id: string, title: string, content: string): Observable<any> {
        return this.getAPIURL().pipe(
            switchMap((url) => {
                const apiUrl = `${url}/posts/${id}`;
                const body = { title, content };

                return this.http.put(apiUrl, body);
            })
        );
    }

    deletePost(id: string): Observable<any> {
        return this.getAPIURL().pipe(
            switchMap((url) => {
                const apiUrl = `${url}/posts/${id}`;

                return this.http.delete(apiUrl);
            })
        );
    }

    createComment(postId: string, content: string): Observable<any> {
        return this.getAPIURL().pipe(
            switchMap((url) => {
                const apiUrl = `${url}/posts/${postId}/comments`;
                const body = { content };

                return this.http.post(apiUrl, body);
            })
        );
    }

    addReaction(postId: string, type: string): Observable<any> {
        return this.getAPIURL().pipe(
            switchMap((url) => {
                const apiUrl = `${url}/posts/${postId}/reactions`;
                const body = { type };

                return this.http.post(apiUrl, body);
            })
        );
    }
}
