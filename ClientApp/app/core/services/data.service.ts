import { Http, Response, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from './config.service';
import { Message, Chat } from '../interfaces';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DataService {
    public _pageSize: number;
    public _baseUri: string;

    constructor(public http: Http,
        private configService: ConfigService) {
        this._baseUri = configService.getApiURI();
    }

    set(baseUri: string, pageSize?: number): void {
        this._baseUri = baseUri;
        this._pageSize = pageSize;
    }

    get(page?: number) {

        if (page != undefined) {
            var uri = this._baseUri + page.toString() + '/' + this._pageSize.toString();
        }
        else
            var uri = this._baseUri;


        return this.http.get(uri)
            .map(response => (<Response>response));
    }

    getAuthenticate(token: string, page?: number) {
        var headers = new Headers();
        headers.append("Authorization", "Bearer " + token)
        headers.append("Content-Type", "application/json")
        if (page != undefined) {
            var uri = this._baseUri + page.toString() + '/' + this._pageSize.toString();
        }
        else
            var uri = this._baseUri;

        return this.http.get(uri, { headers: headers })
            .map(response => (<Response>response));
    }

    post(data?: any, mapJson: boolean = true) {
        var headers = new Headers();
        headers.append("Content-Type", "application/json")
        if (mapJson)
            return this.http.post(this._baseUri, data, headers)
                .map(response => <any>(<Response>response).json());
        else
            return this.http.post(this._baseUri, data);
    }

    postForToken(data: any, headers?: Headers, mapJson: boolean = true) {
        var uri = this._baseUri;
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();

            xhr.open("POST", uri, true)
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

            xhr.onload = function () {
                if (xhr.status == 200) {
                    resolve(xhr.response);
                } else {
                    var error = new Error(xhr.statusText);
                    reject(error);
                }
            };
            xhr.onerror = function () {
                reject(new Error("Network Error"));
            };
            xhr.send(data);
        })
    }

    put(data?: any, mapJson: boolean = true) {
        if (mapJson)
            return this.http.put(this._baseUri, data)
                .map(response => <any>(<Response>response).json());
        else
            return this.http.put(this._baseUri, data);
    }

    putAuthenticate(token: string, data: any, mapJson: boolean = true) {
        var headers = new Headers();
        headers.append("Authorization", "Bearer " + token)
        if (mapJson)
            return this.http.put(this._baseUri, data, {
                headers: headers
            })
                .map(response => <any>(<Response>response).json());
        else
            return this.http.put(this._baseUri, data, {
                headers: headers
            });
    }

    postAuthenticate(token: string, data?: any, mapJson: boolean = true) {
        var headers = new Headers();
        headers.append("Content-Type", "application/json")
        headers.append("Authorization", "Bearer " + token)
        if (mapJson)
            return this.http.post(this._baseUri, data, {
                headers: headers
            })
                .map(response => <any>(<Response>response).json());
        else
            return this.http.post(this._baseUri, data, {
                headers: headers
            });
    }

    delete(token: string) {
        var headers = new Headers();
        headers.append("Content-Type", "application/json")
        headers.append("Authorization", "Bearer " + token)
        return this.http.delete(this._baseUri, {
            headers: headers
        })
            .map(response => <any>(<Response>response).json())
    }

    deleteResource(resource: string) {
        return this.http.delete(resource)
            .map(response => <any>(<Response>response).json())
    }

    upload(file: any) {
        let input = new FormData();
        let headers = new Headers()
        headers.append("enctype", "multipart/form-data");
        input.append("file", file);
        return this.http
            .post(this._baseUri, input, {
                headers: headers
            })
    }

    getChats(): Observable<Chat[]> {
        return this.http.get(this._baseUri + 'chats')
            .map(this.extractData)
            .catch(this.handleError);
    }

    addChatMessage(message: Message): Observable<void> {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post(this._baseUri + 'message/', JSON.stringify(message), {
            headers: headers
        })
            .map((res: Response) => {
                return null;
            })
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}