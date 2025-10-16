export interface PropertyListDto {
  idProperty: string;
  name: string;
  address: string;
  price: number;
  image: string;
  idOwner: string;
  ownerName: string;
}

export interface PropertyDetailDto {
  property: PropertyInfoDto;
  owner: OwnerDto;
  images: PropertyImageDto[];
  traces: PropertyTraceDto[];
}

export interface PropertyInfoDto {
  idProperty: string;
  name: string;
  address: string;
  price: number;
  codeInternal: string;
  year: number;
}

export interface OwnerDto {
  idOwner: string;
  name: string;
  address: string;
  photo: string;
  birthday: string;
}

export interface PropertyImageDto {
  idPropertyImage: string;
  file: string;
  enabled: boolean;
}

export interface PropertyTraceDto {
  idPropertyTrace: string;
  dateSale: string;
  name: string;
  value: number;
  tax: number;
}

export interface PropertyFilterDto {
  name?: string;
  address?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  pageSize?: number;
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
