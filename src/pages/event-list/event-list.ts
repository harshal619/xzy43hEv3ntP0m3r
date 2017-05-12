import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ModalController } from 'ionic-angular';
import { UserModel } from './user.model';
import { NativeStorage } from 'ionic-native';
import { HomePage } from '../home/home';
import { AddEventPage } from '../add-event/add-event';
import { EventService } from '../../services/events.service';
import { GooglePlus } from '@ionic-native/google-plus';
import { Storage } from '@ionic/storage';

import {AngularFireDatabase,FirebaseListObservable} from 'angularfire2/database';
import * as firebase from 'firebase';

import { eventFilters } from '../eventFilters/eventFilters';
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
    eventId: string,title: string,eventDate: string,eventTime: string,eventLocation: string,eventCity:string,
    agentID: string,categoryID:string,attendingFlag:boolean,fees:PaymentCurrencyAmount,userId:string,
  }[] = [];

  backupEvents:{
    eventId: string,title: string,eventDate: string,eventTime: string,eventLocation: string,eventCity:string,
    agentID: string,categoryID:string,attendingFlag:boolean,fees:PaymentCurrencyAmount,userId:string,
  }[] = [];

  listFilters:{}[]=[];
  emailId:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,private eventService: EventService,
   public userModel1: UserModel, public googlePlus: GooglePlus, public storage: Storage,angFire: AngularFireDatabase,
   public modalCtrl :ModalController) {
  
    this.emailId=userModel1.email;
      // this.eventsFirebase = angFire.list("/Tables/Events");
//  this.eventsFirebase;
    
}

  ionViewDidLoad() {
    // this.eventService.loadNativeEvents();
    // this.eventService.setEvents();
    // alert("native events loaded");
    console.log('ionViewDidLoad EventList');
  }

  ionViewWillEnter(){
    // alert("getting events");
    // this.events = this.eventService.getEvents();
    // alert(JSON.stringify(this.events));
  }


  ionViewCanEnter(){
// alert("ionviecan enter");
    // fetch values from firebase database...
    var that=this;
    this.events=[];
    
    // alert(this.userModel.emailId);
    // alert(this.userModel1.email);
    
    firebase.database().ref('Tables/Events')
    .orderByChild('userId')
    .startAt(this.emailId)//emailId...
    .endAt(this.emailId)
    .once('value', function (snapshot) {
        console.log(snapshot.val());
        for(var key in snapshot.val()){
          that.events.push(snapshot.val()[key]);
        }

        that.backupEvents=JSON.parse(JSON.stringify(that.events));
    });

// // ****code commented by roshan**********************
    // let env = this;
    // NativeStorage.getItem('user')
    // .then(function (data){
    //   env.userModel = {
    //     name: data.name,
    //     email: data.email,
    //     picture: data.picture
    //   };
    // }, function(error){
    //   console.log(error);
    // });

    // this.storage.get('events').then((val) => {
    //      var storedEvents = JSON.parse(val);
    //      if(storedEvents != null){
    //       env.eventService.setEvents(storedEvents);
    //       env.events = this.eventService.getEvents();
    //      }
    //    })
  }

  addEvent(){
    let nav = this.navCtrl;
    nav.push(AddEventPage);
  }
  filterClick(){
    let modal= this.modalCtrl.create(eventFilters,this.backupEvents);
    
    this.events=JSON.parse(JSON.stringify(this.backupEvents));
    modal.onDidDismiss((data)=>{
      if(data==undefined){
          this.events=JSON.parse(JSON.stringify(this.backupEvents));
      }else{
        this.events=[];
        var columnLocation=[];
        var columnCategory=[];
        var columnDate=[];
        var tempEvents=[];
        data.forEach(element => {
        
        var column = element.column;
        var value = element.value;
        
        if(column=="eventLocation"){
          columnLocation.push(value);
        }else if(column=="categoryID"){
          columnCategory.push(value);
        }
        this.listFilters.push({"column":column,"value":value});
     });
      
      if(columnLocation!=[] && columnCategory!=[]){
      columnLocation.forEach(item=>{
            this.backupEvents.filter((test)=>{
                if(test["eventLocation"]==item){
                    tempEvents.push(test);
                }
            });
      });

      columnCategory.forEach(item=>{
          tempEvents.filter((test)=>{
              if(test["categoryID"]==item){
                  this.events.push(test);
              }
          });
      });
      }else if(columnLocation==[] && columnCategory!=[]){

        columnCategory.forEach(item=>{
            this.backupEvents.filter((test)=>{
                if(test["categoryID"]==item){
                    this.events.push(test);
                }
            });
        });
    }else{
columnLocation.forEach(item=>{
            this.backupEvents.filter((test)=>{
                if(test["eventLocation"]==item){
                    this.events.push(test);
                }
            });
        });

    }
      }
    });
    
    modal.present();
    // this.navCtrl.push(eventFilters,this.events);  
  }
  addAttending(event){
    var previousAttendingFlag=event.attendingFlag;
    var newAttendingFlag=!previousAttendingFlag;

    var eventId=event.eventId;

    event.attendingFlag=newAttendingFlag;
    var updates = {};
  updates['/Tables/Events/' + eventId] = event;

    firebase.database().ref().update(updates);

  }
}
