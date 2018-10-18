export interface BaseResource extends String {
  id: number;
}


export interface EntityCollectionResource extends BaseResource, String {
  name: string;
  items: EntityResource[] | EntityResource;
}

export interface EntityResource extends BaseResource, String { }
