import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserModel } from './user.model';
import { NativeStorage } from 'ionic-native';
import { HomePage } from '../home/home';
import { AddEventPage } from '../add-event/add-event';
import { EventService } from '../../services/events.service';
import { GooglePlus } from '@ionic-native/google-plus';
import { Storage } from '@ionic/storage';

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
  events:{eventId: string, title: string,agent: string,eventDate: string, eventTime: string,eventLocation: string}[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,private eventService: EventService, userModel: UserModel, public googlePlus: GooglePlus, public storage: Storage) {
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
