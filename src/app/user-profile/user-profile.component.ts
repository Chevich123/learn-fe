import { Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../service/users.service';
import { IUser } from '../user/iuser';
import { TokenService } from '../service/token.service';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {

  @ViewChild('input') inputRef: ElementRef = {} as ElementRef;
  name: string = '';
  image: File = {} as File;
  imagePreview?: string | ArrayBuffer | null;
  uploadForm!: FormGroup;

  constructor(
    private userService: UsersService,
    private tokenService: TokenService, private formBuilder: FormBuilder, private httpClient: HttpClient) {
  }

  user: IUser = new IUser('', '');

  ngOnInit(): void {
    this.uploadForm = this.formBuilder.group({
      profile: ['']
    });
  }
  triggerClick() {
    this.inputRef.nativeElement.click()
  }

  getUserImage() {
    let image: string | ArrayBuffer | null;
    image = this.user.avatar as string
    const token = this.tokenService.getToken()
    this.userService.getImage(token, image).subscribe(
      (response: any) => {
        console.log(response);
        this.createImageFromBlob(response)
      });
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imagePreview = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  onFileUpload(event: any) {
    let me = this;

    const file = event.target.files[0];
    this.image = file;

    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(file)
  }

  submit() {
    const token = this.tokenService.getToken()
    const formData = new FormData();
    formData.append('file', this.image);
    this.userService.sendImage(token, formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }
}
