import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

const routes: Routes = [
    //   { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
    { path: 'home', loadChildren: './home/home.module#HomeModule' },

    //   { path: 'contacts', loadChildren: './contacts/contacts.module#ContactsModule' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
