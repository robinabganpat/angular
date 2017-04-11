import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ApplicationDto } from 'models/ApplicationDto';
import { AppBaseService } from "services/app-base.service";

@Injectable()
export class ApplicationService extends AppBaseService {

    constructor(_http: Http) {
        super(_http);
     }

    private applicationsUrl = 'http://localhost:46768/api/applications';

    // Calls GetApplications api. Returns Observables.
    // Controller might want to request something, use the main API Call environment for that.
    getApplications() {
        return super.sendGet('applications', '');
    }
}
