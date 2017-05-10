import { Component } from '@angular/core';
import { NavController, NavParams ,ViewController,ModalController} from 'ionic-angular';

import { eventFiltersDetail } from '../eventFiltersDetail/eventFiltersDetail';

@Component({
  selector: 'page-eventFilters',
  templateUrl: 'eventFilters.html'
})


export class eventFilters {
  
  categories:{key:string,value:string,selected:boolean}[]=[];
  locationList:{key:string,value:string}[]=[];
    
    categoryHide:boolean;
  constructor(public navCtrl: NavController, public navParams:NavParams,public viewCtrl:ViewController,
  public modalCtrl:ModalController) {

  };
ionViewDidLoad(){
    console.log(this.navParams.data);

    this.navParams.data.forEach(element => {
        
        var categoryID = element.categoryID;
        var location = element.eventLocation;

        this.categories.push({key:categoryID,value:"UG/MBA/MS",selected:false});
        this.locationList.push({key:location,value:location});
    });
};



locationClick(){   
       
    let modal= this.modalCtrl.create(eventFiltersDetail,this.locationList);
    
    modal.onDidDismiss((data)=>{
      console.log("dismiss");
    })
    modal.present();
};

categoryClick(){
    this.categoryHide=true;
    alert("category"); 
};

dateClick(){
    alert("date");
};

closeModal(){
    this.viewCtrl.dismiss();
};  
}
