import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {AngularFireDatabase,FirebaseListObservable} from 'angularfire2/database';

import { AgentDetailPage } from '../agentDetail/agentDetail';

@Component({
  selector: 'page-agent',
  templateUrl: 'agent.html'
})




export class AgentPage {
  
  items : FirebaseListObservable<any[]>;
  parentScroll:any;
  headercontent:any;

  constructor(public navCtrl: NavController, angFire: AngularFireDatabase) {
      this.items = angFire.list("/Tables/Agents");
  };
  addAgent(){
      this.navCtrl.push(AgentDetailPage);  
  };

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
