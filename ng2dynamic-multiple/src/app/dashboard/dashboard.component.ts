import { Component } from '@angular/core';
import { DynamicComponent } from './dynamic/dynamic.component';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent  {
    userId = 1;
    constructor() {
        
    }
}