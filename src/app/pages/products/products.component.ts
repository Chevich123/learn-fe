import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProductsService } from 'src/app/products.service';
import { Product } from 'src/app/shared/interfaces/product';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

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
    private sanitizer: DomSanitizer,
  ) {}
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.getProducts();
  }

  private getProducts() {
    this.productsService.getProducts().subscribe({
      next: (products) => {
        this.dataSource.data = products.data;
        this.loadProductImages();
      },
      error: (err) => console.log(err),
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

  loadProductImages() {
    this.dataSource.data.forEach((product) => {
      this.productsService.loadProductImage(product.image).subscribe(
        (imageBlob) => {
          const reader = new FileReader();
          reader.onload = (event: any) => {
            const imageUrl = event.target.result;
            const safeImageUrl =
              this.sanitizer.bypassSecurityTrustUrl(imageUrl);
            this.productImages[product._id] = safeImageUrl;
          };
          reader.readAsDataURL(imageBlob);
        },
        (error) => {
          console.error('Error loading image:', error);
        },
      );
    });
  }
}
