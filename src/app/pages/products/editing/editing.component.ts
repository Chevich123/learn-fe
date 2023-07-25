import { Component } from '@angular/core';
import { ProductsService } from 'src/app/products.service';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

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
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.id = route.snapshot.params['id'];
    this.productsService
      .getProduct(this.id!)
      .subscribe((product) => this.productForm.patchValue(product));
  }

  onSubmit(): void {
    if (!this.productForm.valid) {
      return;
    }
    if (!this.productForm.dirty) {
      return;
    }

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
}
