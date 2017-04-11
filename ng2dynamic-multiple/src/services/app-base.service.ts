import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

@Injectable()
export class AppBaseService {

    constructor(public _http: Http) { }
    apiLoc = 'http://localhost:46768/api/';

    _serverError(err: any) {
        console.log('sever error:', err);  // debug
        if (err instanceof Response) {
            return Observable.throw(err.json().error || 'backend server error');
            // if you're using lite-server, use the following line
            // instead of the line above:
            //return Observable.throw(err.text() || 'backend server error');
        }
        return Observable.throw(err || 'backend server error');
    }

    sendGet(controller: string, action: string) {
        let url;
        if (action == '') {
            url = controller;
        } else {
            url = controller + '/' + action;
        }

        return this._http.get(this.apiLoc + controller + '/' + action)
            // ...and calling .json() on the response to return data
            .map(response => response.json())
            //...errors if any
            .do(data => console.log('server data for /api/' + url + ':', data))
            .catch(this._serverError);
    }
}
