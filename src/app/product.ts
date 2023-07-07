export interface Product {
    productId: string;
    name: string;
    manufacturer: string;
    width?: number;
    height?: number;
    depth?: number;
    image?: string;
    country_of_origin?: string;
}

export interface IPaginatedResponse<T> {
  total: number;
  start?: number;
  limit?: number;
  data: T;
}