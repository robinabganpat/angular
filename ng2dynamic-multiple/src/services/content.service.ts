import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ContentDto } from 'models/ContentDto';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ContentService {

    constructor(private http: Http) { }

    private contentsUrl = 'http://localhost:46768/api/contents'

    getContents(): Observable<ContentDto[]> {
        return this.http.get(this.contentsUrl)
            // ...and calling .json() on the response to return data
            .map(response => response.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));


    }

    getSimpleString(): Observable<string> {
        return this.http.get(this.contentsUrl + "/1")
            // ...and calling .json() on the response to return data
            .map(response => response)
            //...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }



}
