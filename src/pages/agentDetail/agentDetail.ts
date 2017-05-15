import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AngularFireDatabase,FirebaseListObservable} from 'angularfire2/database';

import { AlertController } from 'ionic-angular';
import * as firebase from 'firebase';

@Component({
  selector: 'page-agentDetail',
  templateUrl: 'agentDetail.html'
})

export class AgentDetailPage {
  
  agentId="rvar";
  agentName=String;
  items : FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, angFire: AngularFireDatabase,public alertCtrl: AlertController) {
      this.items = angFire.list("/Tables/Agents");    

      this.agentName=null;
      this.agentId="A"+1;
      
  };

  addAgent(){
    var agentId=this.agentId;
    var agentName=this.agentName;
        
    var myRef=firebase.database().ref();

    var key;
    var that=this;
    firebase.database().ref('Tables/PrimaryKeys')
    .orderByChild('TableName')
    .startAt('Agents')
    .endAt('Agents')
    .once('value', function (snapshot) {
        console.log(snapshot.val().Agents.NextAgentID);
        key=snapshot.val().Agents.NextAgentID;

        var nextKey=parseInt(key)+1;
        var primaryKeysRef=myRef.child("/Tables/PrimaryKeys");
        primaryKeysRef.child('Agents').set({TableName:'Agents',NextAgentID:nextKey});

    // ******line to add into dataBase
        
        var eventsRef=myRef.child("/Tables/Agents");
        var newKey="A"+key;
        
        eventsRef.child('A'+key).set({agentID:newKey,agentName:agentName});

          let alert = that.alertCtrl.create({
          title: 'Alert!',
          subTitle: 'New Agent Added!',
          buttons: ['OK']
        });
        alert.present();
    });
  };
}
