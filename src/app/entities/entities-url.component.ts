import {Component, Input, OnInit} from '@angular/core';

import { TKApiService } from '../core/tkapi.service';
import { EntityCollection } from '../core/entities';
import {ActivatedRoute} from '@angular/router';


@Component({
  templateUrl: 'entities-url.component.html',
})
export class EntitiesUrlComponent implements OnInit {
  @Input() entityCollection: EntityCollection;

  constructor(private tkapiService: TKApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(queryParams => {
      if (queryParams['url']) {
        const url = queryParams['url'];
        console.log(url);
        this.tkapiService.getEntitiesUrl(url).subscribe(entityCollection => {
          this.entityCollection = entityCollection;
        });
      } else if (queryParams['nextPageUrl']) {
        const nextPageUrl = queryParams['nextPageUrl'];
        console.log(nextPageUrl);
        this.tkapiService.getEntitiesNextPage(nextPageUrl).subscribe(entityCollection => {
          this.entityCollection = entityCollection;
        });
      }
    });
  }
}
