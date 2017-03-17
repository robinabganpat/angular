import { Component, Injector } from '@angular/core';
import { BaseComponent } from "models/BaseComponent";

@Component({
    selector: 'hello-world',
    templateUrl: './hello-world.component.html'
})
export default class HelloWorldComponent extends BaseComponent {
    balbal = "";

    constructor(private injector: Injector) {
        super();
        let a = this.injector.get('balbal');
        if (a != null) {
            this.balbal = a;
        }
    }
}
