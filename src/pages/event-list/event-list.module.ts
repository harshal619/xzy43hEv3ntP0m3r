import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventList } from './event-list';

@NgModule({
  declarations: [
    EventList,
  ],
  imports: [
    IonicPageModule.forChild(EventList),
  ],
  exports: [
    EventList
  ]
})
export class EventListModule {
  
}
