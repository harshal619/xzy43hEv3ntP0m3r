import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { NativeStorage } from 'ionic-native';
import { EventList } from '../event-list/event-list';
import { GooglePlus } from '@ionic-native/google-plus';
import * as firebase from 'firebase';
// import { AngularFire } from 'angularfire2';
// import firebase from 'firebase';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireAuth } from 'angularfire2/auth';


@Component({ 
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  fireAuth = firebase.auth();
  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public googlePlus: GooglePlus, public afa: AngularFireAuth) {

  }

  doGoogleLogin(){
    // this.afa.
    let nav = this.navCtrl;
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    let that = this;
    loading.present();
    this.googlePlus.login({
      'webClientId':'110697097203-hnjqc9k3r7id7lclu3lbn8rt5dvn98kt.apps.googleusercontent.com',
      'offline': true
    })
    .then(function (success) {
      const firecreds = firebase.auth.GoogleAuthProvider.credential(success.idToken);
      const givenName = success.givenName;
      const familyName = success.familyName;
      const full_name = givenName+" "+familyName;
      const profile_picture = success.imageUrl;
      const google_email = success.email;
        that.fireAuth.signInWithCredential(firecreds).then((res) => {
          
          NativeStorage.setItem('user', {
            name: full_name,
            email: google_email,
            picture: profile_picture
          })
          .then(function(){
            that.navCtrl.setRoot(EventList);
            that.navCtrl.push(EventList);
            loading.dismiss();
          }, function (error) {
            console.log(error);
          })

        }).catch((err) => {
          alert('Firebase auth failed' + err);
          loading.dismiss();
        })
          // const full_name = that.user.social.google.data.full_name;
          // const profile_picture = that.user.social.google.data.profile_picture;
          // const google_email = that.user.social.google.data.email;

          // that.googleAuth.storeToken;

          // NativeStorage.setItem('user', {
          //   name: full_name,
          //   email: google_email,
          //   picture: profile_picture
          // })
          // .then(function(){
          //   nav.push(EventList);
          // }, function (error) {
          //   console.log(error);
          // })
    }, function (error) {
      loading.dismiss();
    });
  }

  doGoogleLogout(){
    this.googlePlus.logout();
  }

}
