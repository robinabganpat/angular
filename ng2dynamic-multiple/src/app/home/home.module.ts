import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing';

@NgModule({
    imports: [
        HomeRoutingModule,
        FormsModule
    ],
    declarations: [
        HomeComponent
    ]
})
export class HomeModule { }
