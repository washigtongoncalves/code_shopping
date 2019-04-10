import { Component, Input } from '@angular/core';
import { UserInterface } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {

  @Input()
  user: UserInterface = {
    name: '',
    email: '',
    password: ''
  };

  @Input()
  editMode: boolean = false;
}
