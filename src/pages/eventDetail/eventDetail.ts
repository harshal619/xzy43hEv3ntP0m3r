import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AngularFireDatabase,FirebaseListObservable} from 'angularfire2/database';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-eventDetail',
  templateUrl: 'eventDetail.html'
})

export class eventDetail {
  
  constructor(public navCtrl: NavController, angFire: AngularFireDatabase,public alertCtrl: AlertController) {
    
  };
}
