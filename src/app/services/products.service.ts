import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../shared/interfaces/product';
import { IPaginatedResponse } from '../shared/interfaces/paginated';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  private readonly url = 'http://localhost:3000/products';

  getProducts(): Observable<IPaginatedResponse<Product[]>> {
    return this.http.get<IPaginatedResponse<Product[]>>(
      'http://localhost:3000/products',
    );
  }
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>('http://localhost:3000/products', product);
  }
  deleteProduct(productId: string): Observable<string> {
    return this.http.delete<string>(`${this.url}/${productId}`);
  }
  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.url}/${id}`);
  }
  patchProduct(id: string, product: Omit<Product, '_id'>): Observable<void> {
    return this.http.patch<void>(`${this.url}/${id}`, product);
  }
}
