import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/shared/interfaces/product';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';
import { SafeUrl } from '@angular/platform-browser';
import { map, mergeAll, mergeMap, of, toArray } from 'rxjs';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;
  productImages: { [productId: string]: SafeUrl } = {};
  displayedColumns: string[] = [
    'country_of_origin',
    'manufacturer',
    'name',
    'image',
    'width',
    'height',
    'depth',
    'edit',
    'delete',
  ];
  dataSource = new MatTableDataSource<Product>([]);

  constructor(
    private productsService: ProductsService,
    private dialog: MatDialog,
    private imageService: ImageService,
  ) {}

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getProducts();
  }

  private getProducts() {
    this.productsService
      .getProducts()
      .pipe(
        map((data) => data.data),
        mergeAll(),
        mergeMap((product: Product) => {
          if (product.image) {
            return this.imageService
              .imagePreview(product.image)
              .pipe(map((safeUrl) => ({ ...product, imagePreview: safeUrl })));
          }
          return of(product);
        }),
        toArray(),
      )
      .subscribe((array) => {
        this.dataSource.data = array;
      });
  }

  confirmDelete(productId: string): void {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: {
        confirmationText:
          'Are you really sure you want to delete this product?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      result && this.deleteProduct(productId);
    });
  }

  private deleteProduct(productId: string) {
    this.productsService.deleteProduct(productId).subscribe({
      next: () =>
        (this.dataSource.data = this.dataSource.data.filter(
          (el) => el._id != productId,
        )),
      error: (err) => console.log(err),
    });
  }
}
