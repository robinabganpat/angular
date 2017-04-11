import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ContentDto } from 'models/ContentDto';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import { AppBaseService } from "services/app-base.service";

@Injectable()
export class ContentService extends AppBaseService {
    constructor(_http: Http) {
        super(_http);
    }

    private contentsUrl = 'http://localhost:46768/api/contents';

    getContents(userId: number) {
        return super.sendGet('contents', 'GetContentsForUser?userId=' + userId);
    }

    updateContent(contentDto: ContentDto): void {
        
    }
}
