import {Component, Input, OnInit} from '@angular/core';

import { TKApiService } from '../core/tkapi.service';
import { EntityCollection } from '../core/entities';
import {ActivatedRoute} from '@angular/router';


@Component({
  templateUrl: 'entities-type.component.html',
})
export class EntitiesTypeComponent implements OnInit {
  @Input() entityCollection: EntityCollection;
  private static readonly ENTITIES_PER_PAGE = 12;
  private currentPage = 0;

  constructor(private tkapiService: TKApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(queryParams => {
      const type = queryParams['type'];
      this.currentPage = queryParams['page'];
      const skipItems = EntitiesTypeComponent.ENTITIES_PER_PAGE * this.currentPage;
      this.tkapiService.getEntitiesByType(type, EntitiesTypeComponent.ENTITIES_PER_PAGE, skipItems)
        .subscribe(entityCollection => {
          this.entityCollection = entityCollection;
        });
    });
  }
}
