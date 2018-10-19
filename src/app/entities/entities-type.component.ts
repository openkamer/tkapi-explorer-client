import {Component, Input, OnInit} from '@angular/core';

import { TKApiService } from '../core/tkapi.service';
import { EntityCollection } from '../core/entities';
import {ActivatedRoute} from '@angular/router';


@Component({
  templateUrl: 'entities-type.component.html',
})
export class EntitiesTypeComponent implements OnInit {
  @Input() entityCollection: EntityCollection;

  constructor(private tkapiService: TKApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(queryParams => {
      const type = queryParams['type'];
      this.tkapiService.getEntitiesByType(type).subscribe(entityCollection => {
        // console.log(entityCollection);
        this.entityCollection = entityCollection;
      });
    });
  }
}
