import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from '../../../services/image.service';
import { of, switchMap } from 'rxjs';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent {
  preview: SafeUrl | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private imagesService: ImageService,
  ) {}

  userForm: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', Validators.email],
    password: ['', [Validators.required, Validators.minLength(6)]],
    site: [''],
    avatar: [''],
    phone: ['', AddUserComponent.phoneVal],
  });

  static phoneVal(control: FormControl): { isPhoneValid: boolean } | null {
    const phoneRegex = /^\+?\d{1,3}\s*\(?\d{2}\)?[\s-]*?\d{3}-?\d{2}-?\d{2}$/;
    const value = control.value;
    if (value && !phoneRegex.test(value)) {
      return { isPhoneValid: true };
    }
    return null;
  }

  submit() {
    this.userService.create(this.userForm.value).subscribe(() => {
      this.router.navigate(['/users']);
    });
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
    this.imagesService
      .uploadImage(formdata)
      .pipe(
        switchMap((result: { originalname: string; filename: string }) => {
          this.userForm.patchValue({ avatar: result.filename });
          return this.imagesService.imagePreview(result.filename);
        }),
      )
      .subscribe((safeUrl) => {
        this.preview = safeUrl;
      });
  }

  onFileSelected(event: any) {
    this.uploadImage(event.target.files[0]);
  }
}
