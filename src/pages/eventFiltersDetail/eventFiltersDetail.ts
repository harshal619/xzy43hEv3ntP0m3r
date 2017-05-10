import { Component } from '@angular/core';
import { NavController, NavParams ,ViewController} from 'ionic-angular';
@Component({
  selector: 'page-eventFiltersDetail',
  templateUrl: 'eventFiltersDetail.html'
})


export class eventFiltersDetail {
  
  detailFilterArray:{key:string,value:string}[]=[];
  
  constructor(public navCtrl: NavController, public navParams:NavParams,public viewCtrl:ViewController) {

  };
ionViewDidLoad(){
    console.log(this.navParams.data);

this.detailFilterArray=this.navParams.data;
    // this.navParams.data.forEach(element => {
        
    //     this.detailFilterArray.push({key:categoryID,value:"UG/MBA/MS"});
        
    // });
};
closeModal(){
    this.viewCtrl.dismiss();
};  
applyFilterDetail(){
  this.viewCtrl.dismiss();
};
}
