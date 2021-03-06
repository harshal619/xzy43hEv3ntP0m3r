import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GooglePlus } from '@ionic-native/google-plus';
// import { GoogleAuth, User } from '@ionic/cloud-angular';

import { NativeStorage } from 'ionic-native';

import { HomePage } from '../pages/home/home';
import { EventList } from '../pages/event-list/event-list';
import { AboutPage } from '../pages/about/about';
import { SettingPage } from '../pages/setting/setting';
import { AgentPage } from '../pages/agent/agent';
import { AgentDetailPage } from '../pages/agentDetail/agentDetail';
import { UserModel } from '../pages/event-list/user.model';
import { TabsPage } from '../pages/tabs/tabs';
import { userProfile } from '../pages/userProfile/userProfile';

import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng } from 'ionic-native';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public googlePlus: GooglePlus, public userModel:UserModel) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      let env = this;
        // user is previously logged and we have his data
        // we will let him access the app
      googlePlus.trySilentLogin({
        'webClientId':'110697097203-hnjqc9k3r7id7lclu3lbn8rt5dvn98kt.apps.googleusercontent.com',
        'offline': true
      })
      .then(function(data) {
        // env.nav.push(EventList);
        splashScreen.hide();
      }, function (error){
        // env.nav.push(HomePage);
        splashScreen.hide();
      });

      userModel.getUserFromDB();
      // env.nav.push(EventList);
      env.nav.push(TabsPage);

      statusBar.styleDefault();
    });
  }

   go_to_home(Page){
    // this.nav.push(HomePage);
    this.nav.setRoot(EventList);
  }
 
  go_to_about(){
    this.nav.push(AboutPage);  
  }
  go_to_setting(){
    this.nav.push(SettingPage);
  }
  go_to_logout(){
    // let nav = this.navCtrl;
    this.googlePlus.logout()
    .then(function (response) {
      NativeStorage.remove('user');
      this.nav.push(HomePage);
    },function (error) {
      console.log(error);
    })
  }
  go_to_userProfile(){
    this.nav.push(userProfile);
  }
}

