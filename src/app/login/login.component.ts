import { Component } from '@angular/core';
import { AuthService } from '../services/authentication.service';
import { Userdata } from '../models/user.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  user: Userdata = {
    email: '',
    password: ''
  };

  constructor(private auth: AuthService){}

  login(){
    console.log(this.user);
    this.auth.login(this.user);
  }


}
