import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventService } from '../../services/events.service';
import { NativeStorage } from 'ionic-native';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the AddEventPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-event',
  templateUrl: 'add-event.html',
})
export class AddEventPage {
  allEvents:{eventId: string, title: string,agent: string,eventDate: string, 
    eventTime: string,eventLocation: string,eventCity:string,
  categoryID:string,attendingFlag:boolean,fees:PaymentCurrencyAmount,userId:string
}[] = [];

  private events = {eventId: "", title: "",agent: "",eventDate: "", 
  eventTime: "",eventLocation: "",eventCity:"",
  categoryID:"",attendingFlag:false,fees:0.00,userId:""};
 

  constructor(public navCtrl: NavController, public navParams: NavParams,public EventService: EventService,public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEventPage');
  }

  onAddEvent(value: {eventName: string,eventLocation: string,agentName: string,eventDate: string,eventTime: string,eventCity: string,eventCategory:string
  }){
    this.events.title = value.eventName;
    this.events.eventLocation = value.eventLocation;
    this.events.agent = value.agentName;
    this.events.eventDate = value.eventDate;
    this.events.eventTime = value.eventTime;
    
    this.events.attendingFlag =false;
    this.events.eventCity=value.eventCity;
    this.events.fees=0.00;
    this.events.categoryID=value.eventCategory;
    this.events.userId="";

    this.EventService.addEvent(this.events);

    this.allEvents = this.EventService.getEvents();

    // let env = this;

    this.storage.set('events', JSON.stringify(this.allEvents));
    this.navCtrl.pop();
    // NativeStorage.setItem('events', {
    //         events:JSON.stringify(this.allEvents)
    //       })
    //       .then(function(){
    //         env.navCtrl.pop();
    //       }, function (error) {
    //         console.log(error);
    //       })
  }

}
