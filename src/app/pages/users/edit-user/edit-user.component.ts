import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from 'src/app/shared/interfaces/user';
import { AddUserComponent } from '../add-user/add-user.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private usersService: UserService, private router: Router, private route: ActivatedRoute) { }

  userId!: string;
  initialUser!: IUser;
  userForm: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', Validators.email],
    site: [''],
    phone: ['', AddUserComponent.phoneVal]
  });

  ngOnInit(): void {
    this.userId = this.route.snapshot.params['id'];
    this.loadUser(this.userId);
  }
  loadUser(userId: string) {
    this.usersService.getUser(userId).subscribe({
      next: (result) => {
        this.initialUser = result;
        this.userForm.patchValue(this.initialUser);
      },
      error: (err) => console.log(err)
    });
  }

  onSubmit(): void {
    this.userForm.valid &&
    this.usersService.updateUser(this.userId, this.userForm.value).subscribe({
      next: () => this.router.navigateByUrl('/users'),
      error: (err) => console.log(err)
    });
  }
}
