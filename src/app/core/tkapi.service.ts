import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Utils } from './utils';
import { CacheService } from './cache.service';

import { EntityCollection, ObjectFactory } from './entities';
import { EntityCollectionResource } from './entities.resource';


@Injectable()
export class TKApiService {
  private CACHE_EXPIRATION_MILLIS = 60 * 1000;

  constructor(private httpClient: HttpClient, private cacheService: CacheService) {}

  public getEntities(): Observable<EntityCollection[]> {
    const url = Utils.API_BASE_URL + 'entities/';
    const observable = new Observable<EntityCollection[]>(observer => {
      this.httpClient.get<EntityCollectionResource[]>(url).subscribe(resources => {
        console.log(resources);
        observer.next(ObjectFactory.createFromResources(EntityCollection, resources));
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
