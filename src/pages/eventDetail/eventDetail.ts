import { Component } from '@angular/core';
import { NavController, NavParams ,ViewController,ModalController} from 'ionic-angular';
import {AngularFireDatabase,FirebaseListObservable} from 'angularfire2/database';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-eventDetail',
  templateUrl: 'eventDetail.html'
})

export class eventDetail {
  
    constructor(public navCtrl: NavController, public navParams:NavParams,public viewCtrl:ViewController,
        public modalCtrl:ModalController){
    
    };
    
    ionViewDidLoad(){
        console.log(this.navParams.data);
    };
}
