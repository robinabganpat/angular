import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard.routing';

import { DynamicComponent } from './dynamic/dynamic.component';

import { HelloWorldComponent } from './hello-world/hello-world.component';
import { ChartModule } from 'angular2-highcharts';

import { HlChartComponent } from './hl-chart/hl-chart.component';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
export function highchartsFactory() {
    return require('highcharts');
}

@NgModule({
    imports: [
        DashboardRoutingModule,
        ChartModule,
        FormsModule
    ],
    declarations: [
        DashboardComponent,
        DynamicComponent,
        HelloWorldComponent,
        HlChartComponent
    ],
    providers: [
        {
            provide: HighchartsStatic,
            useFactory: highchartsFactory
        }
    ]
})
export class DashboardModule { }
