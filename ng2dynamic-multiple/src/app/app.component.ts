
import { Component, AfterViewChecked } from '@angular/core';
import { ContentService } from "services/content.service";
import { ApplicationService } from "services/application.service";
// import { correctHeight, detectBody } from './app.helpers';

// // Core vendor styles
// import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
// import '../../node_modules/font-awesome/css/font-awesome.css'
// import '../../node_modules/animate.css/animate.min.css'

// // Main Inspinia CSS files
// import '../../src/assets/styles/style.css'

// declare var jQuery: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [ContentService, ApplicationService]
})
export class AppComponent {
    logo = '/assets/img/hl-logo.png';
    // ngAfterViewInit() {
    //     // Run correctHeight function on load and resize window event
    //     jQuery(window).bind("load resize", function () {
    //         correctHeight();
    //         detectBody();
    //     });

    //     // Correct height of wrapper after metisMenu animation.
    //     jQuery('.metismenu a').click(() => {
    //         setTimeout(() => {
    //             correctHeight();
    //         }, 300)
    //     });
    // }
}
