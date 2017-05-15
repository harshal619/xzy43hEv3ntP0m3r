import { Component } from '@angular/core';
import { NavController, NavParams ,ViewController,ModalController} from 'ionic-angular';
import {AngularFireDatabase,FirebaseListObservable} from 'angularfire2/database';
import { AlertController } from 'ionic-angular';
import * as firebase from 'firebase';

@Component({
  selector: 'page-eventDetail',
  templateUrl: 'eventDetail.html'
})

export class eventDetail {
  
    private events : {eventId: "", title: "",agentID: "",eventDate: "", 
  eventTime: "",eventLocation: "",eventCity:"",photoUrl:"",
  categoryID:"",attendingFlag:false,fees:0.00,userId:"",agentName:string,categoryName:""}[]=[];

  agents=[];

    constructor(public navCtrl: NavController, public navParams:NavParams,public viewCtrl:ViewController,
        public modalCtrl:ModalController){
    
    var that=this;
    firebase.database().ref('Tables/Agents')
    .orderByChild('agentID')
    .once('value', function (snapshot) {
        console.log(snapshot.val());
        for(var key in snapshot.val()){
          that.agents.push(snapshot.val()[key]);
        }

        that.events.forEach(element => {
            var agentID = element.agentID;
            var agentName="Error";
            that.agents.forEach(element => {
                var loopAgentID = element.agentID;

                if(agentID==loopAgentID){
                    agentName=element.agentName;
                }
            });
            element.agentName=agentName;
        });
    });
    };

    ionViewDidLoad(){
        console.log(this.navParams.data);
        this.events.push(this.navParams.data);
    };
}
