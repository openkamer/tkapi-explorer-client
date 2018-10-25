import { Component, OnInit } from '@angular/core';

import { MatomoInjector, MatomoTracker } from 'ngx-matomo';

import { Utils } from './core/utils';


@Component({
  // tslint:disable-next-line
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {

  constructor(private matomoInjector: MatomoInjector, private matomoTracker: MatomoTracker) {
    this.matomoInjector.init(Utils.MATOMA_URL, Utils.MATOMA_SITE_ID);
  }

  ngOnInit() {
    this.matomoTracker.setDocumentTitle('TK API Explorer');
  }
}
