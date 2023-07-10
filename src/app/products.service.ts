import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './shared/interfaces/product';
import { IPaginatedResponse } from './shared/interfaces/paginated';
import { AuthService } from './auth.service';

let headers: HttpHeaders
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private http: HttpClient, private auth: AuthService) { }
  private updateHeaders() {
    headers = new HttpHeaders().set("Authorization", `Bearer ${this.auth.token}`);
  }

  getProducts(): Observable<IPaginatedResponse<Product[]>> {
    this.updateHeaders();
    return this.http.get<IPaginatedResponse<Product[]>>("http://localhost:3000/products", { headers });
  }
  createProduct(product: Product): Observable<Product> {
    this.updateHeaders();
    return this.http.post<Product>("http://localhost:3000/products", product, { headers });
  }
}
