import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Utils } from './utils';
import { CacheService } from './cache.service';

import { EntityCollection, EntityType, ObjectFactory } from './entities';
import { EntityCollectionResource, EntityTypeResource } from './entities.resource';


@Injectable()
export class TKApiService {
  private CACHE_EXPIRATION_MILLIS = 60 * 1000;

  constructor(private httpClient: HttpClient, private cacheService: CacheService) {}

  public getEntityTypes(): Observable<EntityType[]> {
    const url = Utils.API_BASE_URL + 'entity/types/';
    const observable = new Observable<EntityType[]>(observer => {
      this.httpClient.get<EntityTypeResource[]>(url).subscribe(resources => {
        const entities: EntityType[] = [];
        for (const resource of resources) {
          entities.push(ObjectFactory.createFromResource(EntityType, resource));
        }
        observer.next(entities);
        observer.complete();
      });
    });
    return this.cacheService.get(url, observable, this.CACHE_EXPIRATION_MILLIS);
  }

  public getEntitiesUrl(url: string, maxItems: number, skipItems: number, isSingleItem: boolean): Observable<EntityCollection> {
    url = Utils.API_BASE_URL + 'entities/?url=' + url + '&max_items=' + maxItems + '&skip_items='
          + skipItems + '&return_count=' + !isSingleItem + '&is_single_item=' + isSingleItem;
    console.log('getEntitiesUrl', url);
    const observable = new Observable<EntityCollection>(observer => {
      this.httpClient.get<EntityCollectionResource>(url).subscribe(resource => {
        observer.next(ObjectFactory.createFromResource(EntityCollection, resource));
        observer.complete();
      });
    });
    return this.cacheService.get(url, observable, this.CACHE_EXPIRATION_MILLIS);
  }

  public getEntityLinks(entityUrl: string, relatedEntityType: string): Observable<string[]> {
    const url = Utils.API_BASE_URL + 'entity/links/?entity_url=' + entityUrl + '&related_type=' +  relatedEntityType;
    // console.log(url);
    const observable = new Observable<string[]>(observer => {
      this.httpClient.get<string[]>(url).subscribe(links => {
        observer.next(links);
        observer.complete();
      });
    });
    return this.cacheService.get(url, observable, this.CACHE_EXPIRATION_MILLIS);
  }
}
