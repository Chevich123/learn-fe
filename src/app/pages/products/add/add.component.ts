import { Component } from '@angular/core';
import { ProductsService } from 'src/app/products.service';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddProductComponent {
  constructor(private formBuilder: FormBuilder, private productsService: ProductsService, private router: Router) { }

  productForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    manufacturer: ['', Validators.required],
    width: ['', this.positiveNumberValidator],
    height: ['', this.positiveNumberValidator],
    depth: ['', this.positiveNumberValidator],
    image: [''],
    country_of_origin: ['']
  });

  onSubmit(): void {
    this.productForm.valid &&
    this.productsService.createProduct(this.productForm.value).subscribe({
      next: () => this.router.navigateByUrl('/products'),
      error: (err) => console.log(err)
    });
  }

  positiveNumberValidator(control: FormControl) {
    return (control.value === '' || control.value > 0) ? null : { positiveNumber: true };
  }
  
  onDrop(event: DragEvent) {
    if(!event.dataTransfer?.files[0].type.includes('image/')) return;
    event.preventDefault();
    this.uploadImage(event.dataTransfer?.files[0]);
  }
  uploadImage(file: File | undefined) {
    if(!file) return;
    const formdata = new FormData();
    formdata.append('file', file);
    this.productsService.uploadImage(formdata).subscribe({
      next: (result) => this.productForm.patchValue({ image: result.filename }),
      error: (err) => console.error(err),
    });
  }

  onFileSelected(event: any) {
    this.uploadImage(event.target.files[0]);
  }
}
