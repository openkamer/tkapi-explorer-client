import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Utils } from './utils';
import { CacheService } from './cache.service';

import {EntityCollection, EntityType, ObjectFactory} from './entities';
import {EntityCollectionResource, EntityTypeResource} from './entities.resource';


@Injectable()
export class TKApiService {
  private CACHE_EXPIRATION_MILLIS = 60 * 1000;

  constructor(private httpClient: HttpClient, private cacheService: CacheService) {}

  public getEntityTypes(): Observable<EntityType[]> {
    const url = Utils.API_BASE_URL + 'entity/types/';
    const observable = new Observable<EntityType[]>(observer => {
      this.httpClient.get<EntityTypeResource[]>(url).subscribe(resources => {
        console.log(resources);
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

  public getEntitiesByType(type: string): Observable<EntityCollection> {
    const url = Utils.API_BASE_URL + 'entities/' + type + '/';
    console.log(url);
    const observable = new Observable<EntityCollection>(observer => {
      this.httpClient.get<EntityCollectionResource>(url).subscribe(resources => {
        console.log(resources);
        observer.next(ObjectFactory.createFromResource(EntityCollection, resources));
        observer.complete();
      });
    });
    return this.cacheService.get(url, observable, this.CACHE_EXPIRATION_MILLIS);
  }

  public getEntitiesUrl(url: string): Observable<EntityCollection> {
    const observable = new Observable<EntityCollection>(observer => {
      this.httpClient.get<EntityCollectionResource>(url).subscribe(resource => {
        observer.next(ObjectFactory.createFromResource(EntityCollection, resource));
        observer.complete();
      });
    });
    return this.cacheService.get(url, observable, this.CACHE_EXPIRATION_MILLIS);
  }
}
