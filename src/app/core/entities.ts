import { BaseResource, EntityCollectionResource, EntityResource } from './entities.resource';
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


export class EntityCollection extends BaseObject {
  type: string;
  entities: Entity[] = [];

  protected doCreateFromResource(resource: EntityCollectionResource, entityCollection: EntityCollection) {
    entityCollection.type = resource.type;
    console.log('items', resource);
    console.log('resource.items.length', resource.items.length);
    if (resource.items.length === undefined) {
      const resourceItem = resource.items as any;
      entityCollection.entities.push(ObjectFactory.createFromResource(Entity, resourceItem));
    } else {
      for (const entityResource of resource.items) {
        const resourceItem = entityResource as EntityResource;
        entityCollection.entities.push(ObjectFactory.createFromResource(Entity, resourceItem));
      }
    }
    return entityCollection;
  }
}


export class EntityAttribute {
  key: string;
  value: string;
}


export class EntityRelation {
  key: string;
  type: string;
  url: URL;
}


export class Entity extends BaseObject {
  json: String;
  type: String;
  attributes: EntityAttribute[] = [];
  relations: EntityRelation[] = [];

  protected doCreateFromResource(resource: EntityResource, entity: Entity) {
    entity.json = resource;

    Object.keys(entity.json).forEach(key => {
      if (key.includes('@odata.type')) {
        return;
      }

      if (key.includes('odata.editLink')) {
        return;
      }

      if (key === 'odata.id') {
        return;
      }

      if (key === 'GewijzigdOp' || key === 'ApiGewijzigdOp' || key === 'Verwijderd') {
        return;
      }

      if (key === 'odata.type') {
        entity.json[key] = entity.json[key].replace('TK.DA.GGM.Models.OData.', '');
        this.type = entity.json[key];
      }

      if (key.includes('@odata.navigationLinkUrl')) {
        const url = Utils.API_BASE_URL + 'entity/?url=' + entity.json[key];
        const relation = new EntityRelation();
        relation.key = key.replace('@odata.navigationLinkUrl', '');
        relation.type = key.replace('@odata.navigationLinkUrl', '');
        relation.url = new URL(url);
        entity.relations.push(relation);
      } else {
        const attribute = new EntityAttribute();
        attribute.key = key;
        attribute.value = entity.json[key];
        entity.attributes.push(attribute);
      }
    });
    return entity;
  }
}
