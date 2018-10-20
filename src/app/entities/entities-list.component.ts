import { Component, Input } from '@angular/core';

import { TKApiService } from '../core/tkapi.service';
import { EntityCollection } from '../core/entities';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  templateUrl: 'entities-list.component.html',
})
export class EntitiesListComponent {
  @Input() entityCollection: EntityCollection;
  readonly ENTITIES_PER_PAGE = 12;
  currentPage = 1;
  protected url: string;
  private totalItems: number;

  constructor(protected tkapiService: TKApiService, protected route: ActivatedRoute, protected router: Router) {}

  protected initialize() {
    this.route.queryParams.subscribe(queryParams => {
      if (queryParams['page'] !== undefined) {
        this.currentPage = parseInt(queryParams['page'], 10);
      }
      if (queryParams['totalItems'] !== undefined) {
        this.totalItems = parseInt(queryParams['totalItems'], 10);
      }
      this.getEntities();
    });
  }

  private getEntities() {
    this.entityCollection = null;
    const skipItems = this.ENTITIES_PER_PAGE * (this.currentPage - 1);
    const isSingleItem = (this.totalItems === 1);
    this.tkapiService.getEntitiesUrl(this.url, this.ENTITIES_PER_PAGE, skipItems, isSingleItem)
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
