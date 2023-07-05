import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss'],
})
export class WrapperComponent {
  constructor(private router: Router) {}
  loginVisible():boolean{
    return this.router.url !== '/login';
  }
}
