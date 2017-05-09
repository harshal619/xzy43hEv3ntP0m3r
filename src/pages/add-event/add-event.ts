import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { EventService } from '../../services/events.service';
import { NativeStorage } from 'ionic-native';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';

import {AngularFireDatabase,FirebaseListObservable} from 'angularfire2/database';
import * as firebase from 'firebase';
import {AutocompletePage} from '../autocomplete/autocomplete';

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
 
 
  agentsFirebase : FirebaseListObservable<any[]>;
  primaryKeysFirebase : FirebaseListObservable<any[]>;

  categories:{ID:string,Name:string}[]=[];

   
  tempRef; 
  address; 
  placesService:any;
  map: any;
  placedetails: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public EventService: EventService,
  public storage: Storage,public angFire: AngularFireDatabase,public alertCtrl: AlertController,public modalCtrl: ModalController) {
    
    this.address = {
      place: ''
    };

    // this.eventsFirebaseDetail = angFire.list("/Tables/Events");   

    this.agentsFirebase = angFire.list("/Tables/Agents"); 
    this.primaryKeysFirebase = angFire.list("/Tables/PrimaryKeys"); 

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
    

    var key;
    var that=this;
    firebase.database().ref('Tables/PrimaryKeys')
    .orderByChild('TableName')
    .startAt('Events')
    .endAt('Events')
    .once('value', function (snapshot) {
        console.log(snapshot.val().Events.NextEventID);
        key=snapshot.val().Events.NextEventID;

        var nextKey=parseInt(key)+1;
        var primaryKeysRef=myRef.child("/Tables/PrimaryKeys");
        primaryKeysRef.child('Events').set({TableName:'Events',NextEventID:nextKey});

    // ******line to add into dataBase
        
        var eventsRef=myRef.child("/Tables/Events");
        var newKey="E"+key;
        that.events.eventId=newKey;
        eventsRef.child('E'+key).set(that.events);

            let alert = that.alertCtrl.create({
          title: 'Alert!',
          subTitle: 'New Event Added!',
          buttons: ['OK']
        });
        alert.present();
    });

  }

  showAddressModal(){
    // this.reset();
    //     // show modal|
    //     let modal = this.modalCtrl.create(ModalAutocompleteItems);
    //     modal.onDidDismiss(data => {
    //         console.log('page > modal dismissed > data > ', data);
    //         if(data){
    //             this.address.place = data.description;
    //             // get details
    //             this.getPlaceDetail(data.place_id);
    //         }                
    //     })
    //     modal.present();

    let modal = this.modalCtrl.create(AutocompletePage);
    let me = this;
    modal.onDidDismiss(data => {
      this.address.place = data;
    });
    modal.present();
  }

  private reset() {
        this.address.place = '';
        this.address.set = false;
    }

    private getPlaceDetail(place_id:string):void {
        var self = this;
        var request = {
            placeId: place_id
        };
        this.placesService = new google.maps.places.PlacesService(this.map);
        this.placesService.getDetails(request, callback);
        function callback(place, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                console.log('page > getPlaceDetail > place > ', place);
                // set full address
                self.placedetails.address = place.formatted_address;
                self.placedetails.lat = place.geometry.location.lat();
                self.placedetails.lng = place.geometry.location.lng();
                for (var i = 0; i < place.address_components.length; i++) {
                    let addressType = place.address_components[i].types[0];
                    let values = {
                        short_name: place.address_components[i]['short_name'],
                        long_name: place.address_components[i]['long_name']
                    }
                    if(self.placedetails.components[addressType]) {
                        self.placedetails.components[addressType].set = true;
                        self.placedetails.components[addressType].short = place.address_components[i]['short_name'];
                        self.placedetails.components[addressType].long = place.address_components[i]['long_name'];
                    }                                     
                }                  
                // set place in map
                // self.map.setCenter(place.geometry.location);
                // self.createMapMarker(place);
                // populate
                self.address.set = true;
                // console.log('page > getPlaceDetail > details > ', self.placedetails);
            }else{
                console.log('page > getPlaceDetail > status > ', status);
            }
        }
    }


}
