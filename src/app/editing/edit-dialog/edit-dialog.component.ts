import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../../service/users.service';
import { TokenService } from '../../service/token.service';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent {

  @ViewChild('input') inputRef: ElementRef = {} as ElementRef;

  constructor(private usersService: UsersService, private tokenService: TokenService) { }

  name: string = '';
  email: string = '';
  phone: string = '';
  site: string = '';

  image: File = {} as File;
  imagePreview?: string | ArrayBuffer | null;

  userForm = new FormGroup({
    "username": new FormControl("", [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern("(?!^ |.* $)^[^\t]+$")
    ]),
    "email": new FormControl("", [
      Validators.required,
      Validators.email
    ]),
    "phone": new FormControl("", [
      Validators.required,
      Validators.pattern("[0-9]{12}",)
    ]),
    "site": new FormControl("", [
      Validators.required,
      Validators.minLength(7),
      Validators.pattern("(?!^ |.* $)^[^\t]+$")
    ])
  });

  triggerClick() {
    this.inputRef.nativeElement.click()
  }

  onFileUpload(event: any) {
    const file = event.target.files[0];
    this.image = file;

    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = file.result;
    }

    const token = this.tokenService.getToken()

    const formData = new FormData();
    formData.append('file', this.image);

    this.usersService.sendImage(token, formData).subscribe(
      (response: any) => {
        this.imagePreview = response.body.filename
      }
    );

    reader.readAsDataURL(file)
  }
}
