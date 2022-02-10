import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editing',
  templateUrl: './editing.component.html',
  styleUrls: ['./editing.component.scss']
})
export class EditingComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router,) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe();
  }

}
