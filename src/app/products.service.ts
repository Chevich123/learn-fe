import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './shared/interfaces/product';
import { IPaginatedResponse } from './shared/interfaces/paginated';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http: HttpClient) { }

  getProducts(): Observable<IPaginatedResponse<Product[]>> {
    return this.http.get<IPaginatedResponse<Product[]>>("http://localhost:3000/products");
  }
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>("http://localhost:3000/products", product);
  }
  deleteProduct(productId: string): Observable<string> {
    return this.http.delete<string>("http://localhost:3000/products/" + productId);
  }
  uploadImage(formData: FormData): Observable<{ originalname: string; filename: string }> {
    return this.http.post<{ originalname: string; filename: string }>("http://localhost:3000/images",formData);
  }
}
