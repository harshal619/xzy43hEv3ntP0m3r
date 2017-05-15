import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { EventList } from '../pages/event-list/event-list';
import { AddEventPage } from '../pages/add-event/add-event';
import { AboutPage } from '../pages/about/about';
import { SettingPage } from '../pages/setting/setting';
import { AgentPage } from '../pages/agent/agent';
import { AgentDetailPage } from '../pages/agentDetail/agentDetail';
import { AutocompletePage } from '../pages/autocomplete/autocomplete';
import { eventFilters } from '../pages/eventFilters/eventFilters';
import { eventFiltersDetail } from '../pages/eventFiltersDetail/eventFiltersDetail';
import { eventDetail } from '../pages/eventDetail/eventDetail';
import { EventService } from '../services/events.service';
import { UserModel } from '../pages/event-list/user.model';

import { GooglePlus } from '@ionic-native/google-plus';

import {AngularFireModule} from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { IonicStorageModule } from '@ionic/storage';
import { GoogleMap, GoogleMapsEvent, GoogleMapsLatLng } from 'ionic-native';

// import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';

// Roshan's Config
export const config={
    apiKey: "AIzaSyA7Yz3ghJ-0JMoNxlGBV-Ig20cTWnV7YtI",
    authDomain: "eventtestproject.firebaseapp.com",
    databaseURL: "https://eventtestproject.firebaseio.com",
    projectId: "eventtestproject",
    storageBucket: "eventtestproject.appspot.com",
    messagingSenderId: "589957868091"
}
 
  // export const config = {
  //   apiKey: "AIzaSyCaY-s14DlDlKgfrTtSrtYx4jQVUvZ4I-0",
  //   authDomain: "eventpower-166715.firebaseapp.com",
  //   databaseURL: "https://eventpower-166715.firebaseio.com",
  //   projectId: "eventpower-166715",
  //   storageBucket: "eventpower-166715.appspot.com",
  //   messagingSenderId: "110697097203"
  // };

// const cloudSettings: CloudSettings = {
//   'core': {
//     'app_id': '6a98d2f4'
//   },
//   'auth': {
//     'google': {
//       'webClientId': '478858797882-dnednudedi8vh22u2po1q099boqvkkj1.apps.googleusercontent.com',
//       'scope': ["https://www.googleapis.com/auth/admin.directory.resource.calendar.readonly"]
//     }
//   }
// }

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    EventList,
    AddEventPage,
    AboutPage,
    SettingPage,
    AgentPage,
    AgentDetailPage,
    AutocompletePage,
    eventFilters,
    eventFiltersDetail,
    eventDetail
  ],
  imports: [
    BrowserModule,
    AngularFireDatabaseModule,
    IonicModule.forRoot(MyApp,{
    menuType: 'push',
    platforms: {
      ios: {
        menuType: 'overlay',
      },
      android: {
        menuType: 'overlay',
      }
    }
  }),
    // CloudModule.forRoot(cloudSettings),
    AngularFireModule.initializeApp(config),
    IonicStorageModule.forRoot({
      name: '__eventdb',
         driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    EventList,
    AddEventPage,
    AboutPage,
    SettingPage,
    AgentPage,
    AgentDetailPage,
    AutocompletePage,
    eventFilters,
    eventFiltersDetail,
    eventDetail
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EventService,
    UserModel,
    GooglePlus,
    AngularFireAuth
  ]
})
export class AppModule {}
