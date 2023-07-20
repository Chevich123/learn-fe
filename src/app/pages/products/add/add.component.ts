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

  onDragPrevent(event: DragEvent){ event.preventDefault(); }
  
  onDrop(event: DragEvent) {
    event.preventDefault();
    const file = event.dataTransfer?.files[0];
    this.uploadImage(file);
    this.previewImage(file);
  }
  uploadImage(file: File | undefined) {
    if(!file) return;
    const formdata = new FormData();
    formdata.append('file', file);
    this.productsService.uploadImage(formdata).subscribe({
      next: (result) => {
        console.log(result.filename)
        this.productForm.patchValue({ image: result.filename });
      },
      error: (err) => console.error(err),
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.uploadImage(file);
    this.previewImage(file);
  }

  previewImage(file: File | undefined) { }
}
