import { Component, Injector } from '@angular/core';
import { BaseComponent } from "models/BaseComponent";

@Component({
    selector: 'app-hl-chart',
    templateUrl: './hl-chart.component.html',
    styleUrls: ['./hl-chart.component.css']
})
export class HlChartComponent extends BaseComponent {
    options: Object;
    randomData: number[] = [
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10)
    ];
    graphName: string;

    onChange(): void {
        //this.options['title'].text = this.graphName;
        //console.log(this.graphName);
    }

    constructor(private injector: Injector) {
        super();

        //Get the Title for the chart from the options
        this.graphName = this.injector.get('chartTitle', 'oihweoifhoewihf');
        
        this.options = {
            title: { text: this.graphName },
            series: [{
                data: this.randomData
            }]
        };
    }

}
