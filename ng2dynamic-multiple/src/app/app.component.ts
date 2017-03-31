import { Component, AfterViewChecked } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    componentData: [{ name: string, component: any, inputs: any }];

    ngOnInit() {
        // componentData is passed to the dynamic component.
        // Imagine fetching the list of 'contents' here, passing them to the dynamic component to render empty shells
        // The components themselves should do a call to Web Api requesting 
        this.componentData = [
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
    }

    constructor() { }
}
