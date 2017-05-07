import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserModel } from './user.model';
import { NativeStorage } from 'ionic-native';
import { HomePage } from '../home/home';
import { AddEventPage } from '../add-event/add-event';
import { EventService } from '../../services/events.service';
import { GooglePlus } from '@ionic-native/google-plus';
import { Storage } from '@ionic/storage';

import {AngularFireDatabase,FirebaseListObservable} from 'angularfire2/database';

/**
 * Generated class for the EventList page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-event-list',
  templateUrl: 'event-list.html',
})
export class EventList {
  userModel: UserModel = new UserModel();
  events:{
    eventId: string,
    title: string,
    eventDate: string,
    eventTime: string,
    eventLocation: string,
    eventCity:string,

    agent: string,
    categoryID:string,
    attendingFlag:boolean,
    fees:PaymentCurrencyAmount,
    userId:string,

  }[] = [];


  eventsFirebase : FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams,private eventService: EventService,
   userModel: UserModel, public googlePlus: GooglePlus, public storage: Storage,angFire: AngularFireDatabase) {
  

      this.eventsFirebase = angFire.list("/Tables/Events");
}

  ionViewDidLoad() {
    // this.eventService.loadNativeEvents();
    // this.eventService.setEvents();
    // alert("native events loaded");
    console.log('ionViewDidLoad EventList');
  }

  ionViewWillEnter(){
    // alert("getting events");
    this.events = this.eventService.getEvents();
    // alert(JSON.stringify(this.events));
  }

  ionViewCanEnter(){


    // this.eventsFirebase.subscribe((_items)=> {
    //         this.events = [];
    //         _items.forEach(item => {
    //             var tempEventId=item.eventID;
    //             var tempAgentId=item.agentId;
    //             var tempEventTitle=item.eventTitle;
    //             this.events.push(item);                
    //         })
    //     });  

    let env = this;
    NativeStorage.getItem('user')
    .then(function (data){
      env.userModel = {
        name: data.name,
        email: data.email,
        picture: data.picture
      };
    }, function(error){
      console.log(error);
    });

    this.storage.get('events').then((val) => {
         var storedEvents = JSON.parse(val);
         if(storedEvents != null){
          env.eventService.setEvents(storedEvents);
          env.events = this.eventService.getEvents();
         }
       })
  }

  doGoogleLogout(){
    let nav = this.navCtrl;
    this.googlePlus.logout()
    .then(function (response) {
      NativeStorage.remove('user');
      nav.push(HomePage);
    },function (error) {
      console.log(error);
    })
  }

  addEvent(){
    let nav = this.navCtrl;
    nav.push(AddEventPage);
  }

}
