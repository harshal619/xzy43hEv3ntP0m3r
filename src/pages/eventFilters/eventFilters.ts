import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
@Component({
  selector: 'page-eventFilters',
  templateUrl: 'eventFilters.html'
})


export class eventFilters {
  constructor(public navCtrl: NavController) {

  };


cityClick(){   
    
  alert("city");
};

categoryClick(){
  alert("category"); 
};

budgetClick(){
  alert("budget");
};
  
}
