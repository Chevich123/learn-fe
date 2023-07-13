import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {MatTableDataSource } from '@angular/material/table';
import { ProductsService } from 'src/app/products.service';
import { Product } from 'src/app/shared/interfaces/product';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements AfterViewInit,OnInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  displayedColumns: string[] = ['country_of_origin', 'manufacturer', 'name', 'width', 'height', 'depth'];
  dataSource = new MatTableDataSource<Product>([]);
  constructor(private productsService: ProductsService){ }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.productsService.getProducts().subscribe({
      next: (products) => this.dataSource.data = products.data,
      error: (err) => console.log(err)
    });
  }
}
