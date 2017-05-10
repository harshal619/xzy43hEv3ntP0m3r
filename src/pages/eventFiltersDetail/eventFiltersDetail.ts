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
};

closeModal(){
    this.navParams.data=this.detailFilterArray;
    this.viewCtrl.dismiss(this.navParams.data);
};  

applyFilterDetail(){
    
    this.navParams.data=this.detailFilterArray;
  this.viewCtrl.dismiss(this.navParams.data);
};

}
