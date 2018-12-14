import {BaseResource, EntityCollectionResource, EntityResource, EntityTypeResource} from './entities.resource';
import { Utils } from './utils';


export namespace ObjectFactory {
  export function create<T extends BaseObject>(c: {new(): T; }): T {
    return new c();
  }

  export function createFromResource<T extends BaseObject>(c: {new(): T; }, resource: BaseResource): T {
    const object = new c();
    return object.fromResource(resource, object) as T;
  }

  export function createFromResources<T extends BaseObject>(c: {new(): T; }, resources: BaseResource[]): T[] {
    const objects = [];
    for (const resource of resources) {
      objects.push(createFromResource(c, resource));
    }
    return objects;
  }
}


export abstract class BaseObject {

  protected abstract doCreateFromResource(resource: BaseResource, baseObject: BaseObject);

  public fromResource(resource: BaseResource, object: BaseObject) {
    BaseObject.setBaseProperties(resource, object);
    this.doCreateFromResource(resource, object);
    return object;
  }

  private static setBaseProperties(resource: BaseResource, baseObject: BaseObject) { }
}


export class EntityType extends BaseObject {
  type: string;
  // items: Entity[];

  protected doCreateFromResource(resource: EntityTypeResource, entityType: EntityType) {
    entityType.type = resource.type;
  }
}


export class EntityCollection extends BaseObject {
  type: string;
  entities: Entity[] = [];
  entitiesVisible: Entity[] = [];
  nextPageUrl: string;
  totalItems: number;

  protected doCreateFromResource(resource: EntityCollectionResource, entityCollection: EntityCollection) {
    entityCollection.type = resource.type;
    entityCollection.nextPageUrl = resource.next_page_link;
    if (resource.items.length === undefined) {
      const resourceItem = resource.items as any;
      entityCollection.entities.push(ObjectFactory.createFromResource(Entity, resourceItem));
      entityCollection.totalItems = 1;
    } else {
      for (const entityResource of resource.items) {
        const resourceItem = entityResource as EntityResource;
        entityCollection.entities.push(ObjectFactory.createFromResource(Entity, resourceItem));
      }
      entityCollection.totalItems = resource.total_items;
    }
    entityCollection.entitiesVisible = entityCollection.entities;
    return entityCollection;
  }
}


export class EntityAttribute {
  key: string;
  value: string;
  isVisible = true;
}


export class EntityRelation {
  key: string;
  type: string;
  url: string;
  size: number;
  sizeKnown = false;
}


export class Entity extends BaseObject {
  json: String;
  type: String;
  attributes: EntityAttribute[] = [];
  relations: EntityRelation[] = [];

  public getId(): string {
    return this.getAttribute('Id').value;
  }

  public getAttribute(key: string): EntityAttribute | null {
    for (const attribute of this.attributes) {
      if (attribute.key === key) {
        return attribute;
      }
    }
    return null;
  }

  protected doCreateFromResource(resource: EntityResource, entity: Entity) {
    entity.json = resource;

    Object.keys(entity.json).forEach(key => {
      let isVisible = true;

      if (key.includes('@odata.type')) {
        isVisible = false;
      }

      if (key.includes('odata.editLink')) {
        isVisible = false;
      }

      if (key.includes('odata.metadata')) {
        isVisible = false;
      }

      if (key === 'odata.id') {
        isVisible = false;
      }

      if (key === 'ApiGewijzigdOp' || key === 'Verwijderd') {
        isVisible = false;
      }

      if (key === 'odata.type') {
        entity.json[key] = entity.json[key].replace('TK.DA.GGM.Models.OData.', '');
        this.type = entity.json[key];
      }

      if (key.includes('@odata.navigationLinkUrl')) {
        const url = entity.json[key];
        const relation = new EntityRelation();
        relation.key = key.replace('@odata.navigationLinkUrl', '');
        relation.type = key.replace('@odata.navigationLinkUrl', '');
        relation.url = url;
        entity.relations.push(relation);
      } else {
        const attribute = new EntityAttribute();
        attribute.key = key;
        attribute.value = entity.json[key];
        attribute.isVisible = isVisible;
        entity.attributes.push(attribute);
      }
    });
    return entity;
  }
}
