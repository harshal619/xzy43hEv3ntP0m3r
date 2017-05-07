import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AngularFireDatabase,FirebaseListObservable} from 'angularfire2/database';

@Component({
  selector: 'page-agentDetail',
  templateUrl: 'agentDetail.html'
})

export class AgentDetailPage {
  
  agentId="rvar";
  agentName=String;
  items : FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, angFire: AngularFireDatabase) {
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
  };
}
