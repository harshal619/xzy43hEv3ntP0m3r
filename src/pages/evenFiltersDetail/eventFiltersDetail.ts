import { Component } from '@angular/core';
import { NavController, NavParams ,ViewController} from 'ionic-angular';
@Component({
  selector: 'page-eventFiltersDetail',
  templateUrl: 'eventFiltersDetail.html'
})


export class eventFiltersDetail {
  
  categories:{key:string,value:string}[]=[];
  locationList:{key:string,value:string}[]=[];
    
    categoryHide:boolean;
  constructor(public navCtrl: NavController, public navParams:NavParams,public viewCtrl:ViewController) {

  };
ionViewDidLoad(){
    console.log(this.navParams.data);

    this.navParams.data.forEach(element => {
        
        var categoryID = element.categoryID;
        var location = element.eventLocation;

        this.categories.push({key:categoryID,value:"UG/MBA/MS"});
        this.locationList.push({key:location,value:location});
    });
};
closeModal(){
    this.viewCtrl.dismiss();
};  
}
