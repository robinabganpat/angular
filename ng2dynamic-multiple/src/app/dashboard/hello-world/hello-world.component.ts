import { Component, Injector } from '@angular/core';
import { BaseComponent } from "models/BaseComponent";

@Component({
    selector: 'hello-world',
    templateUrl: './hello-world.component.html'
})
export class HelloWorldComponent extends BaseComponent {
    title = "default";

    constructor(private injector: Injector) {
        super();
        this.title = this.injector.get('helloWorld', 'No Injector.');
    }
}
