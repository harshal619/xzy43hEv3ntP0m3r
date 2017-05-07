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
  allEvents:{eventId: string, title: string,agent: string,eventDate: string, eventTime: string,eventLocation: string}[] = [];
  private events = {eventId: "", title: "",agent: "",eventDate: "", eventTime: "",eventLocation: ""};
  constructor(public navCtrl: NavController, public navParams: NavParams,public EventService: EventService,public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEventPage');
  }

  onAddEvent(value: {eventName: string,eventLocation: string,agentName: string,eventDate: string,eventTime: string}){
    this.events.title = value.eventName;
    this.events.eventLocation = value.eventLocation;
    this.events.agent = value.agentName;
    this.events.eventDate = value.eventDate;
    this.events.eventTime = value.eventTime;

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
