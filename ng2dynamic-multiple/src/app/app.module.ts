import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

//Necessary for highcharts
import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
export function highchartsFactory() {
  return require('highcharts');
}

import { AppComponent } from './app.component';
import HelloWorldComponent from './hello-world/hello-world.component';
import DynamicComponent from './dynamic/dynamic.component';
import HlChartComponent from './hl-chart/hl-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    HelloWorldComponent,
    DynamicComponent,
    HlChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ChartModule
  ],
  providers: [
    {
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
