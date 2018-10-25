import {Component, Input, OnInit} from '@angular/core';

import { TKApiService } from '../core/tkapi.service';
import { EntityCollection } from '../core/entities';
import {ActivatedRoute, Router} from '@angular/router';
import {EntitiesListComponent} from './entities-list.component';
import {MatomoTracker} from 'ngx-matomo';


@Component({
  templateUrl: 'entities-list.component.html',
})
export class EntitiesRelatedComponent extends EntitiesListComponent implements OnInit {

  constructor(protected tkapiService: TKApiService, protected route: ActivatedRoute,
              protected router: Router, protected matomoTracker: MatomoTracker) {
    super(tkapiService, route, router, matomoTracker);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(queryParams => {
      if (queryParams['url']) {
        this.url = queryParams['url'];
        this.initialize();
      }
    });
  }
}
