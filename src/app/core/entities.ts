import {BaseResource, EntityCollectionResource, EntityResource, EntityTypeResource} from './entities.resource';


export namespace ObjectFactory {
  export function create<T extends BaseObject>(c: new() => T): T {
    return new c();
  }

  export function createFromResource<T extends BaseObject>(c: new() => T, resource: BaseResource): T {
    const object = new c();
    return object.fromResource(resource, object) as T;
  }

  export function createFromResources<T extends BaseObject>(c: new() => T, resources: BaseResource[]): T[] {
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
    this.doCreateFromResource(resource, object);
    return object;
  }
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
      const hideKeys = [
        'Id@odata.type',
        '@odata.id',
        '@odata.context',
        '@odata.editLink',
        '@odata.metadata',
        '@odata.associationLink',
        '#TK.DA.GGM.OData.Resource',
      ];

      for (const hideKey of hideKeys) {
        if (key.includes(hideKey)) {
          isVisible = false;
        }
      }

      // if (key === 'ApiGewijzigdOp' || key === 'Verwijderd') {
      //   isVisible = false;
      // }

      if (key === '@odata.type') {
        entity.json[key] = entity.json[key].replace('#TK.DA.GGM.OData.', '');
        this.type = entity.json[key];
      } else if (key.includes('@odata.type')) {
        isVisible = false;
      }

      if (key.includes('@odata.navigationLink')) {
        const url = entity.json[key];
        const relation = new EntityRelation();
        relation.key = key.replace('@odata.navigationLink', '');
        relation.type = key.replace('@odata.navigationLink', '');
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

    function sortEntity(a, b) {
      if (a.key < b.key) {
        return -1;
      }
      if (a.key > b.key) {
        return 1;
      }
      return 0;
    }

    entity.attributes.sort(sortEntity);
    entity.relations.sort(sortEntity);
    return entity;
  }
}
