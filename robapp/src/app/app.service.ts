import { Http, Response, Headers } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Injectable } from "@angular/core";

@Injectable()
export class AppService {
    
    constructor(private http: Http)
    {

    }

    getVideoData(id: string): any {
        //let baseUrl: "https://www.youtube.com/oembed?url=http://www.youtube.com/watch?v=${id}format=json";
        let baseUrl: "https://www.youtube.com/oembed?url=http://www.youtube.com/watch?v=BR9h47Jtqyw&format=json";
        var result;

        this.http.get(baseUrl).map(res => res.json()).subscribe(result => {
            console.log(result);
        });
        return result;
    }
}