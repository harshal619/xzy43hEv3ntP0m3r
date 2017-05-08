import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AngularFireDatabase,FirebaseListObservable} from 'angularfire2/database';

import { AlertController } from 'ionic-angular';
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
        
    this.items.push({
         agentID: agentId,
         agentName:agentName,
   });

   let alert = this.alertCtrl.create({
      title: 'Alert!',
      subTitle: 'New Agent Added!',
      buttons: ['OK']
    });
    alert.present();
  };
}
