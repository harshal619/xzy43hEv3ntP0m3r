import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NativeStorage } from 'ionic-native';

@NgModule({
  declarations: [
    EventService,
  ],
  imports: [
    IonicPageModule.forChild(EventService),
  ],
  exports: [
    EventService
  ]
})
export class EventService{
    private events:{
      eventId: string,
    title: string,
    eventDate: string,
    eventTime: string,
    eventLocation: string,
    eventCity:string,

    agentID: string,
    categoryID:string,
    attendingFlag:boolean,
    fees:PaymentCurrencyAmount,
    userId:string,
  }[] = [];
    
    addEvent(event: {eventId: string,
    title: string,
    eventDate: string,
    eventTime: string,
    eventLocation: string,
    eventCity:string,

    agentID: string,
    categoryID:string,
    attendingFlag:boolean,
    fees:PaymentCurrencyAmount,
    userId:string,
  }){
        this.events.push(event);
    }

    getEvents(){
        return this.events.slice();
    }

    

    loadNativeEvents(){
      NativeStorage.getItem('events')
    .then(function (data){
      var storedEvents = JSON.parse(data);
      alert(storedEvents);
      this.events = storedEvents;
    }, function(error){
      console.log(error);
      alert(error);
    });
    }

    setEvents(events2){
      this.events = events2;
      // let tempEvent = {eventId: "E1", title: "IT Post Grad",agent: "welingkar",eventDate: "17/05/2017", eventTime: "02:30:00",eventLocation: "Mumbai"};
      // this.events.push(tempEvent);
      // let tempEvent2 = {eventId: "E2", title: "MBA Marketing",agent: "welingkar",eventDate: "17/05/2017", eventTime: "02:30:00",eventLocation: "Mumbai"};
      // this.events.push(tempEvent2);
      // let tempEvent3 = {eventId: "E3", title: "Abroad courses",agent: "welingkar",eventDate: "17/05/2017", eventTime: "02:30:00",eventLocation: "Mumbai"};
      // this.events.push(tempEvent3);
    }
}

