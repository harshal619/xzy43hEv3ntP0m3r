import { Component } from '@angular/core';
import { NavController, NavParams ,ViewController,ModalController} from 'ionic-angular';

import { eventFiltersDetail } from '../eventFiltersDetail/eventFiltersDetail';

@Component({
  selector: 'page-eventFilters',
  templateUrl: 'eventFilters.html'
})


export class eventFilters {
  
  categories:{key:string,value:string,selected:boolean}[]=[];
  locationList:{key:string,value:string,selected:boolean}[]=[];
    filterArray:{key:string,value:string,selected:boolean}[]=[];

    selectedValues:{}[]=[];
    categoryHide:boolean;
  constructor(public navCtrl: NavController, public navParams:NavParams,public viewCtrl:ViewController,
  public modalCtrl:ModalController) {


    this.filterArray.push({key:"C1",value:"Location",selected:false});
    this.filterArray.push({key:"C2",value:"Category",selected:false});
  };
ionViewDidLoad(){
    console.log(this.navParams.data);



    this.navParams.data.forEach(element => {
        
        var categoryID = element.categoryID;
        var location = element.eventLocation;

        this.categories.push({key:categoryID,value:"UG/MBA/MS",selected:false});
        this.locationList.push({key:location,value:location,selected:false});
    });
};



locationClick(){   
       
    let modal= this.modalCtrl.create(eventFiltersDetail,this.locationList);
    
    modal.onDidDismiss((data)=>{
      data.forEach(element => {
        
        var selected = element.selected;
        var key = element.key;
        if(selected==true){
            this.selectedValues.push({"column":"Location","value":key})
        }
    });
    });
    modal.present();
};

categoryClick(){
let modal= this.modalCtrl.create(eventFiltersDetail,this.categories);
    
    modal.onDidDismiss((data)=>{
      data.forEach(element => {
        
        var selected = element.selected;
        var key = element.key;
        if(selected==true){
            this.selectedValues.push({"column":"Category","value":key})
        }
    });
    })
    modal.present();
    
};

dateClick(){
    alert("date");
};

closeModal(){
    this.viewCtrl.dismiss();
};  

applyFilter(){
    this.viewCtrl.dismiss(this.selectedValues);
}
}
