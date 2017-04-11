import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
// import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';

import { NavigationModule } from "../views/common/navigation/navigation.module";
import { FooterModule } from "../views/common/footer/footer.module";
import { TopnavbarModule } from "../views/common/topnavbar/topnavbar.module";

@NgModule({
    imports: [
        AppRoutingModule,
        BrowserModule,
        FormsModule,
        HttpModule,

        NavigationModule,
        FooterModule,
        TopnavbarModule,
    ],
    providers: [
    ],
    declarations: [
        AppComponent,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
