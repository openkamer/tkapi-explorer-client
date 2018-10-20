import { Component, OnInit } from '@angular/core';

import { TKApiService } from '../core/tkapi.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EntitiesListComponent } from './entities-list.component';


@Component({
  templateUrl: 'entities-list.component.html',
})
export class EntitiesTypeComponent extends EntitiesListComponent implements OnInit {

  constructor(protected tkapiService: TKApiService, protected route: ActivatedRoute, protected router: Router) {
    super(tkapiService, route, router);
  }

  ngOnInit(): void {
    console.log(this.route);
    this.route.queryParams.subscribe(queryParams => {
      this.url = queryParams['type'];
      this.initialize();
    });
  }
}
