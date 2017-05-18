import { Component } from '@angular/core';
import { NavController, NavParams ,ViewController,ModalController} from 'ionic-angular';
import {AngularFireDatabase,FirebaseListObservable} from 'angularfire2/database';
import { AlertController } from 'ionic-angular';
import * as firebase from 'firebase';

@Component({
  selector: 'page-userProfile',
  templateUrl: 'userProfile.html'
})

export class userProfile {
  

    constructor(public navCtrl: NavController, public navParams:NavParams,public viewCtrl:ViewController,
        public modalCtrl:ModalController){
    
   
    };
}
