import { NgModule } from '@angular/core';

import { ContactsRoutingModule } from './contacts.routing';

import { ContactsComponent }   from './contacts.component';

@NgModule({
  imports: [
    ContactsRoutingModule
  ],
  exports: [],
  declarations: [ContactsRoutingModule],
  providers: [],
})
export class AboutModule { }
