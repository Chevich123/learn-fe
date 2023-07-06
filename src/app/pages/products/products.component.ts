import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource } from '@angular/material/table';
import { ProductsService } from 'src/app/products.service';
import { Product } from 'src/app/product';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {
  displayedColumns: string[] = ['country_of_origin', 'manufacturer', 'name', 'width', 'height', 'dipth'];
  dataSource = new MatTableDataSource<Product>([
    {country_of_origin: "Belarus", depth:69, height:360, width:420, manufacturer:"scriptSQD", name:"Test product 1"},
    {country_of_origin: "Testland", depth:38, height:92, width:106, manufacturer:"Test manufacturer", name:"Test product 2"}]);
  constructor(private productsService: ProductsService){ }
  ngOnInit(): void {
    //this.productsService.getProducts()
  }
}
