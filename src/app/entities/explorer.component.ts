import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TKApiService } from '../core/tkapi.service';
import {EntityCollection, EntityType} from '../core/entities';


@Component({
  templateUrl: 'explorer.component.html',
})
export class ExplorerComponent implements OnInit {
  entityTypes: EntityType[];

  constructor(private tkapiService: TKApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.tkapiService.getEntityTypes().subscribe(entityTypes => {
      this.entityTypes = entityTypes;
    });
  }
}
