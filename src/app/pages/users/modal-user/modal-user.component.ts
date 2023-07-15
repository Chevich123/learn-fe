import { Component, Input } from '@angular/core';
import { UserModalService } from './user-modal.service';

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.scss'],
})
export class ModalUserComponent {
  @Input() title: string | undefined;

  constructor(public userModal: UserModalService) {}
}
