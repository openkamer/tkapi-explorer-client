import { Component, OnInit } from '@angular/core';

import { TKApiService } from '../core/tkapi.service';
import { EntityType } from '../core/entities';


@Component({
  templateUrl: 'explorer.component.html',
})
export class ExplorerComponent implements OnInit {
  entityTypes: EntityType[];

  constructor(private tkapiService: TKApiService) {}

  ngOnInit(): void {
    this.tkapiService.getEntityTypes().subscribe(entityTypes => {
      this.entityTypes = entityTypes;
    });
  }
}
