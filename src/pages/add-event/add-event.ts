import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventService } from '../../services/events.service';
import { NativeStorage } from 'ionic-native';
import { Storage } from '@ionic/storage';

import {AngularFireDatabase,FirebaseListObservable} from 'angularfire2/database';

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
  allEvents:{eventId: string, title: string,agentID: string,eventDate: string, 
    eventTime: string,eventLocation: string,eventCity:string,
  categoryID:string,attendingFlag:boolean,fees:PaymentCurrencyAmount,userId:string
}[] = [];

  private events = {eventId: "", title: "",agentID: "",eventDate: "", 
  eventTime: "",eventLocation: "",eventCity:"",
  categoryID:"",attendingFlag:false,fees:0.00,userId:""};
 
 
  eventsFirebase : FirebaseListObservable<any[]>;
  agentsFirebase : FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams,public EventService: EventService,
  public storage: Storage,angFire: AngularFireDatabase) {
    
    this.eventsFirebase = angFire.list("/Tables/Events");   
    this.agentsFirebase = angFire.list("/Tables/Agents"); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEventPage');
  }

  onAddEvent(value: {eventName: string,eventLocation: string,agentName: string,eventDate: string,eventTime: string,eventCity: string,eventCategory:string
  }){
    
    this.events.title = value.eventName;
    this.events.eventLocation = value.eventLocation;
    this.events.agentID = value.agentName;
    this.events.eventDate = value.eventDate;
    this.events.eventTime = value.eventTime;
    
    this.events.attendingFlag =false;
    this.events.eventCity=value.eventCity;
    this.events.fees=0.00;
    this.events.categoryID=value.eventCategory;
    this.events.userId="";

    this.EventService.addEvent(this.events);

    // ********commented by roshan*****
    // this.allEvents = this.EventService.getEvents();
    // this.storage.set('events', JSON.stringify(this.allEvents));
    // this.navCtrl.pop();



    // already comment code
    // let env = this;
    // NativeStorage.setItem('events', {
    //         events:JSON.stringify(this.allEvents)
    //       })
    //       .then(function(){
    //         env.navCtrl.pop();
    //       }, function (error) {
    //         console.log(error);
    //       })




    // ****************add event in firebase****************************

    this.eventsFirebase.push(this.events);
  }

}
