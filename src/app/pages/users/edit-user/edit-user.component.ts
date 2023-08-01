import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from 'src/app/shared/interfaces/user';
import { AddUserComponent } from '../add-user/add-user.component';
import { UserService } from '../../../services/user.service';
import { ImageService } from '../../../services/image.service';
import { of, switchMap } from 'rxjs';
import { SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private usersService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private imageService: ImageService,
  ) {
    this.userId = route.snapshot.params['id'];
    this.usersService
      .getUser(this.userId!)
      .pipe(
        switchMap((user) => {
          this.userForm.patchValue(user);
          return user.avatar
            ? this.imageService.imagePreview(user.avatar)
            : of(undefined);
        }),
      )
      .subscribe((safeUrl) => {
        this.preview = safeUrl;
      });
  }
  preview: SafeUrl | undefined;
  userId!: string;
  initialUser!: IUser;
  userForm: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', Validators.email],
    site: [''],
    avatar: [''],
    phone: ['', AddUserComponent.phoneVal],
  });

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
  }

  loadUser(userId: string) {
    this.usersService.getUser(userId).subscribe({
      next: (result) => {
        this.initialUser = result;
        this.userForm.patchValue(this.initialUser);
      },
      error: (err) => console.log(err),
    });
  }

  onSubmit(): void {
    this.userForm.valid &&
      this.usersService.updateUser(this.userId, this.userForm.value).subscribe({
        next: () => this.router.navigateByUrl('/users'),
        error: (err) => console.log(err),
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
    this.imageService
      .uploadImage(formdata)
      .pipe(
        switchMap((result: { originalname: string; filename: string }) => {
          this.userForm.patchValue({ avatar: result.filename });
          return this.imageService.imagePreview(result.filename);
        }),
      )
      .subscribe((safeUrl) => {
        this.preview = safeUrl;
        this.userForm.markAsDirty();
      });
  }

  onFileSelected(event: any) {
    this.uploadImage(event.target.files[0]);
  }
}
