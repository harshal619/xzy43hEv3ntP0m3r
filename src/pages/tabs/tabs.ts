import { Component } from '@angular/core';

import { EventList } from '../event-list/event-list';
import { AgentPage } from '../agent/agent';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = EventList;
  tab2Root = AgentPage;

  constructor() {

  }

  ionViewWillEnter() {
    console.log("I'm alive!");
  }
  ionViewWillLeave() {
    console.log("Looks like I'm about to leave :(");
  }
}
