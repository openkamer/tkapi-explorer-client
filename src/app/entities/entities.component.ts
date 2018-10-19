import {Component, Input, OnInit} from '@angular/core';

import { TKApiService } from '../core/tkapi.service';
import { EntityCollection } from '../core/entities';
import {ActivatedRoute} from '@angular/router';


@Component({
  templateUrl: 'entities.component.html',
})
export class EntitiesComponent implements OnInit {
  @Input() entityCollection: EntityCollection;

  constructor(private tkapiService: TKApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(queryParams => {
      const url = queryParams['url'];
      this.tkapiService.getEntitiesUrl(url).subscribe(entityCollection => {
        this.entityCollection = entityCollection;
      });
    });
  }
}
