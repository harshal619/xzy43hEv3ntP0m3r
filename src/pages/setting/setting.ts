import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AgentPage } from '../agent/agent';
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html'
})


export class SettingPage {
  constructor(public navCtrl: NavController) {
      
      
  };

  agentClick(){   
    this.navCtrl.push(AgentPage);  
  };
  categoryClick(){
    // this.navCtrl.push(CategoryPage);  
  };

budgetClick(){
  alert("budget");
};
  
}
