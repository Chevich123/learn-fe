import { Component } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { ImageService } from 'src/app/services/image.service';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { SafeUrl } from '@angular/platform-browser';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-product-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddProductComponent {
  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private imagesService: ImageService,
    private router: Router,
  ) {}

  productForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    manufacturer: ['', Validators.required],
    width: ['', this.positiveNumberValidator],
    height: ['', this.positiveNumberValidator],
    depth: ['', this.positiveNumberValidator],
    image: [''],
    country_of_origin: [''],
  });
  preview: SafeUrl | undefined;

  onSubmit(): void {
    this.productForm.valid &&
    this.productsService.createProduct(this.productForm.value).subscribe(() => this.router.navigateByUrl('/products'));
  }

  positiveNumberValidator(control: FormControl) {
    return control.value === '' || control.value > 0
      ? null
      : { positiveNumber: true };
  }

  onDrop(event: DragEvent) {
    if (!event.dataTransfer?.files[0].type.includes('image/')) return;
    event.preventDefault();
    this.uploadImage(event.dataTransfer?.files[0]);
  }
  uploadImage(file: File | undefined) {
    if (!file) return;
    const formdata = new FormData();
    formdata.append('file', file);
    this.imagesService.uploadImage(formdata).pipe(
      switchMap((result: any) => {
        this.productForm.patchValue({ image: result.filename })
        return this.imagesService.imagePreview(result.filename);
      })
    ).subscribe((safeUrl) => { this.preview = safeUrl;});
  }

  onFileSelected(event: any) {
    this.uploadImage(event.target.files[0]);
  }
}
