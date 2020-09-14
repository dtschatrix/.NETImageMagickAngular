export interface ImageFilterOptions {
  listFilters: Filter[]
}

export interface Filter {
  name: string,
  attributes?: Map<string, string[]>
}

export interface Image {
  filter?: Filter;
  imagebase64?: string;
}

export interface PostImage{
  imageBase64: string;
}
