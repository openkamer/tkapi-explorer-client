import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TKApiService } from '../core/tkapi.service';
import { EntityCollection } from '../core/entities';


@Component({
  templateUrl: 'explorer.component.html',
})
export class ExplorerComponent implements OnInit {
  entitiesCollections: EntityCollection[];

  constructor(private tkapiService: TKApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.tkapiService.getEntities().subscribe(entitiesCollections => {
      this.entitiesCollections = entitiesCollections;
      console.log(this.entitiesCollections);
    });
  }
}
