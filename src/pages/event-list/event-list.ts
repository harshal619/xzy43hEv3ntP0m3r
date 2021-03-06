import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams ,ModalController,Content } from 'ionic-angular';
import { UserModel } from './user.model';
import { NativeStorage } from 'ionic-native';
import { HomePage } from '../home/home';
import { AddEventPage } from '../add-event/add-event';
import { EventService } from '../../services/events.service';
import { GooglePlus } from '@ionic-native/google-plus';
import { Storage } from '@ionic/storage';

import {ElementRef,Renderer } from '@angular/core';

import {AngularFireDatabase,FirebaseListObservable} from 'angularfire2/database';
import * as firebase from 'firebase';

import { eventFilters } from '../eventFilters/eventFilters';
import { eventDetail } from '../eventDetail/eventDetail';
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

@ViewChild(Content) content: Content;
parentScroll:any;
  headercontent:any;

  //*******************
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
   public modalCtrl :ModalController,public myElement: ElementRef) {
  
  
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
  listItemClick(event){
    this.navCtrl.push(eventDetail,event);  
  }
  eventListScroll(){

    var input = document.getElementById('eventsheader');
    var eventsSubHeader = document.getElementById('eventSubHeader');
    // var input = document.getElementById('eventsheader');
    var parentScrollContent=eventsSubHeader.parentElement;

    var currentpoint=this.content.scrollTop;
    if(currentpoint>200){  
      var atr=input.getAttribute("class");
      if(atr.indexOf("hiddenBar")==-1){
        atr=atr+" hiddenBar";
      }
      input.setAttribute("class", atr);

      //***************************************/
      // var atr1=eventsSubHeader.getAttribute("class");
      // if(atr1.indexOf("hiddenSubHeaderBar")==-1){
      //   atr1=atr1+" hiddenSubHeaderBar";
      // }
      // eventsSubHeader.setAttribute("class", atr1);
      // ****************
      var atr2=parentScrollContent.getAttribute("class");
      if(atr2.indexOf("marginTop")==-1){
        atr2=atr2+" marginTop";
        
        this.parentScroll=parentScrollContent.getAttribute("style");
        parentScrollContent.setAttribute("class", atr2);
        // parentScrollContent.setAttribute("style", "");
      }
      
    }else{
      
      var atr=input.getAttribute("class");
      atr=atr.replace(" hiddenBar","");
      input.setAttribute("class",atr);
      
      //***************************************/
      // var atr1=eventsSubHeader.getAttribute("class");
      // atr1=atr1.replace(" hiddenSubHeaderBar","");
      // eventsSubHeader.setAttribute("class", atr1);


      //***************************************/
      var atr2=parentScrollContent.getAttribute("class");
      atr2=atr2.replace(" marginTop","");
      parentScrollContent.setAttribute("class", atr2);
      // parentScrollContent.setAttribute("style",this.parentScroll);
      // parentScrollContent.setAttribute("style","margin-top:44px");

    }
    // var endPoint=this.ionScroll.endPoint;
  }

  ionViewWillEnter() {
    console.log("I'm alive!");
    // document.querySelector(".mainPageHeader")['style'].display = 'flex';
    // document.querySelector(".mainPageHeader")['style'].animation = 'scrollTop 500ms forwards';
    var eventsheader = document.getElementById('eventsheader');
    var atr=eventsheader.getAttribute("class");
    atr=atr.replace(" hiddenBar","");
    eventsheader.setAttribute("class",atr);

    var eventsSubHeader = document.getElementById('eventSubHeader');
    var parentScrollContent=eventsSubHeader.parentElement;
    var atr2=parentScrollContent.getAttribute("class");
    atr2=atr2.replace(" marginTop","");
    parentScrollContent.setAttribute("class", atr2);
    parentScrollContent.setAttribute("style",this.parentScroll);
    parentScrollContent.setAttribute("style","margin-top:44px");
  }
  ionViewWillLeave() {
    // document.querySelector(".mainPageHeader")['style'].display = 'none';
    // document.querySelector(".mainPageHeader")['style'].animation = 'scrollTop 500ms forwards';
    // console.log("Looks like I'm about to leave :(");
    var eventsheader = document.getElementById('eventsheader');
    var atr=eventsheader.getAttribute("class");
      if(atr.indexOf("hiddenBar")==-1){
        atr=atr+" hiddenBar";
    }
    eventsheader.setAttribute("class", atr);

    var eventsSubHeader = document.getElementById('eventSubHeader');
    var parentScrollContent=eventsSubHeader.parentElement;
    var atr2=parentScrollContent.getAttribute("class");
      if(atr2.indexOf("marginTop")==-1){
        atr2=atr2+" marginTop";
        
        this.parentScroll=parentScrollContent.getAttribute("style");
        parentScrollContent.setAttribute("class", atr2);
        parentScrollContent.setAttribute("style", "");
      }
  }
}
