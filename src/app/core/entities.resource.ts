export interface BaseResource extends String { }


export interface EntityCollectionResource extends BaseResource, String {
  type: string;
  items: EntityResource[];
}

export interface EntityResource extends BaseResource, String { }
