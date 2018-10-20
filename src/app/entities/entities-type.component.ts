import { Component, Input, OnInit } from '@angular/core';

import { TKApiService } from '../core/tkapi.service';
import { EntityCollection } from '../core/entities';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  templateUrl: 'entities-type.component.html',
})
export class EntitiesTypeComponent implements OnInit {
  @Input() entityCollection: EntityCollection;
  readonly ENTITIES_PER_PAGE = 12;
  currentPage = 1;
  type: string;

  constructor(private tkapiService: TKApiService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(queryParams => {
      this.type = queryParams['type'];
      this.currentPage = parseInt(queryParams['page'], 10);
      this.getEntities();
    });
  }

  private getEntities() {
    this.entityCollection = null;
    const skipItems = this.ENTITIES_PER_PAGE * (this.currentPage - 1);
    this.tkapiService.getEntitiesByType(this.type, this.ENTITIES_PER_PAGE, skipItems)
      .subscribe(entityCollection => {
        this.entityCollection = entityCollection;
      });
  }

  pageChanged(event: any): void {
    this.currentPage = event.page;
    const urlTree = this.router.parseUrl(this.router.url);
    urlTree.queryParams['page'] = event.page;
    this.router.navigateByUrl(urlTree);
    this.getEntities();
  }
}
