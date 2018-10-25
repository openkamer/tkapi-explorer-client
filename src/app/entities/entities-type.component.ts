import { Component, OnInit } from '@angular/core';

import { TKApiService } from '../core/tkapi.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EntitiesListComponent } from './entities-list.component';
import {MatomoTracker} from 'ngx-matomo';


@Component({
  templateUrl: 'entities-list.component.html',
})
export class EntitiesTypeComponent extends EntitiesListComponent implements OnInit {

  constructor(protected tkapiService: TKApiService, protected route: ActivatedRoute,
              protected router: Router, protected matomoTracker: MatomoTracker) {
    super(tkapiService, route, router, matomoTracker);
  }

  ngOnInit(): void {
    console.log(this.route);
    this.route.queryParams.subscribe(queryParams => {
      this.url = queryParams['type'];
      this.initialize();
    });
  }
}
