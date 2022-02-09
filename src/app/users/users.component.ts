import { Component, OnInit } from '@angular/core';
import { UsersService } from "../service/users.service";
import { TokenService } from "../service/token.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['userId', 'username', 'delete', 'edit'];
  dataSource: any;
  loaded = false;

  constructor(private usersService: UsersService, private tokenService: TokenService) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  private getAll() {
    this.usersService.getAll(this.tokenService.getToken()).subscribe(
      users => {
        this.dataSource = users;
        this.loaded = true;
      }
    )
  }

  delete(userId: string) {
    this.usersService.delete(this.tokenService.getToken(), userId).subscribe(
      () => {
        this.getAll();
      }
    );
  }

}
//for commit
