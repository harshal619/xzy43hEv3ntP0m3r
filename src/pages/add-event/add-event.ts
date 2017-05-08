import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventService } from '../../services/events.service';
import { NativeStorage } from 'ionic-native';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';

import {AngularFireDatabase,FirebaseListObservable} from 'angularfire2/database';
import * as firebase from 'firebase';

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
 
 
  eventsFirebaseDetail : FirebaseListObservable<any[]>;
  agentsFirebase : FirebaseListObservable<any[]>;


  categories:{ID:string,Name:string}[]=[];
  tempRef;  

  constructor(public navCtrl: NavController, public navParams: NavParams,public EventService: EventService,
  public storage: Storage,angFire: AngularFireDatabase,public alertCtrl: AlertController) {
    
    this.eventsFirebaseDetail = angFire.list("/Tables/Events");   
    this.agentsFirebase = angFire.list("/Tables/Agents"); 
    

    this.categories.push({ID:"C1",Name:"UG"});
    this.categories.push({ID:"C2",Name:"UG/MBA/MS"});
    // this.categories.push({ID:"C3",Name:"UG"});
    // this.categories.push({ID:"C4",Name:"UG"});
    // this.categories.push({ID:"C5",Name:"UG"});
    // this.categories.push({ID:"C6",Name:"UG"});

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


    // ********commented by roshan*****
    // this.EventService.addEvent(this.events);
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



    var myRef=firebase.database().ref();
    var eventsRef=myRef.child("/Tables/Events");
    
    var length;
    this.eventsFirebaseDetail.subscribe((items)=>{
        length=items.length;
        length=length+1;
        this.events.eventId='E'+length;
    });
// ******line to add into dataBase
     
     eventsRef.child('E'+length).set(this.events);
    // ****************add event in firebase****************************
    
    // this.eventsFirebaseDetail.push(this.events);

    let alert = this.alertCtrl.create({
      title: 'Alert!',
      subTitle: 'New Event Added!',
      buttons: ['OK']
    });
    alert.present();
  }

}
