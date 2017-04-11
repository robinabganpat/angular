import { Injectable } from '@angular/core';

import HelloWorldComponent from 'app/hello-world/hello-world.component';
import HlChartComponent from 'app/hl-chart/hl-chart.component';

@Injectable()
export class DynamicService {

    static getEntryComponents(): any[]  {
        return [
            HelloWorldComponent,
            HlChartComponent
        ];
    }
}