import { Component } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { ImageService } from '../../../services/image.service';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-editing',
  templateUrl: './editing.component.html',
  styleUrls: ['./editing.component.scss'],
})
export class EditingComponent {
  id?: string;

  productForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    manufacturer: ['', Validators.required],
    width: ['', this.positiveNumberValidator],
    height: ['', this.positiveNumberValidator],
    depth: ['', this.positiveNumberValidator],
    image: [''],
    country_of_origin: [''],
  });

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private imageService: ImageService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.id = route.snapshot.params['id'];
    this.productsService
      .getProduct(this.id!)
      .subscribe((product) => {this.productForm.patchValue(product); product.image && this.showPreview(product.image)});
  }
  preview: SafeUrl | undefined;

  onSubmit(): void {
    this.productsService
      .patchProduct(this.id!, this.productForm.value)
      .subscribe({
        next: () => this.router.navigateByUrl('/products'),
        error: (err) => console.log(err),
      });
  }

  positiveNumberValidator(control: FormControl) {
    return control.value === null || control.value > 0
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
    this.imageService.uploadImage(formdata).subscribe({
      next: (result) => {
        this.productForm.patchValue({ image: result.filename })
        this.showPreview(result.filename)
        this.productForm.markAsDirty();
      },
      error: (err) => console.error(err),
    });
  }

  onFileSelected(event: any) {
    this.uploadImage(event.target.files[0]);
  }

  showPreview(image: string){
    this.imageService.imagePreview(image).subscribe((safeUrl)=> this.preview = safeUrl);
  }
}
