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

  
  ngOnInit() {
// Ionic scroll element
this.ionScroll = this.myElement.nativeElement.getElementsByClassName('scroll-content')[0];
// On scroll function
this.ionScroll.addEventListener("scroll", () => {
if(this.ionScroll.scrollTop - this.start > this.threshold) {
this.showheader =true;
this.hideheader = false;
} else {
this.showheader =false;
this.hideheader = true;
}
if (this.slideHeaderPrevious >= this.ionScroll.scrollTop - this.start) {
this.showheader =false;
this.hideheader = true;
}
this.slideHeaderPrevious = this.ionScroll.scrollTop - this.start;
});
}

onScroll(){
  
if(this.ionScroll.scrollTop - this.start > this.threshold) {
this.showheader =true;
this.hideheader = false;
} else {
this.showheader =false;
this.hideheader = true;
}
if (this.slideHeaderPrevious >= this.ionScroll.scrollTop - this.start) {
this.showheader =false;
this.hideheader = true;
}
this.slideHeaderPrevious = this.ionScroll.scrollTop - this.start;
}
}
