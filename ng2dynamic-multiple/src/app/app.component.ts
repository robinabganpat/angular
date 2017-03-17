import { Component, AfterViewChecked } from '@angular/core';
import HelloWorldComponent from './hello-world/hello-world.component';
import HlChartComponent from './hl-chart/hl-chart.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    componentDataLeft: [{ name: string, component: any, inputs: any }];
    componentDataRight: [{ name: string, component: any, inputs: any }];

    ngOnInit() {
        // componentData is passed to the dynamic component.
        // Imagine fetching the list of 'contents' here, passing them to the dynamic component to render empty shells
        // The components themselves should do a call to Web Api requesting 
        this.componentDataLeft = [
            {
                name: 'hl-chart',
                component: 'HlChartComponent',
                inputs: {
                    chartTitle: 'Marcieman'
                }
            },
            {
                name: 'hello-world',
                component: 'HelloWorldComponent',
                inputs: {
                    balbal: "Dynamic Hello World!"
                }
            }
        ]

        this.componentDataRight = [
            {
                name: 'hello-world',
                component: 'HelloWorldComponent',
                inputs: {
                    balbal: "RightHelloWorld"
                }
            },
            {
                name: 'hl-chart',
                component: 'HlChartComponent',
                inputs: {
                    chartTitle: 'Tisjeboy'
                }
            }
        ]
    }

    constructor() { }
}
