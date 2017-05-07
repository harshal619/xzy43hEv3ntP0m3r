import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {AngularFireDatabase,FirebaseListObservable} from 'angularfire2/database';


@Component({
  selector: 'page-agent',
  templateUrl: 'agent.html'
})




export class AgentPage {
  
  items : FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, angFire: AngularFireDatabase) {
      this.items = angFire.list("/Tables/Agents");
  };
  addAgent(){
    //   this.items.push({
    //         agentID: "A1",
    //         agentName:"Roshan"
    //   });
  };
}
