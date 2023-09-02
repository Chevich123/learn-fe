import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../shared/interfaces/product';
import { IPaginatedResponse } from '../shared/interfaces/paginated';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  private readonly url = `${environment.apiURL}/products`;

  getProducts(
    index: number,
    size: number,
  ): Observable<IPaginatedResponse<Product[]>> {
    const params = new HttpParams()
      .set('start', index * size)
      .set('limit', size);
    return this.http.get<IPaginatedResponse<Product[]>>(
      this.url,
    );
  }
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.url, product);
  }
  deleteProduct(productId: string): Observable<string> {
    return this.http.delete<string>(`${this.url}/products/${productId}`);
  }
  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.url}/products/${id}`);
  }
  patchProduct(id: string, product: Omit<Product, '_id'>): Observable<void> {
    return this.http.patch<void>(`${this.url}/products/${id}`, product);
  }
}
