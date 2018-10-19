export interface BaseResource extends String { }


export interface EntityCollectionResource extends BaseResource, String {
  type: string;
  items: EntityResource[];
  next_page_link: string;
}


export interface EntityResource extends BaseResource, String { }


export interface EntityTypeResource extends BaseResource {
  type: string;
  items: EntityResource[];
}
