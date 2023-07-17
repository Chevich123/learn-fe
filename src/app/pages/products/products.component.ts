import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProductsService } from 'src/app/products.service';
import { Product } from 'src/app/shared/interfaces/product';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  displayedColumns: string[] = ['country_of_origin', 'manufacturer', 'name', 'width', 'height', 'depth', 'delete'];
  dataSource = new MatTableDataSource<Product>([]);
  constructor(private productsService: ProductsService, private dialog: MatDialog) { }
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

  confirmDelete(productId: string): void {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.productsService.deleteProduct(productId).subscribe({
          next: (ret) => this.dataSource.data = this.dataSource.data.filter(el => el._id != productId),
          error: (err) => console.log(err)
        });
      }
    });
  }
}
