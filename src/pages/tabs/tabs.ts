import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams ,ModalController,Content } from 'ionic-angular';

import { EventList } from '../event-list/event-list';
import { AgentPage } from '../agent/agent';


import {ElementRef,Renderer } from '@angular/core';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = EventList;
  tab2Root = AgentPage;


@ViewChild(Content) content: Content;
start = 0;
threshold = 100;
slideHeaderPrevious = 0;
ionScroll:any;
showheader:boolean;
hideheader:boolean;
headercontent:any;

  constructor(public myElement: ElementRef) {


this.showheader =false;
this.hideheader = true;
  }

  ionViewWillEnter() {
    console.log("I'm alive!");
  }
  ionViewWillLeave() {
    console.log("Looks like I'm about to leave :(");
  }
}
